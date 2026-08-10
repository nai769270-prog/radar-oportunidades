import {NextResponse} from 'next/server';
import {webhookSetup} from '../../../../lib/webhook-security';
const providers=new Set(['hotmart','kiwify','stripe','mercadopago']);
export async function POST(request,{params}){const {provider}=await params;if(!providers.has(provider))return NextResponse.json({error:'unsupported_provider'},{status:404});const setup=webhookSetup(provider);return NextResponse.json({error:'official_provider_verification_not_configured',setup},{status:503})}
export async function GET(request,{params}){const {provider}=await params;if(!providers.has(provider))return NextResponse.json({error:'unsupported_provider'},{status:404});return NextResponse.json({data:webhookSetup(provider),status:'blocked_until_official_verification'})}
