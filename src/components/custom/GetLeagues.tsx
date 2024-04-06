'use client'

import { useEffect, useState } from "react"

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

 export type LeagueType = {
    id:number,
    NAME:string,
    LOGO_URL:string
}

const GetLeagues = () => {
    const [leagues,setLeagues] = useState([] as LeagueType[])

    

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
      queryKey: ["GET_LEAGUES"],
      queryFn: ()=>GetAllLeagues()
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
      <TableCaption className="mt-8 font-semibold text-2xl">{leagues.length ?"All Leagues":"NO League EXIST"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">LEAGUE NAME</TableHead>
          <TableHead className="flex-1">LOGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues.map((league) => (
          <TableRow key={league.id}>
            <TableCell className="font-medium">{league.NAME}</TableCell>
            <TableCell><img className="" width={40} height={40} src={league.LOGO_URL} alt="logo"></img></TableCell>
            
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
    </div>
  )
}

export default GetLeagues
