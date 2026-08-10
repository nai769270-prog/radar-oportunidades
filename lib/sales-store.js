const store=globalThis.__radarSalesStore||{events:[],deliveries:[]};
if(!globalThis.__radarSalesStore)globalThis.__radarSalesStore=store;
export function saveSaleEvent(event){const i=store.events.findIndex(x=>x.id===event.id);if(i>=0)return {event:store.events[i],duplicate:true};store.events.unshift(event);store.events=store.events.slice(0,500);return {event,duplicate:false}}
export function listSaleEvents(){return store.events}
export function createDelivery({event,asset}){if(!event?.id||!asset)return null;const existing=store.deliveries.find(x=>x.eventId===event.id);if(existing)return existing;const delivery={id:crypto.randomUUID(),eventId:event.id,buyerEmail:event.buyerEmail||null,asset,status:'ready',createdAt:new Date().toISOString(),deliveredAt:null};store.deliveries.unshift(delivery);return delivery}
export function listDeliveries(){return store.deliveries}
