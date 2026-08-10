import { NextResponse } from 'next/server';
import { listSearches, saveSearch } from '../../../lib/store';

export async function GET(){ return NextResponse.json({ data: listSearches() }); }
export async function POST(request){
  const body = await request.json();
  const query = String(body.query || '').trim();
  if (!query) return NextResponse.json({ error: 'query_required' }, { status: 400 });
  return NextResponse.json({ data: saveSearch({ query }) }, { status: 201 });
}
