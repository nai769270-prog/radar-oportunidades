import { NextResponse } from 'next/server';
import { buildOutreachDraft } from '../../../lib/outreach';
import { filterUsableContacts } from '../../../lib/contact-policy';

export async function POST(request){
  const opportunity=await request.json();
  const contacts=filterUsableContacts(opportunity.contacts||[]);
  return NextResponse.json({data:{draft:buildOutreachDraft(opportunity),contacts},meta:{send:false,humanReviewRequired:true}});
}
