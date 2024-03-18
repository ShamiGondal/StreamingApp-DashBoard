'use client'

import { Button } from "@/components/ui/button"
import supabase from "@/config/dbConnection"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"


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


import { ChangeEvent, useState,useEffect, useRef, MutableRefObject } from "react"


export function LeagueDialogBox() {
    const [name,setName] = useState("");
    const client = useQueryClient();
    const [loading,setLoading] = useState(false);
    const [logo,setLogo] = useState<File>(null!);
    const file = useRef<HTMLInputElement>(null!);
    const [imgUrl, setImgUrl] = useState("");

    const { toast } = useToast()
    
   const postLeague = async(data:{name:string,imgUrl:string})=>{
      try{
        setLoading(true);
          const res=await fetch('/api/auth/leagues',{
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
          setName("")
          setImgUrl("")
          file.current.value =""
          client.invalidateQueries({ queryKey: ["GET_LEAGUES"] })

         }
      }catch(e){
        toast({
          description: (e as Error).message,
        })
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
        mutationFn:postLeague
       })
          
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target.files[0].size < (1024 * 1024)){
        setLogo(e.target.files[0]);
      }
    }
    const handleClick = (e:any)=>{
      e.preventDefault();
      if(!name || !imgUrl){
        return
      }
      const data = {name,imgUrl};
      try{
        mutate(data);
      }
      catch(e){
   
      }
      
    }

    if(isError){
      return <p>{error.message}</p>
    }
    
    
  return (
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
          <Button  type="submit" onClick={handleClick} disabled={name=="" || imgUrl==""}>{loading?"Loading":"Add League"}</Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
    
    </form>
  )
}
