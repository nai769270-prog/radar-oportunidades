import {NextResponse} from 'next/server';
import {analyzePublicDemand} from '../../../lib/digital-demand';
import {rankDemandSignals} from '../../../lib/demand-ranking';
export async function POST(request){const body=await request.json();const items=Array.isArray(body.items)?body.items:[];const allowed=items.filter(x=>['public','aggregate','public_or_aggregate'].includes(x.signalType||'public_or_aggregate'));const signals=analyzePublicDemand(allowed);const ranking=rankDemandSignals(signals);return NextResponse.json({data:ranking,meta:{received:items.length,eligible:allowed.length,matched:signals.length,privacy:'Somente sinais públicos ou agregados são aceitos para ranking.'}})}
