import {NextResponse} from 'next/server';
import {getProject,getWorkspace,saveWorkspace} from '../../../lib/store';
import {buildWorkspace} from '../../../lib/project-workspace';
import {generateDemo} from '../../../lib/demo-generator';
export async function POST(request){const {projectId}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});let workspace=getWorkspace(projectId)||buildWorkspace(project);const demo=generateDemo(project);workspace={...workspace,artifacts:[...(workspace.artifacts||[]),demo],updatedAt:new Date().toISOString()};saveWorkspace(workspace);return NextResponse.json({data:demo,meta:{saved:true}})}
