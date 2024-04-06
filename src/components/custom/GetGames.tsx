'use client'

import { ToggleLeft, ToggleRight } from 'lucide-react';
import { Cog } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type lST = {
  NAME:string
}

type game = {
  id:number,
  isLive:boolean,
  Venue:string,
  SPORTS:lST,
  LEAGUES:lST
}
type team = {
  id:number
  GAME_ID:number
  TEAMS:lST
}

type teamProp = team[]

type gamesDataProps = {
  games:{
    data: game[],
    teams:teamProp[]
  }
}

import { useState } from "react"

import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SkeletonDemo } from "./SkeltonLeagues";

const GetGames = () => {
    const [teams,setTeams] = useState<teamProp[]>([] as teamProp[])
    const [allGames,setAllGames] = useState<game[]>([] as game[])  

    
   const makeGameLive = async(gameId:number,toggle:boolean)=>{
     
    try{
     const res = await fetch(`/api/auth/games?gameId=${gameId}&toggle=${toggle}`,{
      method:"PATCH",
     })
     if(res.ok){
      refetch();
     }
    }catch(e){
      console.error(e);
    }
   }


   const renderTeams = (teamArr:teamProp)=>{
    return teamArr.map(t=><TableCell key={t.id}>{t.TEAMS.NAME}</TableCell>)
   }
   
    
    const GetAllGames = async (): Promise<any | undefined> => {
      try {
        const response = await fetch("/api/auth/games", {
          method: "GET"
        });
        if (response.ok) {
          const result:gamesDataProps = await response.json();
          setAllGames(result.games.data);
          setTeams(result.games.teams); 
          return result;
        }
        throw new Error("Error in fetching request");
      } catch (e) {
        console.error(e);
      }
    };
    const { isLoading, isError,isFetching,refetch } = useQuery <any | undefined, Error>({
      queryKey: ["GET_GAMES"],
      queryFn: ()=>GetAllGames()
    });
  
    if (isLoading || isFetching) {
      return <SkeletonDemo></SkeletonDemo>;
    }
    if (isError) {
      return <p>Error</p>;
    }
  

  return (
    <div>
        
        <div className="mt-12">
     <Table>
      <TableCaption className="mt-8 font-semibold text-2xl">{teams.length ?"All GAMES":"No GAME EXIST"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">SPORT NAME</TableHead>
          <TableHead className="flex-1">LEAGUE NAME</TableHead>
          <TableHead className="flex-1">MATCH VENUE</TableHead>
          <TableHead className="flex-1">TEAM 1</TableHead>
          <TableHead className="flex-1">TEAM 2</TableHead>
          <TableHead> Settings</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {allGames.map((game) => (
          <TableRow key={game.id} className={game.isLive ?"bg-slate-500":""}>
            <TableCell className="font-medium">{game.SPORTS.NAME}</TableCell>
            <TableCell className="font-medium">{game.LEAGUES.NAME}</TableCell>
            <TableCell className="font-medium">{game.Venue}</TableCell>
           {teams.map((teamArr)=>{return renderTeams(teamArr.filter((t)=>t.GAME_ID===game.id))})}  
         { <Popover>
          <TableCell className='font-medium' ><PopoverTrigger asChild><Cog className='cursor-pointer'></Cog></PopoverTrigger>
           <PopoverContent><div className='btns'>
            <div title='live status' className='cursor-pointer'>{game.isLive?<ToggleRight onClick={()=>makeGameLive(game.id,false)}></ToggleRight>:<ToggleLeft onClick={()=>{makeGameLive(game.id,true)}}></ToggleLeft>}</div>
            </div></PopoverContent>
           </TableCell>
          </Popover>}
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
    </div>
  )
}

export default GetGames
