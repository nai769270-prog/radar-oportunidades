const families=[
  {id:'need',weight:1.0,phrases:['preciso de','estou precisando de','busco','procuro']},
  {id:'hire',weight:1.0,phrases:['quero contratar','preciso contratar','alguém faz','quem faz']},
  {id:'price',weight:.95,phrases:['quanto custa','orçamento para','preço de','valor para']},
  {id:'recommendation',weight:.85,phrases:['alguém indica','recomendação de','qual empresa faz','onde encontro']},
  {id:'replacement',weight:.8,phrases:['alternativa para','substituir','trocar de fornecedor','não estou satisfeito com']}
];
function cleanTopic(topic=''){return String(topic).trim().replace(/["<>]/g,'').replace(/\s+/g,' ')}
export function buildDiscoveryQueries(topic=''){
  const clean=cleanTopic(topic);if(!clean)return [];
  const out=[];for(const family of families){for(const phrase of family.phrases){out.push({query:`"${phrase}" "${clean}"`,family:family.id,weight:family.weight,phrase})}}
  return out;
}
export function discoveryQueryStrings(topic='',limit=8){return buildDiscoveryQueries(topic).slice(0,limit).map(x=>x.query)}
