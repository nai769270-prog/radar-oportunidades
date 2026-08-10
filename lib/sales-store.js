const store=globalThis.__radarSalesStore||{events:[],deliveries:[]};
if(!globalThis.__radarSalesStore)globalThis.__radarSalesStore=store;
export function saveSaleEvent(event){const i=store.events.findIndex(x=>x.id===event.id);if(i>=0)return {event:store.events[i],duplicate:true};store.events.unshift(event);store.events=store.events.slice(0,500);return {event,duplicate:false}}
export function listSaleEvents(){return store.events}
export function createDelivery({event,asset}){if(!event?.id||!asset)return null;const existing=store.deliveries.find(x=>x.eventId===event.id);if(existing)return existing;const now=Date.now();const delivery={id:crypto.randomUUID(),eventId:event.id,buyerEmail:event.buyerEmail||null,asset,status:'ready',token:crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-',''),createdAt:new Date(now).toISOString(),expiresAt:new Date(now+72*60*60*1000).toISOString(),deliveredAt:null,accessCount:0,lastAccessAt:null};store.deliveries.unshift(delivery);return delivery}
export function getDeliveryByToken(token){return store.deliveries.find(x=>x.token===token)||null}
export function registerDeliveryAccess(token){const d=getDeliveryByToken(token);if(!d)return {error:'delivery_not_found'};if(Date.now()>new Date(d.expiresAt).getTime()){d.status='expired';return {error:'delivery_expired'}};d.accessCount=(d.accessCount||0)+1;d.lastAccessAt=new Date().toISOString();if(!d.deliveredAt)d.deliveredAt=d.lastAccessAt;d.status='delivered';return {delivery:d}}
export function listDeliveries(){return store.deliveries}
