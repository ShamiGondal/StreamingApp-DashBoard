'use client'

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
export type teamType = {
    id:number,
    NAME:string,
    LOGO_URL:string
}
const GetTeams = () => {
    const [teams,setTeams] = useState([] as teamType[])

    

    const GetAllTeams = async (): Promise<teamType[] | undefined> => {
      try {
        const response = await fetch("/api/auth/team", {
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
    };
    const { isLoading, isError,isFetching } = useQuery<teamType[] | undefined, Error>({
      queryKey: ["GET_TEAMS"],
      queryFn: ()=>GetAllTeams()
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
      <TableCaption className="mt-8 font-semibold text-2xl">{teams.length ?"All Teams":"No Team EXIST"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">LEAGUE NAME</TableHead>
          <TableHead className="flex-1">LOGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium">{team.NAME}</TableCell>
            <TableCell><img className="" width={40} height={40} src={team.LOGO_URL} alt="logo"></img></TableCell>
            
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
    </div>
  )
}

export default GetTeams
