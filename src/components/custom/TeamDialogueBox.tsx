'use client'
import { Button } from "@/components/ui/button"
import supabase from "@/config/dbConnection"
import { useMutation,useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Select } from "../ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import {
    
    SelectContent,
    SelectGroup,
    SelectItem,
    
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { ChangeEvent, useState,useEffect, useRef, } from "react"


type LeagueType = {
    id:number,
    NAME:string,
    LOGO_URL:string
}

export function TeamDialogueBox() {
    const [name,setName] = useState("");
    const client = useQueryClient();
    const [loading,setLoading] = useState(false);
    const [logo,setLogo] = useState<File>(null!);
    const file = useRef<HTMLInputElement>(null!);
    const [imgUrl, setImgUrl] = useState("");
    const [leagueId,setLeagueId] = useState<number|null>(null);
    
     


    const { toast } = useToast()

    
    const [leagues,setLeagues] = useState([] as LeagueType[])

    const postTeam = async(data:{name:string,imgUrl:string,leagueId:number|null})=>{
      try{
        setLoading(true);
          const res=await fetch('/api/auth/team',{
          method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
         })
         if(res.ok){
          const data = await res.json();
          toast({
            description: data.message,
          })
          reset();
          client.invalidateQueries({ queryKey:["GET_TEAMS"] })
          
         }
         if(!res.ok){
          toast({
            description: JSON.stringify(await res.json())
          })
         }
         reset();
      }catch(e){
        toast({
          description: (e as Error).message,
        })
        reset();
       console.error(e);
      }
      finally{
        setLoading(false);
        reset();
      }
   }

    

    const GetAllLeagues = async (): Promise<LeagueType[] | undefined> => {
        try {
          const response = await fetch("/api/auth/league", {
            method: "GET"
          });
          if (response.ok) {
            const result = await response.json();
             setLeagues(result.DATA);
            return result;
          }
          throw new Error("Error in fetching request");
        } catch (e) {
          console.error(e);
        }
      };
      const { isLoading, isError,isFetching } = useQuery<LeagueType[] | undefined, Error>({
        queryKey: ["GET_LEAGUES - SELECT"],
        queryFn: ()=>GetAllLeagues()
      });

    
  
   const reset = ()=>{
          setName("")
          setImgUrl("")
          setLeagueId(null);
          file.current.value =""
          setLogo(null!)
   }

   
    
   

    const uploadImg = async()=>{
       try{
        setLoading(true)
        const {data,error} = await supabase.storage.from("Images").upload(`public/${logo.name}`,logo,{
            upsert: true
          })
        if(data){
            setImgUrl(`https://kgnablmjvadmxmgimkze.supabase.co/storage/v1/object/public/Images/public/${logo.name}`)
        }
        if(error){
            throw new Error(error.message);
        }
       }catch(e){
        console.log(e);
        toast({
            description:(e as Error).message
        })
       }
       finally{
        setLoading(false)
       }
    }
    

    useEffect(()=>{
      if(logo){
        uploadImg();
      }
    },[logo])
    
      
          
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target?.files?.[0]?.size < (1024 * 1024)){
        setLogo(e.target.files[0]);
      }
    }
    const handleClick = (e:any)=>{
      e.preventDefault();
      if(!name || !imgUrl || !leagueId){
        return
      }
      const data = {name,imgUrl,leagueId};
      try{
        console.log(data);
       mutate(data);
      }
      catch(e){
       console.error(e)
        reset()
      }
      
    }

     const {mutate } =  useMutation({
      mutationFn:postTeam
     })


    
    
  return (
   <>
    <form >
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[495px]">
        <DialogHeader>
          <DialogTitle>Add Team</DialogTitle>
          <DialogDescription>
            Addition of new Team
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Team Name
            </Label>
            <Input
              id="name"
              
              className="col-span-3"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="flex justify-between items-center flex-wrap gap-2">
          
          
          {leagues ? ( <div className="select box">
          <Select onValueChange={(e)=>setLeagueId(parseInt(e))}>
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose League" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {leagues.map((league)=>(<SelectItem key={league.id} onClick={()=>{setLeagueId(league.id)}} value={`${league.id}`}>{league.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>

          </div>):null}

          </div>
        
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Logo" className="text-right">
              Logo
            </Label>
            <Input
              id="logo"
              ref={file}
              className="col-span-3"
              type="file"
              accept="image/*"
              
              onChange={(e)=>handleInputChange(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button  type="submit" onClick={handleClick} disabled={(!imgUrl)||(!name)||(!leagueId)}>{loading?"Loading":"Add Team"}</Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
    </form>
   </>
  )
}
