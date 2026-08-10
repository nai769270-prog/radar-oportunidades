export const checkoutProviders=[
 {id:'hotmart',name:'Hotmart',mode:'external_checkout'},
 {id:'kiwify',name:'Kiwify',mode:'external_checkout'},
 {id:'stripe',name:'Stripe',mode:'api_checkout'},
 {id:'mercadopago',name:'Mercado Pago',mode:'api_checkout'}
];
export function createSalesPlan(product={},provider='hotmart'){
 const selected=checkoutProviders.find(x=>x.id===provider)||checkoutProviders[0];
 return {id:crypto.randomUUID(),productId:product.id||null,productTitle:product.title||'Produto digital',price:product.price||null,provider:selected,status:'draft',checkout:{configured:false,url:null},delivery:{mode:'after_payment_confirmation',configured:false,asset:null,emailTemplate:`Pagamento confirmado. Seu acesso a ${product.title||'seu produto'} está disponível no link seguro abaixo.`},tracking:{sales:0,revenue:0,lastSaleAt:null},checks:{contentReviewed:false,claimsReviewed:false,privacyPublished:false,refundPolicyPublished:false,checkoutTested:false,deliveryTested:false},createdAt:new Date().toISOString()};
}
export function readyForSales(plan={}){const checks=plan.checks||{};return Boolean(plan.checkout?.configured&&plan.delivery?.configured&&Object.values(checks).every(Boolean))}
