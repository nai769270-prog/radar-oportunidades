import {NextResponse} from 'next/server';
import {verifyMercadoPagoWebhook} from '../../../../lib/mercadopago-webhook';
import {getMercadoPagoPayment,buildConfirmedSale} from '../../../../lib/mercadopago-payment';
import {saveSaleEvent,createDelivery} from '../../../../lib/sales-store';
import {buildDeliveryMessage} from '../../../../lib/delivery-message';
import {sendTransactionalEmail} from '../../../../lib/email-provider';
import {getDigitalProductByReference} from '../../../../lib/product-catalog';
export async function POST(request){
 const secret=process.env.MERCADOPAGO_WEBHOOK_SECRET;if(!secret)return NextResponse.json({error:'mercadopago_webhook_secret_not_configured'},{status:503});
 const url=new URL(request.url);const body=await request.json().catch(()=>({}));const dataId=url.searchParams.get('data.id')||url.searchParams.get('data_id')||body?.data?.id;
 const valid=verifyMercadoPagoWebhook({xSignature:request.headers.get('x-signature'),xRequestId:request.headers.get('x-request-id'),dataId,secret});if(!valid)return NextResponse.json({error:'invalid_webhook_signature'},{status:401});
 const type=body?.type||body?.topic||null;if(type!=='payment')return NextResponse.json({received:true,ignored:true,type});
 try{
  const payment=await getMercadoPagoPayment(dataId);if(!payment.approved)return NextResponse.json({received:true,authenticated:true,verified:true,paymentStatus:payment.status,deliveryCreated:false});
  const product=await getDigitalProductByReference(payment.externalReference);if(!product)return NextResponse.json({received:true,authenticated:true,verified:true,error:'product_reference_not_found',reference:payment.externalReference,deliveryCreated:false},{status:409});
  if(product.status!=='active')return NextResponse.json({received:true,authenticated:true,verified:true,error:'product_not_active',productId:product.id,deliveryCreated:false},{status:409});
  if(!product.asset)return NextResponse.json({received:true,authenticated:true,verified:true,error:'product_asset_not_configured',productId:product.id,deliveryCreated:false},{status:409});
  const sale=buildConfirmedSale(payment,{productId:product.id,price:product.price});const saved=await saveSaleEvent(sale);const delivery=await createDelivery({event:saved.event,asset:product.asset});
  let email={sent:false,error:'buyer_email_required'};if(delivery?.buyerEmail&&!saved.duplicate){try{const message=buildDeliveryMessage({delivery,productTitle:product.title});email=await sendTransactionalEmail(message);if(email.sent)delivery.email={status:'sent',provider:email.provider,id:email.id,sentAt:email.sentAt};}catch(e){email={sent:false,error:e.message}}}else if(saved.duplicate){email={sent:false,skipped:true,error:'duplicate_payment_event'}}
  return NextResponse.json({received:true,authenticated:true,verified:true,product:{id:product.id,title:product.title},sale:saved.event,duplicate:saved.duplicate,delivery:{id:delivery?.id,status:delivery?.status,expiresAt:delivery?.expiresAt},email});
 }catch(e){return NextResponse.json({error:e.message},{status:502})}
}
