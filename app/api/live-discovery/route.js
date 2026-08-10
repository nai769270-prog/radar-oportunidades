import { NextResponse } from 'next/server';
import { buildDiscoveryQueries } from '../../../lib/query-builder';
import { searchPublicWeb } from '../../../lib/web-provider';
import { dedupeSignals } from '../../../lib/dedupe';
import { scoreOpportunity, intentFromScore } from '../../../lib/scoring';
import { buildOpportunity } from '../../../lib/opportunity-model';

export async function POST(request){
  const { topic } = await request.json();
  const clean = String(topic || '').trim();
  if (!clean) return NextResponse.json({error:'topic_required'},{status:400});
  const queries = buildDiscoveryQueries(clean).slice(0,3);
  const batches = await Promise.all(queries.map(q=>searchPublicWeb(q)));
  if (!batches.some(b=>b.configured)) return NextResponse.json({data:[],meta:{live:false,reason:'search_provider_not_configured',queries}});
  const signals = dedupeSignals(batches.flatMap(b=>b.results));
  const data = signals.map(signal=>{const score=scoreOpportunity(signal);return buildOpportunity(signal,score,intentFromScore(score))}).filter(o=>o.score>=50).sort((a,b)=>b.score-a.score);
  return NextResponse.json({data,meta:{live:true,count:data.length,queries}});
}
