const patterns = [
  { key: 'buy', weight: 30, terms: ['quero comprar','onde comprar','preciso comprar','procuro fornecedor'] },
  { key: 'hire', weight: 30, terms: ['quero contratar','preciso contratar','procuro profissional','procuro empresa'] },
  { key: 'recommendation', weight: 22, terms: ['alguém indica','recomendam','alguma indicação','qual vocês recomendam'] },
  { key: 'problem', weight: 18, terms: ['não consigo','estou com problema','preciso resolver','como resolver'] },
  { key: 'urgency', weight: 12, terms: ['urgente','hoje','o quanto antes','imediatamente'] },
];

export function analyzeIntent(text='') {
  const normalized = text.toLowerCase();
  const matches = patterns.filter(p => p.terms.some(term => normalized.includes(term)));
  return { labels: matches.map(m=>m.key), boost: matches.reduce((sum,m)=>sum+m.weight,0) };
}
