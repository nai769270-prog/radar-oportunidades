const memory=globalThis.__radarPersistence||new Map();
if(!globalThis.__radarPersistence)globalThis.__radarPersistence=memory;
function config(){return {url:process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,token:process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN}}
async function command(args){const {url,token}=config();if(!url||!token)return null;const r=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(args),cache:'no-store'});if(!r.ok)throw new Error(`persistence_http_${r.status}`);const p=await r.json();return p.result}
export function persistenceConfigured(){const {url,token}=config();return Boolean(url&&token)}
export async function readState(key,fallback){if(!persistenceConfigured())return memory.has(key)?memory.get(key):fallback;const raw=await command(['GET',`radar:${key}`]);if(raw==null)return fallback;try{return JSON.parse(raw)}catch{return fallback}}
export async function writeState(key,value){memory.set(key,value);if(!persistenceConfigured())return {durable:false};await command(['SET',`radar:${key}`,JSON.stringify(value)]);return {durable:true}}
export async function mutateState(key,fallback,mutator){const current=await readState(key,fallback);const next=await mutator(structuredClone(current));await writeState(key,next);return next}
