import { NextResponse } from 'next/server';
import { listSavedOpportunities, saveOpportunity } from '../../../lib/store';
import { filterUsableContacts } from '../../../lib/contact-policy';

export async function GET(){ return NextResponse.json({ data: listSavedOpportunities() }); }
export async function POST(request){
  const body = await request.json();
  if (!body.id || !body.title) return NextResponse.json({ error: 'invalid_opportunity' }, { status: 400 });
  const safe = { ...body, contacts: filterUsableContacts(body.contacts || []), savedAt: new Date().toISOString() };
  return NextResponse.json({ data: saveOpportunity(safe) }, { status: 201 });
}
