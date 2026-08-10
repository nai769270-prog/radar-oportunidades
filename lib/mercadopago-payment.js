export async function getMercadoPagoPayment(paymentId){
 const token=process.env.MERCADOPAGO_ACCESS_TOKEN;
 if(!token)throw new Error('mercadopago_access_token_not_configured');
 if(!paymentId)throw new Error('payment_id_required');
 const response=await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
 const data=await response.json();
 if(!response.ok)throw new Error(data?.message||'mercadopago_payment_lookup_failed');
 return {id:String(data.id),status:data.status,approved:data.status==='approved',amount:Number(data.transaction_amount||0),currency:data.currency_id||'BRL',externalReference:data.external_reference||null,payerEmail:data.payer?.email||null,dateApproved:data.date_approved||null,liveMode:Boolean(data.live_mode)};
}
export function buildConfirmedSale(payment,expected={}){
 if(!payment?.approved)return null;
 if(expected.productId&&payment.externalReference&&String(payment.externalReference)!==String(expected.productId))throw new Error('payment_product_mismatch');
 if(expected.price!=null&&Math.abs(Number(expected.price)-Number(payment.amount))>0.01)throw new Error('payment_amount_mismatch');
 return {id:`mp-${payment.id}`,provider:'mercadopago',providerPaymentId:payment.id,status:'paid',amount:payment.amount,currency:payment.currency,buyerEmail:payment.payerEmail,productId:expected.productId||payment.externalReference||null,receivedAt:payment.dateApproved||new Date().toISOString(),verifiedAt:new Date().toISOString(),liveMode:payment.liveMode};
}
