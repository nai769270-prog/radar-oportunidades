const demos={
 'whatsapp-ai':p=>({type:'conversation-flow',title:`Demo de atendimento — ${p.client?.name}`,content:['Cliente inicia conversa','IA identifica a necessidade','IA responde usando informações do negócio','IA qualifica o interesse','Atendimento é transferido para humano quando necessário']}),
 website:p=>({type:'website-brief',title:`Protótipo de site — ${p.client?.name}`,content:['Hero com proposta principal','Benefícios/serviços','Prova social','CTA','Formulário de contato']}),
 'ai-chatbot':p=>({type:'chatbot-blueprint',title:`Demo de chatbot — ${p.client?.name}`,content:['Saudação','Identificação da intenção','Consulta à base de conhecimento','Resposta contextual','Escalonamento humano']}),
 'lead-generation':p=>({type:'funnel-blueprint',title:`Funil de leads — ${p.client?.name}`,content:['Oferta','Landing page','Formulário','Qualificação','Follow-up']}),
 scheduling:p=>({type:'booking-flow',title:`Demo de agendamento — ${p.client?.name}`,content:['Escolher serviço','Escolher horário','Confirmar dados','Enviar confirmação','Lembrete/reagendamento']}),
 'instagram-service':p=>({type:'social-service-flow',title:`Atendimento Instagram — ${p.client?.name}`,content:['Receber mensagem','Classificar intenção','Sugerir resposta','Encaminhar oportunidade','Registrar atendimento']})
};
export function generateDemo(project={}){const fn=demos[project.solution?.id];return fn?{id:crypto.randomUUID(),createdAt:new Date().toISOString(),...fn(project)}:{id:crypto.randomUUID(),type:'generic',title:`Demo — ${project.client?.name}`,content:['Levantar necessidade','Preparar proposta visual','Validar com cliente'],createdAt:new Date().toISOString()}}
