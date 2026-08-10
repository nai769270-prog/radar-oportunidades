export function buildDeliveryMessage({delivery,productTitle,baseUrl}){
 if(!delivery?.token)throw new Error('delivery_token_required');
 if(!delivery.buyerEmail)throw new Error('buyer_email_required');
 const origin=String(baseUrl||process.env.APP_URL||'').replace(/\/$/,'');
 if(!origin)throw new Error('app_url_not_configured');
 const accessUrl=`${origin}/api/delivery/${delivery.token}`;
 return {to:delivery.buyerEmail,subject:`Seu acesso: ${productTitle||'produto digital'}`,body:`Olá!\n\nSeu pagamento foi confirmado e o acesso ao material ${productTitle||'digital'} está liberado.\n\nAcesse pelo link seguro abaixo:\n${accessUrl}\n\nO link expira em ${new Date(delivery.expiresAt).toLocaleString('pt-BR')}.\n\nSe você não reconhece esta compra, responda ao canal de suporte informado na página de venda.`,accessUrl};
}
