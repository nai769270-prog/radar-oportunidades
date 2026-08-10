export function createClientProject({opportunity,solution,client={}}){
 return {
  id:crypto.randomUUID(),
  opportunityId:opportunity.id,
  client:{name:client.name||opportunity.business?.name||'Cliente a confirmar',domain:client.domain||opportunity.business?.domain||null},
  solution:{id:solution.id,name:solution.name},
  status:'requirements',
  stages:[
   {id:'requirements',name:'Requisitos',status:'active'},
   {id:'demo',name:'Demonstração',status:'pending'},
   {id:'proposal',name:'Proposta',status:'pending'},
   {id:'build',name:'Construção',status:'pending'},
   {id:'testing',name:'Testes',status:'pending'},
   {id:'delivery',name:'Entrega',status:'pending'}
  ],
  deliverables:solution.deliverables||[],
  createdAt:new Date().toISOString()
 };
}
