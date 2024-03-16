'use client'

import { Button } from "@/components/ui/button"
import supabase from "@/config/dbConnection"

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



import { ChangeEvent, useState,useEffect } from "react"


export function LeagueDialogBox() {
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [logo,setLogo] = useState<File>(null!);
    const [imgUrl, setImgUrl] = useState("");
    console.log(imgUrl);
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
    


    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target.files[0].size < (1024 * 1024)){
        setLogo(e.target.files[0]);
      }
    }
    
    
  return (
    <Dialog>
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
              
              className="col-span-3"
              type="file"
              accept="image/*"
            
              onChange={(e)=>handleInputChange(e)}
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit" disabled={name=="" || imgUrl==""}>Add League</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
