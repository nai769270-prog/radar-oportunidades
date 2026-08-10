import {NextResponse} from 'next/server';
import {getProject,getWorkspace,addDeployment} from '../../../lib/store';
import {createDeploymentPlan} from '../../../lib/deployment-plan';
export async function POST(request){
 const {projectId}=await request.json();
 const project=getProject(projectId);
 if(!project)return NextResponse.json({error:'project_not_found'},{status:404});
 if(project.deployment?.status!=='approved')return NextResponse.json({error:'preview_not_approved'},{status:400});
 const workspace=getWorkspace(projectId);const plan=createDeploymentPlan(project,workspace);
 if(!plan.ready)return NextResponse.json({error:plan.reason||'deployment_not_ready'},{status:400});
 if(plan.sourceArtifactId!==project.deployment?.sourceArtifactId)return NextResponse.json({error:'approved_build_changed'},{status:409});
 const token=process.env.VERCEL_TOKEN;const teamId=process.env.VERCEL_TEAM_ID;
 if(!token)return NextResponse.json({error:'vercel_token_not_configured',setup:{required:['VERCEL_TOKEN'],optional:['VERCEL_TEAM_ID']}},{status:503});
 const qs=teamId?'?teamId='+encodeURIComponent(teamId):'';
 const response=await fetch('https://api.vercel.com/v13/deployments'+qs,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({name:plan.projectName,project:plan.projectName,files:plan.files,projectSettings:{framework:null}})});
 const payload=await response.json();
 if(!response.ok)return NextResponse.json({error:'vercel_deploy_failed',details:payload?.error||payload},{status:502});
 const url=payload.url?.startsWith('http')?payload.url:`https://${payload.url}`;
 const deployment={provider:'vercel',mode:'preview',status:'deployed',url,deploymentId:payload.id||payload.uid||null,externalProjectId:payload.projectId||null,sourceArtifactId:plan.sourceArtifactId,deployedAt:new Date().toISOString()};
 const updated=addDeployment(projectId,deployment);
 return NextResponse.json({data:updated.deployment,history:updated.deploymentHistory});
}
