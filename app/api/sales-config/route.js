import {NextResponse} from 'next/server';
import {saveSalesConfig,getSalesConfig,listSalesConfigs} from '../../../lib/sales-config';
export async function GET(request){const productId=new URL(request.url).searchParams.get('productId');return NextResponse.json({data:productId?await getSalesConfig(productId):await listSalesConfigs()})}
export async function POST(request){try{const body=await request.json();const data=await saveSalesConfig(body);return NextResponse.json({data},{status:201})}catch(e){return NextResponse.json({error:e.message},{status:400})}}
