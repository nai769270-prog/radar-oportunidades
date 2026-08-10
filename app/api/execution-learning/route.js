import {NextResponse} from 'next/server';
import {listExecutionEvents,recordExecutionEvent,getExecutionLearning} from '../../../lib/execution-history';
export async function GET(){const[events,learning]=await Promise.all([listExecutionEvents(),getExecutionLearning()]);return NextResponse.json({data:{learning,events:events.slice(0,100)},meta:{meaning:'O score aumenta com conclusão, criação de produto, vendas e receita registrada. Ele usa somente histórico real salvo no Radar.'}})}
export async function POST(request){try{const event=await recordExecutionEvent(await request.json());return NextResponse.json({data:event},{status:201})}catch(e){return NextResponse.json({error:e.message},{status:400})}}
