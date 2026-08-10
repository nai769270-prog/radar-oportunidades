const state=globalThis.__radarSources||{sources:[]};
if(!globalThis.__radarSources)globalThis.__radarSources=state;
const allowedTypes=['public_feed','public_search','aggregate_trends','opt_in_leads'];
export function listRadarSources(){return state.sources}
export function saveRadarSource(input={}){if(!allowedTypes.includes(input.type))throw new Error('source_type_not_allowed');if(!input.name)throw new Error('source_name_required');const now=new Date().toISOString();const existing=input.id?state.sources.find(x=>x.id===input.id):null;const source={...(existing||{}),id:input.id||crypto.randomUUID(),name:String(input.name),type:input.type,url:input.url||null,status:input.status||existing?.status||'inactive',privacyMode:input.type==='opt_in_leads'?'consent_required':'public_or_aggregate_only',createdAt:existing?.createdAt||now,updatedAt:now,lastCollectedAt:existing?.lastCollectedAt||null,lastError:null};const i=state.sources.findIndex(x=>x.id===source.id);if(i>=0)state.sources[i]=source;else state.sources.unshift(source);return source}
export function updateRadarSource(id,changes={}){const current=state.sources.find(x=>x.id===id);if(!current)return null;return saveRadarSource({...current,...changes,id})}
export function markSourceCollection(id,{ok,error}={}){const source=state.sources.find(x=>x.id===id);if(!source)return null;source.lastCollectedAt=new Date().toISOString();source.lastError=ok?null:String(error||'collection_failed');source.updatedAt=source.lastCollectedAt;return source}
export const radarSourceTypes=allowedTypes;
