import {NextResponse} from 'next/server';
import {searchApolloPeople} from '../../../lib/apollo-client';

export async function POST(request){
 const body=await request.json();
 const domain=String(body.domain||'').trim().toLowerCase();
 if(!domain)return NextResponse.json({error:'domain_required'},{status:400});
 try{
  const result=await searchApolloPeople({domain,titles:Array.isArray(body.titles)?body.titles:[]});
  return NextResponse.json({data:result.people,meta:{configured:result.configured,count:result.people.length,enriched:false,emailsRevealed:false,phonesRevealed:false}});
 }catch(error){return NextResponse.json({error:'apollo_search_failed',detail:error.message},{status:502})}
}
