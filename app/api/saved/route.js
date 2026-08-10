import { NextResponse } from 'next/server';
import { listSavedOpportunities, saveOpportunity, updateOpportunityStatus } from '../../../lib/store';
import { filterUsableContacts } from '../../../lib/contact-policy';
const allowedStatuses=new Set(['new','analyzing','approved','discarded']);
export async function GET(){ return NextResponse.json({ data: listSavedOpportunities() }); }
export async function POST(request){
  const body = await request.json();
  if (!body.id || !body.title) return NextResponse.json({ error: 'invalid_opportunity' }, { status: 400 });
  const existing=listSavedOpportunities().find(x=>String(x.id)===String(body.id));
  const safe = { ...body, status:allowedStatuses.has(body.status)?body.status:(existing?.status||'new'), contacts: filterUsableContacts(body.contacts || []), savedAt: existing?.savedAt||new Date().toISOString(), lastSeenAt:new Date().toISOString() };
  const data=saveOpportunity(safe);
  return NextResponse.json({ data, duplicate:Boolean(existing), updated:Boolean(existing) }, { status: existing?200:201 });
}
export async function PATCH(request){
  const body=await request.json();
  if(!body.id||!allowedStatuses.has(body.status))return NextResponse.json({error:'invalid_status_update'},{status:400});
  const data=updateOpportunityStatus(body.id,body.status);
  if(!data)return NextResponse.json({error:'opportunity_not_found'},{status:404});
  return NextResponse.json({data});
}
