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
import { SportData } from "./GetSports"

import {
    
    SelectContent,
    SelectGroup,
    SelectItem,
    
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { ChangeEvent, useState,useEffect, useRef, } from "react"


export function LeagueDialogBox() {
    const [name,setName] = useState("");
    const client = useQueryClient();
    const [loading,setLoading] = useState(false);
    const [logo,setLogo] = useState<File>(null!);
    const file = useRef<HTMLInputElement>(null!);
    const [imgUrl, setImgUrl] = useState("");
    const [sportId,setSportId] = useState<number|null>(null);


     


    const { toast } = useToast()

    const [sports, setSports] = useState<SportData[]>([]);

    
  
   const reset = ()=>{
          setName("")
          setImgUrl("")
          setSportId(null);
          file.current.value =""
          setLogo(null!)
   }

    const getSports = async (): Promise<SportData[] | undefined> => {
      try {
        const response = await fetch("/api/auth/sports", {
          method: "GET"
        });
        if (response.ok) {
          const result = await response.json();
          setSports(result.DATA);
          return result;
        }
        throw new Error("Error in fetching request");
      } catch (e) {
        console.error(e);
      }
    };
  
    const {  } = useQuery<SportData[] | undefined, Error>({
      queryKey: ["GET_Sports - SELECT PANEL"],
      queryFn: ()=>getSports(),
      
    });
    
   const postLeague = async(data:{name:string,imgUrl:string,sportId:number|null})=>{
      try{
        setLoading(true);
          const res=await fetch('/api/auth/league',{
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
          
          client.invalidateQueries({ queryKey: ["GET_LEAGUES"] })
          
         }
         if(!res.ok){
          toast({
            description: JSON.stringify(await res.json())
          })
          reset();
         }
      }catch(e){
        toast({
          description: (e as Error).message,
        })
        reset()
       console.error(e);
      }
      finally{
        setLoading(false);
      }
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
    
      const {mutate,isError,error} =  useMutation({
        mutationFn:postLeague,
        onError:(error)=>{
          toast({
            description: (error as Error).message,
          })
          reset();
        }
       })
          
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target?.files?.[0]?.size < (1024 * 1024)){
        setLogo(e.target.files[0]);
      }
    }
    const handleClick = (e:any)=>{
      e.preventDefault();
      if(!name || !imgUrl || !sportId){
        return
      }
      const data = {name,imgUrl,sportId};
      try{
        mutate(data);
      }
      catch(e){
       console.error(e)
        reset()
      }
      
    }

    if(isError){
      return <p>{error.message}</p>
    }
    
    
  return (
   <>
    <form >
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add League</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[495px]">
        <DialogHeader>
          <DialogTitle>Add League</DialogTitle>
          <DialogDescription>
            Addition of new League
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              League Name
            </Label>
            <Input
              id="name"
              
              className="col-span-3"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
         {sports ? ( <div className="select box">
          <Select onValueChange={(e)=>setSportId(parseInt(e))}>
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose Sports" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sports.map((sport)=>(<SelectItem key={sport.id} onClick={()=>{setSportId(sport.id)}} value={`${sport.id}`}>{sport.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>

          </div>):null}
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
          <Button  type="submit" onClick={handleClick} disabled={(!imgUrl)||(!name)||(!sportId)}>{loading?"Loading":"Add League"}</Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
    </form>
   </>
  )
}
