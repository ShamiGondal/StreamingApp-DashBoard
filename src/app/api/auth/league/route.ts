export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../config/dbConnection';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, imgUrl,sportId } = await request.json();

    const { data, error } = await supabase.from('LEAGUES').insert([
      {
        NAME:  name.toUpperCase(),
        LOGO_URL: imgUrl,
        SPORT_ID:sportId
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

export const fetchData = async(sportId:string|null)=>{
if(sportId){
   return await supabase
  .from('LEAGUES')
  .select(`id,NAME,LOGO_URL`)
  .eq("SPORT_ID",parseInt(sportId));
}
else{
  return await supabase
  .from('LEAGUES')
  .select(`id,NAME,LOGO_URL`)
 
}
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sportId = searchParams.get('sportId')
  
  const { data, error } = await fetchData(sportId);
  

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