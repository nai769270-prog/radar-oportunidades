export function scoreOpportunity(signal = {}) {
  const text = `${signal.title || ''} ${signal.text || ''}`.toLowerCase();
  let score = 20;

  const highIntent = ['preciso', 'procuro', 'busco', 'contratar', 'orçamento', 'recomenda', 'indica', 'urgente'];
  const commercial = ['empresa', 'negócio', 'cliente', 'atendimento', 'vendas', 'automação', 'sistema', 'software'];

  score += highIntent.filter(term => text.includes(term)).length * 12;
  score += commercial.filter(term => text.includes(term)).length * 6;
  if (signal.hasPublicContact) score += 10;
  if (signal.sourceUrl) score += 5;

  return Math.max(0, Math.min(100, score));
}

export function intentFromScore(score) {
  if (score >= 80) return 'Alta';
  if (score >= 55) return 'Média';
  return 'Baixa';
}
