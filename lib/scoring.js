import { analyzeIntent } from './intent';
const includesAny=(text,terms)=>terms.some(x=>text.includes(x));
function freshness(signal={}){if(!signal.publishedAt)return {points:0,label:'data desconhecida'};const t=new Date(signal.publishedAt).getTime();if(!Number.isFinite(t))return {points:0,label:'data inválida'};const days=Math.max(0,(Date.now()-t)/86400000);if(days<=2)return {points:10,label:'até 2 dias'};if(days<=7)return {points:7,label:'até 7 dias'};if(days<=30)return {points:3,label:'até 30 dias'};if(days<=90)return {points:0,label:'até 90 dias'};return {points:-7,label:'mais de 90 dias'}}
export function scoreOpportunity(signal = {}) {
  const text = `${signal.title || ''} ${signal.text || ''}`.toLowerCase();
  let score = 10;
  const intent = analyzeIntent(text),fresh=freshness(signal),quality=Math.max(0,Math.min(1,Number(signal.sourceQuality??.5)));
  const commercial = ['empresa','negócio','negocio','cliente','atendimento','vendas','automação','automacao','sistema','software','fornecedor','serviço','servico'];
  const buying = ['procuro','busco','preciso','contratar','orçamento','orcamento','indicação','indicacao','recomendam','quanto custa','preço','preco','alguém faz','alguem faz'];
  const weak = ['tutorial','curso grátis','curso gratis','download grátis','download gratis','notícia','noticia','definição','definicao','o que é','o que e','vaga de emprego','currículo','curriculo'];
  const spam = ['cupom','aposta','bet','cassino','ganhe dinheiro rápido','ganhe dinheiro rapido'];
  score += Math.min(intent.boost, 42);
  score += Math.min(commercial.filter(term => text.includes(term)).length * 4, 20);
  if(includesAny(text,buying)) score += 14;
  if(/\b(r\$|reais|mensalidade|proposta|prazo)\b/i.test(text)) score += 5;
  if(signal.hasPublicContact) score += 6;
  if(signal.sourceUrl) score += 4;
  if(signal.evidence) score += 4;
  score += fresh.points;
  score += Math.round((quality-.5)*10);
  if(includesAny(text,weak)) score -= 16;
  if(includesAny(text,spam)) score -= 28;
  if(text.length<35) score -= 8;
  return Math.max(0, Math.min(100, score));
}
export function scoreContext(signal={}){const fresh=freshness(signal),quality=Math.max(0,Math.min(1,Number(signal.sourceQuality??.5)));return {freshnessPoints:fresh.points,freshnessLabel:fresh.label,sourceQuality:Math.round(quality*100),sourceQualityPoints:Math.round((quality-.5)*10)}}
export function intentFromScore(score) {if (score >= 75) return 'Alta';if (score >= 50) return 'Média';return 'Baixa';}
