import {NextResponse} from 'next/server';
import {getProject,getWorkspace} from '../../../lib/store';
import {createDeploymentPlan} from '../../../lib/deployment-plan';
export async function POST(request){const {projectId}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});const workspace=getWorkspace(projectId);const plan=createDeploymentPlan(project,workspace);return NextResponse.json({data:plan})}
