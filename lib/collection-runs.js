const state=globalThis.__radarCollectionRuns||{runs:[]};
if(!globalThis.__radarCollectionRuns)globalThis.__radarCollectionRuns=state;
export function startCollectionRun(trigger='manual'){const run={id:crypto.randomUUID(),trigger,status:'running',startedAt:new Date().toISOString(),finishedAt:null,sources:0,collected:0,matched:0,hot:0,errors:0};state.runs.unshift(run);state.runs=state.runs.slice(0,200);return run}
export function finishCollectionRun(id,data={}){const run=state.runs.find(x=>x.id===id);if(!run)return null;Object.assign(run,data,{status:data.errors>0?'completed_with_errors':'completed',finishedAt:new Date().toISOString()});return run}
export function failCollectionRun(id,error){const run=state.runs.find(x=>x.id===id);if(!run)return null;Object.assign(run,{status:'failed',error:String(error||'collection_failed'),finishedAt:new Date().toISOString()});return run}
export function listCollectionRuns(){return state.runs}
