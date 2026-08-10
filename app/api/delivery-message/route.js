import {NextResponse} from 'next/server';
import {listDeliveries} from '../../../lib/sales-store';
import {buildDeliveryMessage} from '../../../lib/delivery-message';
export async function POST(request){const {deliveryId,productTitle}=await request.json();const delivery=listDeliveries().find(x=>x.id===deliveryId);if(!delivery)return NextResponse.json({error:'delivery_not_found'},{status:404});if(delivery.status==='expired')return NextResponse.json({error:'delivery_expired'},{status:410});try{const message=buildDeliveryMessage({delivery,productTitle});return NextResponse.json({data:message,meta:{sent:false,requiresEmailProvider:true}})}catch(e){return NextResponse.json({error:e.message},{status:400})}}
