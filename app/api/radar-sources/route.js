import {NextResponse} from 'next/server';
import {listRadarSources,saveRadarSource,updateRadarSource,radarSourceTypes} from '../../../lib/radar-sources';
export async function GET(){return NextResponse.json({data:listRadarSources(),meta:{allowedTypes:radarSourceTypes,privacy:'Fontes devem ser públicas/agregadas; leads exigem opt-in.'}})}
export async function POST(request){try{const body=await request.json();return NextResponse.json({data:saveRadarSource(body)},{status:201})}catch(e){return NextResponse.json({error:e.message},{status:400})}}
export async function PATCH(request){try{const body=await request.json();if(!body.id)return NextResponse.json({error:'source_id_required'},{status:400});const source=updateRadarSource(body.id,body.changes||{});if(!source)return NextResponse.json({error:'source_not_found'},{status:404});return NextResponse.json({data:source})}catch(e){return NextResponse.json({error:e.message},{status:400})}}
