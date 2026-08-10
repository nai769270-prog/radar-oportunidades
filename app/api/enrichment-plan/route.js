import { NextResponse } from 'next/server';
import { enrichmentCandidate } from '../../../lib/enrichment';

export async function POST(request){
  const body = await request.json();
  const opportunities = Array.isArray(body.opportunities) ? body.opportunities : [];
  const data = opportunities.map(enrichmentCandidate);
  return NextResponse.json({data,meta:{eligible:data.filter(x=>x.eligible).length,total:data.length,execution:'approval-required-before-credit-usage'}});
}
