import {NextResponse} from 'next/server';
import {runCollection} from '../../collect-sources/route';
export async function GET(request){const secret=process.env.CRON_SECRET;if(!secret)return NextResponse.json({error:'cron_secret_not_configured'},{status:503});const auth=request.headers.get('authorization');if(auth!==`Bearer ${secret}`)return NextResponse.json({error:'unauthorized'},{status:401});try{const result=await runCollection('scheduled');return NextResponse.json(result)}catch(e){return NextResponse.json({error:e.message},{status:500})}}
