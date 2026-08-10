export function buildOutreachDraft(opportunity={}){
  const problem=opportunity.problem||opportunity.evidence||opportunity.title||'sua necessidade';
  const company=opportunity.business?.name;
  return {
    subject: company ? `Sobre uma possível solução para ${company}` : 'Sobre o que você está procurando',
    message: `Vi sua publicação sobre ${problem}. Trabalho com soluções nessa área e posso explicar uma opção objetiva para esse caso. Se fizer sentido, posso te mandar os detalhes por aqui.`,
    rules:['personalizar antes de enviar','não enviar em massa','usar apenas canal comercial público','respeitar pedido de não contato']
  };
}
