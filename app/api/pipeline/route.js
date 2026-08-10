import { NextResponse } from 'next/server';
import { stages, transitionOpportunity } from '../../../lib/pipeline';

export async function GET(){return NextResponse.json({data:stages});}
export async function POST(request){
  const {opportunity,to}=await request.json();
  const result=transitionOpportunity(opportunity,to);
  return NextResponse.json(result,{status:result.ok?200:400});
}
