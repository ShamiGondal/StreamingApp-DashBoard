'use client';
import React, {  useEffect, useRef, useState } from 'react'



import { useQuery } from '@tanstack/react-query';
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
import { Button } from '../ui/button'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { SportData } from "./GetSports"
import { LeagueType } from './GetLeagues';
import { teamType } from './GetTeams';

import CalendarForm from './Date';
import { toast } from '../ui/use-toast';
import { number } from 'zod';

type postedGameData = {
  sportId:number|null
  leagueId:number|null
  teamId1: number|null
  teamId2 :number|null
  date:Date|undefined
  links:string[]
  venue:string,

}


const AddGame = () => {
    const [sports,setSports] = useState([] as SportData[])
    const [leagues,setLeagues] = useState([] as LeagueType[])
    const [sportId,setSportId] = useState<number | null>(null!);
    const [leagueId,setLeagueId] = useState<number | null>(null!);
    const [teamId1,setTeamId1] = useState<number | null>(null!);
    const [teamId2,setTeamId2] = useState<number | null>(null!);
    const [loading,setLoading] = useState(false);
    const [teams,setTeams] = useState([] as teamType[])
    const [date,setDate] = useState<Date | undefined>(); 
    const [links,setLinks]=useState<string[]>([]);
    const [showBtn,setShowBtn] = useState(false);
    const [venue,setVenue] = useState("");
    const [value,setValue]= useState("");

         
    const reset = ()=>{
      setSportId(null);
      setLeagueId(null);
      setTeamId1(null);
      setTeamId2(null);
      setValue("");
      setDate(undefined);
      setVenue("")
     setShowBtn(false);
     setLinks([]);
    }

  
    const postGame = async(data:postedGameData)=>{
      try{
        setLoading(true);
          const res=await fetch('/api/auth/games',{
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
          // client.invalidateQueries({ queryKey:["GET_TEAMS"] })
          
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


    

  

    
    

   
 
    
     useEffect(()=>{
      if(sportId){
       GetAllLeagues(); 
       setLeagueId(null);
       setTeamId1(null);
       setTeamId2(null) 
      }
     },[sportId])

     useEffect(()=>{
      if(leagueId){
       GetAllTeams();
       setTeamId1(null)
       setTeamId2(null)
      
      }
     },[leagueId])


     const GetAllTeams = async (): Promise<teamType[] | undefined> => {
      try {
        setLoading(true);
        const response = await fetch(`/api/auth/team?leagueId=${leagueId}`, {
          method: "GET"
        });
        if (response.ok) {
          const result = await response.json();
          setTeams(result.DATA);
          return result;
        }
        throw new Error("Error in fetching request");
      } catch (e) {
        console.error(e);
      }
      finally{
        setLoading(false);
      }
    };

    const getSports = async (): Promise<SportData[] | undefined> => {
        try {
          setLoading(true);
          const response = await fetch(`/api/auth/sports`, {
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
        finally{
          setLoading(false);
        }
      };
      
      const { data,isLoading,isError } = useQuery<SportData[] | undefined, Error>({
        queryKey: ["GET_Sports - SELECT PANEL"],
        queryFn: ()=>getSports(),
        
      });

      const GetAllLeagues = async (): Promise<LeagueType[] | undefined> => {
        try {
          setLoading(true)
          const response = await fetch(`/api/auth/league?sportId=${sportId}`, {
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
        }finally{
          setLoading(false);
        }
      };
     
      const addLink = (e: React.ChangeEvent<HTMLInputElement>)=>{
        
        setValue(e.target.value);  
        if(e.target.value){
        setShowBtn(true);
        return;
        }
        setShowBtn(false);
      }

      const handleAdd = (value:string)=>{
       if(value){
        const arr = [...links,value];
        setLinks(arr);
        setValue("");
        setShowBtn(false);
       }
      }


    const handleClick =()=>{
     
      
      postGame({sportId,leagueId,links,teamId1,teamId2,date,venue})
     
    }
  return (
    <>
    <form >
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
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
          </div>
         {sports? ( <div className="select box">
          <Select onValueChange={(e: string)=>setSportId(parseInt(e)) } value={sportId ? sportId.toString():undefined}>
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose Sports" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sports.map((sport)=>(<SelectItem key={sport.id}  value={`${sport.id}`}>{sport.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>

          </div>):null}
         
          {leagues.length && sportId ? ( <div className="select box">
          <Select onValueChange={(e: string)=>setLeagueId(parseInt(e))} value={leagueId ? leagueId.toString():undefined} >
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose League" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {leagues.map((league)=>(<SelectItem key={league.id} value={`${league.id}`}>{league.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>):null}
          <div className="flex gap-4 flex-wrap">

          {teams.length && leagueId ? ( <div className="select box">
          <Select onValueChange={(e: string)=>setTeamId1(parseInt(e))}  value={teamId1 ? teamId1.toString():undefined} >
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose Team A" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {teams.map((team)=>(<SelectItem key={team.id} value={`${team.id}`}>{team.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>):null}
          {teams.length && leagueId ? ( <div className="select box">
          <Select onValueChange={(e: string)=>setTeamId2(parseInt(e))}  value={teamId2 ? teamId2.toString():undefined} >
      <SelectTrigger className="w-[180px]" >
        <SelectValue  placeholder="Choose Team B" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {teams.map((team)=>(<SelectItem key={team.id} value={`${team.id}`}>{team.NAME}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>):null}
          
          </div>
          
         {sportId && leagueId && teamId1 && teamId2 ?<div className="flex flex-wrap gap-3 items-center justify-center">
            <Input type='text'placeholder='Match Venue' value={venue} onChange={(e)=>setVenue(e.target.value)} className=''></Input>
         <div className=''>  <CalendarForm setDate = {setDate} date={date} ></CalendarForm></div>
         <div className='links flex flex-col'>
          <Input type='text' value={value} onChange={addLink} placeholder='Add Streaming links' id="link"></Input>
          {showBtn ?<Button className='mt-4' onClick={()=>{handleAdd(value)}}>Add link</Button>:null}
         </div>
          </div>:null}
         
        </div>
        <DialogFooter>
          <Button type="submit" disabled={ (!venue) ||(!sportId) || (!leagueId) || (!teamId1) || (!teamId2)  || (!date) || (! (teamId1!==teamId2) || (!links.length))} onClick={handleClick} >{loading?"Loading":"Add Game"}</Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
    </form>
   </>
  )
}

export default AddGame
