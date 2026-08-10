import {NextResponse} from 'next/server';
import {getProject,getWorkspace,saveWorkspace} from '../../../lib/store';
import {buildWorkspace} from '../../../lib/project-workspace';
import {generateBuild} from '../../../lib/build-generator';
export async function POST(request){const {projectId}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});if(!project.requirements?.businessName&&!project.requirements?.services)return NextResponse.json({error:'requirements_required'},{status:400});let workspace=getWorkspace(projectId)||buildWorkspace(project);const build={id:crypto.randomUUID(),createdAt:new Date().toISOString(),...generateBuild(project)};workspace={...workspace,artifacts:[...(workspace.artifacts||[]),build],updatedAt:new Date().toISOString()};saveWorkspace(workspace);return NextResponse.json({data:build,meta:{saved:true,deployable:false,requiresReview:true}})}
