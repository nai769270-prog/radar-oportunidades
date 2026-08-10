import {NextResponse} from 'next/server';
import {listDigitalProducts,saveDigitalProduct} from '../../../lib/product-catalog';
export async function GET(){return NextResponse.json({data:listDigitalProducts()})}
export async function POST(request){const body=await request.json();if(!body?.title)return NextResponse.json({error:'product_title_required'},{status:400});const product=saveDigitalProduct(body);return NextResponse.json({data:product},{status:201})}
