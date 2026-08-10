import {NextResponse} from 'next/server';
import {getProject} from '../../../lib/store';
import {buildWorkspace} from '../../../lib/project-workspace';
export async function POST(request){const {projectId}=await request.json();const project=getProject(projectId);if(!project)return NextResponse.json({error:'project_not_found'},{status:404});return NextResponse.json({data:{project,workspace:buildWorkspace(project)}})}
