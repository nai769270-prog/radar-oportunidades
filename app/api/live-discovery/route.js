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
  const allQueries=buildDiscoveryQueries(clean);
  const selected=[];const used=new Set();
  for(const q of allQueries){if(used.has(q.family))continue;selected.push(q);used.add(q.family);if(selected.length>=5)break}
  const batches = await Promise.all(selected.map(q=>searchPublicWeb(q.query)));
  if (!batches.some(b=>b.configured)) return NextResponse.json({data:[],meta:{live:false,reason:'search_provider_not_configured',queries:selected}});
  const raw=batches.flatMap((b,i)=>(b.results||[]).map(s=>({...s,discoveryIntent:selected[i].family,discoveryPhrase:selected[i].phrase,queryWeight:selected[i].weight})));
  const signals = dedupeSignals(raw);
  const base = signals.map(signal=>{const score=scoreOpportunity(signal);return {...buildOpportunity(signal,score,intentFromScore(score)),discoveryIntent:signal.discoveryIntent,discoveryPhrase:signal.discoveryPhrase}}).filter(o=>o.score>=50).sort((a,b)=>b.score-a.score);
  let data=base,rankingApplied=false;
  try{
    const origin=new URL(request.url).origin;
    const ranked=await fetch(new URL('/api/demand-ranking',origin),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:signals.map(s=>({...s,signalType:s.signalType||'public_or_aggregate'}))}),cache:'no-store'});
    if(ranked.ok){const payload=await ranked.json();if(Array.isArray(payload.data)&&payload.data.length){data=payload.data;rankingApplied=true}}
  }catch{}
  return NextResponse.json({data,meta:{live:true,count:data.length,queries:selected,queryFamilies:selected.map(x=>x.family),rawSignals:raw.length,uniqueSignals:signals.length,rankingApplied,explainable:rankingApplied}});
}
