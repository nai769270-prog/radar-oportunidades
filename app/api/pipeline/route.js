import { NextResponse } from 'next/server';
import { stages, transitionOpportunity } from '../../../lib/pipeline';
import { getSavedOpportunity, updateOpportunityStatus } from '../../../lib/store';

export async function GET(){return NextResponse.json({data:stages})}
export async function POST(request){
 const {id,to}=await request.json();
 const opportunity=getSavedOpportunity(id);
 if(!opportunity)return NextResponse.json({ok:false,error:'not_found'},{status:404});
 const result=transitionOpportunity(opportunity,to);
 if(!result.ok)return NextResponse.json(result,{status:400});
 const saved=updateOpportunityStatus(id,to);
 return NextResponse.json({ok:true,data:saved});
}
