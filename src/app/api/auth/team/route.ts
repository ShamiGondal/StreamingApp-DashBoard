export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../config/dbConnection';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, imgUrl,leagueId } = await request.json();

    const { data, error } = await supabase.from('TEAMS').insert([
      {
        NAME:  name.toUpperCase(),
        LOGO_URL: imgUrl,
        LEAGUE_ID:leagueId
      },
  
    ])

    if (error) {
      throw error
    }

    return new NextResponse(JSON.stringify({ "message":"Successfully added" }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({"message":(e as Error).message ,"error":e as Error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export const fetchData = async(leagueId:string|null)=>{
  if(leagueId){
     return await supabase
     .from('TEAMS')
     .select(`id,NAME,LOGO_URL`)
     .eq("LEAGUE_ID",parseInt(leagueId));
  }
  else{
    return await supabase
    .from('TEAMS')
    .select(`id,NAME,LOGO_URL`)
   
  }
  }

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams
    const leagueId = searchParams.get('leagueId')
    const { data, error } = await fetchData(leagueId);
  if (error) {
    throw error
  }     
  
    return new NextResponse(JSON.stringify({"DATA":data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({"message":(e as Error).message ,"error":e as Error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}