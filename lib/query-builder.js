const intentPhrases = ['preciso de','procuro','alguém indica','recomendação','quero contratar','onde encontro'];

export function buildDiscoveryQueries(topic='') {
  const clean = String(topic).trim().replace(/["<>]/g,'');
  if (!clean) return [];
  return intentPhrases.map(phrase => `"${phrase}" "${clean}"`);
}
