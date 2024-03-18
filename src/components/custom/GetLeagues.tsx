'use client'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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




type LeagueData = {
  NAME: string;
  LOGO_URL: string;
};

const GetLeagues: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueData[]>([]);

  const getLeagues = async (): Promise<LeagueData[] | undefined> => {
    try {
      const response = await fetch("/api/auth/leagues", {
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

  const { isLoading, isError,isFetching } = useQuery<LeagueData[] | undefined, Error>({
    queryKey: ["GET_LEAGUES"],
    queryFn: ()=>getLeagues()
  });

  if (isLoading || isFetching) {
    return <SkeletonDemo></SkeletonDemo>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="mt-12">
     <Table>
      <TableCaption className="mt-8 font-semibold text-2xl">{leagues.length ?"All Leagues":"NO LEAGUE EXIST"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">LEAGUE NAME</TableHead>
          <TableHead className="flex-1">LOGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues.map((league) => (
          <TableRow key={league.NAME}>
            <TableCell className="font-medium">{league.NAME}</TableCell>
            <TableCell><img className="" width={40} height={40} src={league.LOGO_URL} alt="logo"></img></TableCell>
            {/* <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  );
};

export default GetLeagues;