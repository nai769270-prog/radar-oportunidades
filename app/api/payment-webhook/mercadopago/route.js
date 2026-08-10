import {NextResponse} from 'next/server';
import {verifyMercadoPagoWebhook} from '../../../../lib/mercadopago-webhook';
import {getMercadoPagoPayment,buildConfirmedSale} from '../../../../lib/mercadopago-payment';
import {saveSaleEvent,createDelivery} from '../../../../lib/sales-store';
import {buildDeliveryMessage} from '../../../../lib/delivery-message';
import {sendTransactionalEmail} from '../../../../lib/email-provider';
export async function POST(request){
 const secret=process.env.MERCADOPAGO_WEBHOOK_SECRET;
 if(!secret)return NextResponse.json({error:'mercadopago_webhook_secret_not_configured'},{status:503});
 const url=new URL(request.url);const body=await request.json().catch(()=>({}));
 const dataId=url.searchParams.get('data.id')||url.searchParams.get('data_id')||body?.data?.id;
 const valid=verifyMercadoPagoWebhook({xSignature:request.headers.get('x-signature'),xRequestId:request.headers.get('x-request-id'),dataId,secret});
 if(!valid)return NextResponse.json({error:'invalid_webhook_signature'},{status:401});
 const type=body?.type||body?.topic||null;if(type!=='payment')return NextResponse.json({received:true,ignored:true,type});
 try{
  const payment=await getMercadoPagoPayment(dataId);
  if(!payment.approved)return NextResponse.json({received:true,authenticated:true,verified:true,paymentStatus:payment.status,deliveryCreated:false});
  const expected={productId:payment.externalReference||null};
  const sale=buildConfirmedSale(payment,expected);const saved=saveSaleEvent(sale);
  const asset=process.env.DIGITAL_PRODUCT_ASSET_URL;
  if(!asset)return NextResponse.json({received:true,authenticated:true,verified:true,sale:saved.event,duplicate:saved.duplicate,deliveryCreated:false,error:'digital_product_asset_url_not_configured'});
  const delivery=createDelivery({event:saved.event,asset});
  let email={sent:false,error:'buyer_email_required'};
  if(delivery?.buyerEmail){try{const message=buildDeliveryMessage({delivery,productTitle:process.env.DIGITAL_PRODUCT_TITLE||'Produto digital'});email=await sendTransactionalEmail(message);if(email.sent)delivery.email={status:'sent',provider:email.provider,id:email.id,sentAt:email.sentAt};}catch(e){email={sent:false,error:e.message}}}
  return NextResponse.json({received:true,authenticated:true,verified:true,sale:saved.event,duplicate:saved.duplicate,delivery:{id:delivery?.id,status:delivery?.status,expiresAt:delivery?.expiresAt},email});
 }catch(e){return NextResponse.json({error:e.message},{status:502})}
}
