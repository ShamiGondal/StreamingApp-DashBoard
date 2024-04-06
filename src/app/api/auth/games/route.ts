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
      const {data,error} =   await supabase.from("TEAMS_GAMES").select("TEAMS (id,NAME)").eq("GAME_ID",gameId);
        if(data){
          console.log(data);
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

export async function POST(request: NextRequest, response: NextResponse) {
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

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    
    const { data, error } = await supabase
  .from('GAMES')
  .select(`id,Venue, SPORTS (id,NAME),LEAGUES(id,NAME)`)
  
  if(data){
   const gamesId = data.map(async(game)=> await fetchTeams(game.id));
   
     
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