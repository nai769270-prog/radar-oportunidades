const memory=globalThis.__radarStore||{opportunities:[],searches:[],projects:[]};
if(!memory.projects)memory.projects=[];if(!globalThis.__radarStore)globalThis.__radarStore=memory;
export function saveSearch(search){const record={id:crypto.randomUUID(),createdAt:new Date().toISOString(),...search};memory.searches.unshift(record);memory.searches=memory.searches.slice(0,100);return record}
export function listSearches(){return memory.searches}
export function saveOpportunity(opportunity){const existing=memory.opportunities.findIndex(item=>item.id===opportunity.id);if(existing>=0)memory.opportunities[existing]={...memory.opportunities[existing],...opportunity};else memory.opportunities.unshift(opportunity);return opportunity}
export function listSavedOpportunities(){return memory.opportunities}
export function getSavedOpportunity(id){return memory.opportunities.find(item=>item.id===id)||null}
export function updateOpportunityStatus(id,status){const index=memory.opportunities.findIndex(item=>item.id===id);if(index<0)return null;memory.opportunities[index]={...memory.opportunities[index],status,statusUpdatedAt:new Date().toISOString()};return memory.opportunities[index]}
export function saveProject(project){const i=memory.projects.findIndex(p=>p.id===project.id);if(i>=0)memory.projects[i]={...memory.projects[i],...project};else memory.projects.unshift(project);return project}
export function listProjects(){return memory.projects}
export function getProject(id){return memory.projects.find(p=>p.id===id)||null}
