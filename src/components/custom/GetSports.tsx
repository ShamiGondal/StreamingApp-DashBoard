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




export type SportData = {
  id:number;
  NAME: string;
  LOGO_URL: string;
};

const GetLeagues: React.FC = () => {
  const [sports, setSports] = useState<SportData[]>([]);

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

  const { isLoading, isError,isFetching } = useQuery<SportData[] | undefined, Error>({
    queryKey: ["GET_Sports"],
    queryFn: ()=>getSports()
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
      <TableCaption className="mt-8 font-semibold text-2xl">{sports.length ?"All SPORTS":"NO SPORT EXIST"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">SPORT NAME</TableHead>
          <TableHead className="flex-1">LOGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sports.map((sport) => (
          <TableRow key={sport.NAME}>
            <TableCell className="font-medium">{sport.NAME}</TableCell>
            <TableCell><img className="" width={40} height={40} src={sport.LOGO_URL} alt="logo"></img></TableCell>
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