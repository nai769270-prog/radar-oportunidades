import {NextResponse} from 'next/server';
import {listSaleEvents,listDeliveries} from '../../../lib/sales-store';
export async function GET(){const events=listSaleEvents();const deliveries=listDeliveries().map(d=>({id:d.id,eventId:d.eventId,buyerEmail:d.buyerEmail,status:d.status,createdAt:d.createdAt,expiresAt:d.expiresAt,deliveredAt:d.deliveredAt,accessCount:d.accessCount,lastAccessAt:d.lastAccessAt}));return NextResponse.json({data:{events,deliveries}})}
