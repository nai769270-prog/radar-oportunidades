import { NextResponse } from 'next/server';
import { buildDiscoveryQueries } from '../../../lib/query-builder';

export async function GET(request){
  const topic = new URL(request.url).searchParams.get('q') || '';
  const queries = buildDiscoveryQueries(topic);
  if (!queries.length) return NextResponse.json({error:'query_required'},{status:400});
  return NextResponse.json({data:{topic,queries},meta:{execution:'source-adapters-pending'}});
}
