import {readState,writeState} from './persistence';
const KEY='collection-runs';const fallback={runs:[]};
export async function startCollectionRun(trigger='manual'){const state=await readState(KEY,fallback);const run={id:crypto.randomUUID(),trigger,status:'running',startedAt:new Date().toISOString(),finishedAt:null,sources:0,collected:0,matched:0,hot:0,errors:0};state.runs.unshift(run);state.runs=state.runs.slice(0,200);await writeState(KEY,state);return run}
export async function finishCollectionRun(id,data={}){const state=await readState(KEY,fallback);const run=state.runs.find(x=>x.id===id);if(!run)return null;Object.assign(run,data,{status:data.errors>0?'completed_with_errors':'completed',finishedAt:new Date().toISOString()});await writeState(KEY,state);return run}
export async function failCollectionRun(id,error){const state=await readState(KEY,fallback);const run=state.runs.find(x=>x.id===id);if(!run)return null;Object.assign(run,{status:'failed',error:String(error||'collection_failed'),finishedAt:new Date().toISOString()});await writeState(KEY,state);return run}
export async function listCollectionRuns(){return (await readState(KEY,fallback)).runs}
