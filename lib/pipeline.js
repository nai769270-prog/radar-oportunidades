export const stages = ['new','qualified','enrichment_ready','contact_ready','contacted','replied','won','lost'];

export function canTransition(from,to){
  const a=stages.indexOf(from), b=stages.indexOf(to);
  return a>=0 && b>=0 && (b===a+1 || to==='lost');
}

export function transitionOpportunity(opportunity={},to){
  const from=opportunity.status||'new';
  if(!canTransition(from,to)) return {ok:false,error:'invalid_transition',from,to};
  return {ok:true,data:{...opportunity,status:to,statusUpdatedAt:new Date().toISOString()}};
}
