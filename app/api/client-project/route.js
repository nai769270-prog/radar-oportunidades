import {NextResponse} from 'next/server';
import {createClientProject} from '../../../lib/client-project';
export async function POST(request){const {opportunity,solution,client}=await request.json();if(!opportunity?.id)return NextResponse.json({error:'opportunity_required'},{status:400});if(!solution?.id)return NextResponse.json({error:'solution_required'},{status:400});const project=createClientProject({opportunity,solution,client});return NextResponse.json({data:project,meta:{persisted:false,next:'connect_project_store'}})}
