import { NextResponse } from 'next/server';
import { scoreOpportunity, intentFromScore } from '../../../lib/scoring';
import { dedupeSignals } from '../../../lib/dedupe';
import { buildOpportunity } from '../../../lib/opportunity-model';
import { getCategoryAdjustment } from '../../../lib/execution-history';

const demoSignals = [
  { id: 'demo-1', title: 'Preciso automatizar atendimento no WhatsApp', text: 'Busco sistema para minha empresa responder clientes.', source: 'demo', sourceUrl: null, hasPublicContact: true, category: 'Automação de atendimento' },
  { id: 'demo-2', title: 'Alguém indica automação para pequena empresa?', text: 'Procuro uma solução simples para organizar atendimento.', source: 'demo', sourceUrl: null, hasPublicContact: false, category: 'Automação de atendimento' },
];

function inferCategory(signal={}){if(signal.category)return signal.category;const text=`${signal.title||''} ${signal.text||''}`.toLowerCase();if(/whatsapp|atendimento|cliente|chat/.test(text))return 'Automação de atendimento';if(/marketing|anúncio|anuncio|venda/.test(text))return 'Marketing e vendas';if(/estudo|concurso|prova/.test(text))return 'Educação';return 'Geral'}

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q')?.toLowerCase().trim();
  const filtered = q ? demoSignals.filter(s => `${s.title} ${s.text}`.toLowerCase().includes(q)) : demoSignals;
  const unique = dedupeSignals(filtered);
  const data = await Promise.all(unique.map(async signal => {
    const category=inferCategory(signal);
    const baseScore = scoreOpportunity(signal);
    const learning = await getCategoryAdjustment(category);
    const finalScore=Math.max(0,Math.min(100,baseScore+learning.adjustment));
    const opportunity = buildOpportunity({...signal,category}, finalScore, intentFromScore(finalScore));
    return { ...opportunity, category, score:finalScore, baseScore, learningAdjustment:learning.adjustment, learningConfidence:learning.confidence, learningReason:learning.reason, hasPublicContact: signal.hasPublicContact };
  }));
  data.sort((a,b) => b.score - a.score || b.baseScore-a.baseScore);
  return NextResponse.json({ data, meta: { mode: 'demo', count: data.length, pipeline: 'dedupe+base-score+category-learning+normalize', learning: 'bounded -15/+15 with confidence' } });
}
