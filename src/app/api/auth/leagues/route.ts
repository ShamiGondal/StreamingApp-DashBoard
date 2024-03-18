export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../config/dbConnection';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, imgUrl } = await request.json();

    const { data, error } = await supabase.from('LEAGUES').insert([
      {
        NAME: name,
        LOGO_URL: imgUrl,
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

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    
    const { data, error } = await supabase
  .from('LEAGUES')
  .select(`NAME , LOGO_URL`)

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