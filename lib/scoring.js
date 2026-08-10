import { analyzeIntent } from './intent';

export function scoreOpportunity(signal = {}) {
  const text = `${signal.title || ''} ${signal.text || ''}`.toLowerCase();
  let score = 12;
  const intent = analyzeIntent(text);
  const commercial = ['empresa','negócio','cliente','atendimento','vendas','automação','sistema','software','fornecedor','serviço'];
  score += Math.min(intent.boost, 48);
  score += Math.min(commercial.filter(term => text.includes(term)).length * 5, 20);
  if (signal.hasPublicContact) score += 8;
  if (signal.sourceUrl) score += 5;
  if (signal.evidence) score += 4;
  return Math.max(0, Math.min(100, score));
}

export function intentFromScore(score) {
  if (score >= 75) return 'Alta';
  if (score >= 50) return 'Média';
  return 'Baixa';
}
