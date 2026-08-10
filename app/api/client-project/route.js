import {NextResponse} from 'next/server';
import {createClientProject} from '../../../lib/client-project';
import {listProjects,saveProject} from '../../../lib/store';
export async function GET(){return NextResponse.json({data:listProjects()})}
export async function POST(request){const {opportunity,solution,client}=await request.json();if(!opportunity?.id)return NextResponse.json({error:'opportunity_required'},{status:400});if(!solution?.id)return NextResponse.json({error:'solution_required'},{status:400});const project=saveProject(createClientProject({opportunity,solution,client}));return NextResponse.json({data:project,meta:{persisted:true}},{status:201})}
