const actionRules=[
 {test:x=>x.risk==='health',actions:['Criar conteúdo educacional revisável','Preparar landing page sem promessa de resultado','Validar oferta antes de publicar']},
 {test:x=>/estudo|concurso|prova/i.test(`${x.category} ${x.productSuggestion}`),actions:['Criar ebook ou guia prático','Gerar checklist/material bônus','Preparar landing page e oferta']},
 {test:x=>/finan|gasto|orçamento|planilha/i.test(`${x.category} ${x.productSuggestion}`),actions:['Criar planilha ou guia digital','Montar página de demonstração','Preparar oferta de baixo ticket']},
 {test:x=>/whatsapp|atendimento|chatbot|site|lead|agendamento|instagram/i.test(`${x.category} ${x.productSuggestion}`),actions:['Criar demonstração da solução','Montar proposta comercial','Preparar abordagem para lead com base legítima']},
 {test:()=>true,actions:['Validar problema e público','Criar MVP do produto digital','Preparar página de oferta']}
];
export function buildOpportunityActionPlan(opportunity={}){const rule=actionRules.find(r=>r.test(opportunity));const heat=opportunity.heat||'watch';const priority=heat==='hot'?'agora':heat==='strong'?'alta':heat==='warming'?'média':'observação';return {opportunityId:opportunity.categoryId||null,category:opportunity.category||'Oportunidade',heat,priority,productSuggestion:opportunity.productSuggestion||null,actions:rule.actions.map((title,index)=>({id:`action-${index+1}`,title,status:'suggested',order:index+1})),autoExecutionAllowed:false,requiresReview:true,reason:'O Radar prepara o plano; publicação, contato com pessoas e gastos exigem revisão/ação autorizada.'}}
export function attachActionPlans(items=[]){return items.map(x=>({...x,actionPlan:buildOpportunityActionPlan(x)}))}
