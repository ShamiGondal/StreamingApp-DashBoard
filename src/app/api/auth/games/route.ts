export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../config/dbConnection';

const addTeamsToGAME = async(gameId:string,teamId:string)=>{
  try{
      const {data,error} =   await supabase.from("TEAMS_GAMES").insert([
          {"GAME_ID":gameId,
           "TEAM_ID":teamId
          }
        ]).select()
        if(data){
         return data
        }
        if(error){
          console.error("er "+error);
        }

  }catch(e){
    console.log("here is an error");
     console.error(e);
  }
}

const fetchTeams = async(gameId:string)=>{
  try{
      const {data,error} =   await supabase.from("TEAMS_GAMES").select("id,GAME_ID,TEAMS(NAME)").eq("GAME_ID",gameId)
        if(data){
         return data
        }
        if(error){
          console.error("er : "+error);
        }

  }catch(e){
    console.log("here is an error");
     console.error(e);
  }
}

export async function post(request: NextRequest, response: NextResponse) {
  try {
    const { sportId,leagueId,teamId1,teamId2,date,links,venue} = await request.json();

    const { data, error } = await supabase.from('GAMES').insert([
      {
       SPORT_ID:sportId,
       LEAGUE_ID:leagueId,
       Date:date,
       Streaming_Links:links,
       Venue:venue
      },
  
    ]).select();

    if(data){
      const teams = [teamId1,teamId2];
      const gameId = JSON.stringify(data[0].id);
       teams.map(async (teamId)=>{return await addTeamsToGAME(gameId,teamId)})
      
    }

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

export async function get(request: NextRequest, response: NextResponse) {
  try {
    
    const { data, error } = await supabase
  .from('GAMES')
  .select(`id,Venue,isLive,SPORTS (NAME),LEAGUES(NAME)`)
  
  
  if(data){
  const ids = data.map((item)=>item.id);
  const res= await Promise.all(ids.map(async(id)=> {return await fetchTeams(id) }))
  const teams = await Promise.all(res);
  return new NextResponse(JSON.stringify({"games":{data,teams}}));
  }

  if (error) {
    throw error
  }     
  
    return new NextResponse(JSON.stringify({ "DATA":data }), {
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

export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams
    const gameId = searchParams.get('gameId')
    const toggle = searchParams.get("toggle");
    console.log("game id "+parseInt(gameId!));
    console.log("toggle "+toggle);
  if(gameId && toggle){
    const {data,error} = await supabase.from("GAMES").update({"isLive":toggle}).eq("id",gameId).select();
  if(data)
    return new NextResponse(JSON.stringify({ message:"updated" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  
   return new NextResponse(JSON.stringify({"message":"error in updation"}),{
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  })
  } catch (e) {
    return new NextResponse(JSON.stringify({"message":(e as Error).message ,"error":e as Error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}