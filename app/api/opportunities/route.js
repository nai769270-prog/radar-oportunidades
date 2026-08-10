import { NextResponse } from 'next/server';
import { scoreOpportunity, intentFromScore } from '../../../lib/scoring';
import { dedupeSignals } from '../../../lib/dedupe';
import { buildOpportunity } from '../../../lib/opportunity-model';

const demoSignals = [
  { id: 'demo-1', title: 'Preciso automatizar atendimento no WhatsApp', text: 'Busco sistema para minha empresa responder clientes.', source: 'demo', sourceUrl: null, hasPublicContact: true },
  { id: 'demo-2', title: 'Alguém indica automação para pequena empresa?', text: 'Procuro uma solução simples para organizar atendimento.', source: 'demo', sourceUrl: null, hasPublicContact: false },
];

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q')?.toLowerCase().trim();
  const filtered = q ? demoSignals.filter(s => `${s.title} ${s.text}`.toLowerCase().includes(q)) : demoSignals;
  const unique = dedupeSignals(filtered);
  const data = unique.map(signal => {
    const score = scoreOpportunity(signal);
    const opportunity = buildOpportunity(signal, score, intentFromScore(score));
    return { ...opportunity, hasPublicContact: signal.hasPublicContact };
  }).sort((a,b) => b.score - a.score);
  return NextResponse.json({ data, meta: { mode: 'demo', count: data.length, pipeline: 'dedupe+score+normalize' } });
}
