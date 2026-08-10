import { NextResponse } from 'next/server';
import { createDiscoveryJob, normalizeExternalResult } from '../../../lib/source-adapters';
import { scoreOpportunity, intentFromScore } from '../../../lib/scoring';
import { buildOpportunity } from '../../../lib/opportunity-model';
import { dedupeSignals } from '../../../lib/dedupe';

export async function POST(request){
  const body = await request.json();
  const topic = String(body.topic || '').trim();
  if (!topic) return NextResponse.json({error:'topic_required'},{status:400});
  const job = createDiscoveryJob(topic);
  const supplied = Array.isArray(body.results) ? body.results.map(normalizeExternalResult) : [];
  const opportunities = dedupeSignals(supplied).map(signal => {
    const score = scoreOpportunity(signal);
    return buildOpportunity(signal, score, intentFromScore(score));
  }).sort((a,b)=>b.score-a.score);
  return NextResponse.json({data:{job,opportunities},meta:{count:opportunities.length,liveExecution:false}});
}
