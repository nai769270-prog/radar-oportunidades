const templates={
 'whatsapp-ai':['Mapear perguntas frequentes','Definir fluxo inicial','Criar respostas e regras da IA','Configurar transferência para humano','Testar conversas','Preparar implantação'],
 website:['Coletar marca e objetivo','Definir páginas','Criar wireframe','Construir interface','Revisar conteúdo','Publicar'],
 'ai-chatbot':['Coletar base de conhecimento','Definir comportamento','Criar prompt principal','Configurar respostas','Testar cenários','Publicar'],
 'lead-generation':['Definir oferta','Criar landing page','Criar formulário','Configurar pipeline','Preparar follow-up','Testar conversão'],
 scheduling:['Definir serviços e horários','Criar regras de agenda','Configurar confirmações','Configurar lembretes','Testar reagendamento','Publicar'],
 'instagram-service':['Mapear tipos de mensagens','Criar triagem','Preparar respostas assistidas','Definir encaminhamento','Testar fluxo autorizado','Ativar integração oficial']
};
export function buildWorkspace(project={}){const tasks=templates[project.solution?.id]||['Levantar requisitos','Criar demonstração','Construir solução','Testar','Entregar'];return {projectId:project.id,solutionId:project.solution?.id,tasks:tasks.map((title,index)=>({id:`task-${index+1}`,title,status:index===0?'active':'pending'})),notes:[],artifacts:[],updatedAt:new Date().toISOString()}}
