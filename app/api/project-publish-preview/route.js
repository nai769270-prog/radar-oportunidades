import {NextResponse} from 'next/server';
import {getProject,getWorkspace} from '../../../lib/store';
import {createDeploymentPlan} from '../../../lib/deployment-plan';
export async function POST(request){const {projectId,approved}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});const plan=createDeploymentPlan(project,getWorkspace(projectId));if(!plan.ready)return NextResponse.json({error:plan.reason},{status:400});if(approved!==true)return NextResponse.json({error:'approval_required',data:plan},{status:409});return NextResponse.json({data:{...plan,approvalStatus:'approved'},meta:{executed:false,next:'external_preview_deploy'}})}
