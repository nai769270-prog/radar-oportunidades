import {NextResponse} from 'next/server';
import {getProject,getWorkspace,saveWorkspace,updateWorkspaceTask} from '../../../lib/store';
import {buildWorkspace} from '../../../lib/project-workspace';
export async function POST(request){const {projectId}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});let workspace=getWorkspace(projectId);if(!workspace)workspace=saveWorkspace(buildWorkspace(project));return NextResponse.json({data:{project,workspace}})}
export async function PATCH(request){const {projectId,taskId,status}=await request.json();if(!['active','pending','done'].includes(status))return NextResponse.json({error:'invalid_status'},{status:400});const workspace=updateWorkspaceTask(projectId,taskId,status);if(!workspace)return NextResponse.json({error:'workspace_or_task_not_found'},{status:404});return NextResponse.json({data:workspace})}
