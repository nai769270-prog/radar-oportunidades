export async function searchApolloPeople({domain,titles=[]}){
 const key=process.env.APOLLO_API_KEY;
 if(!key)return {configured:false,people:[]};
 if(!domain)return {configured:true,people:[],reason:'domain_required'};
 const response=await fetch('https://api.apollo.io/api/v1/mixed_people/search',{method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-cache','X-Api-Key':key},body:JSON.stringify({q_organization_domains_list:[domain],person_titles:titles.length?titles:undefined,person_seniorities:['owner','founder','c_suite','director','manager'],page:1,per_page:10}),cache:'no-store'});
 if(!response.ok)throw new Error(`apollo_people_search_${response.status}`);
 const payload=await response.json();
 return {configured:true,people:(payload.people||[]).map(p=>({id:p.id,name:p.name||[p.first_name,p.last_name_obfuscated||p.last_name].filter(Boolean).join(' '),title:p.title||null,organization:p.organization?.name||p.organization_name||null,linkedinUrl:p.linkedin_url||null,emailStatus:p.email_status||null,masked:Boolean(p.last_name_obfuscated)}))};
}
