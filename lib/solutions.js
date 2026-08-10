export const solutions=[
 {id:'whatsapp-ai',name:'Automação de WhatsApp com IA',keywords:['whatsapp','atendimento','responder clientes','chatbot'],deliverables:['fluxo de atendimento','FAQ inteligente','qualificação de leads','transferência para humano'],demo:'Simulação de conversa personalizada'},
 {id:'website',name:'Criação de Site',keywords:['site','landing page','página','loja virtual'],deliverables:['site responsivo','formulário de contato','SEO básico','publicação'],demo:'Protótipo da página inicial'},
 {id:'ai-chatbot',name:'Chatbot com IA',keywords:['chatbot','assistente','ia','suporte'],deliverables:['assistente treinado','base de conhecimento','handoff humano'],demo:'Chat interativo de demonstração'},
 {id:'lead-generation',name:'Captação de Leads',keywords:['leads','clientes','captação','vendas'],deliverables:['landing page','formulário','pipeline','automação de follow-up'],demo:'Funil demonstrativo'},
 {id:'scheduling',name:'Agendamento Automático',keywords:['agendamento','agenda','marcação','consulta'],deliverables:['agenda online','confirmações','lembretes','reagendamento'],demo:'Fluxo de agendamento'},
 {id:'instagram-service',name:'Atendimento Instagram',keywords:['instagram','direct','dm','mensagens'],deliverables:['triagem de mensagens','respostas assistidas','encaminhamento comercial'],demo:'Fluxo de atendimento autorizado'}
];

export function matchSolutions(opportunity={}){
 const text=`${opportunity.title||''} ${opportunity.problem||''} ${opportunity.evidence||''}`.toLowerCase();
 return solutions.map(s=>({...s,matchScore:s.keywords.reduce((n,k)=>n+(text.includes(k)?25:0),0)})).filter(s=>s.matchScore>0).sort((a,b)=>b.matchScore-a.matchScore);
}
