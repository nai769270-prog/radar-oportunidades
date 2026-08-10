import { NextResponse } from 'next/server';
import { scoreOpportunity, intentFromScore } from '../../../lib/scoring';

const demoSignals = [
  { id: 1, title: 'Preciso automatizar atendimento no WhatsApp', text: 'Busco sistema para minha empresa responder clientes.', source: 'demo', sourceUrl: null, hasPublicContact: true },
  { id: 2, title: 'Alguém indica automação para pequena empresa?', text: 'Procuro uma solução simples para organizar atendimento.', source: 'demo', sourceUrl: null, hasPublicContact: false },
];

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q')?.toLowerCase().trim();
  const filtered = q ? demoSignals.filter(s => `${s.title} ${s.text}`.toLowerCase().includes(q)) : demoSignals;
  const data = filtered.map(signal => {
    const score = scoreOpportunity(signal);
    return { ...signal, score, intent: intentFromScore(score) };
  }).sort((a,b) => b.score - a.score);
  return NextResponse.json({ data, meta: { mode: 'demo', count: data.length } });
}
