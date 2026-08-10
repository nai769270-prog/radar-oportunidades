export function buildEnrichmentConsent(candidate={}){
 return {
  candidateId:candidate.id||null,
  name:candidate.name||'contato selecionado',
  creditCost:1,
  revealPhone:false,
  revealPersonalEmails:false,
  confirmationText:`Enriquecer ${candidate.name||'este contato'} pode usar 1 crédito do Apollo (sem cobrança se não houver correspondência).`,
  requiresExplicitConfirmation:true
 };
}

export function validApolloPersonId(id=''){return /^[a-f0-9]{24}$/.test(String(id))}
