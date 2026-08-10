export function buildApolloSearchPlan(opportunity={}){
 const domain=opportunity.business?.domain||(()=>{try{return new URL(opportunity.source?.url).hostname.replace(/^www\./,'')}catch{return null}})();
 const company=opportunity.business?.name||null;
 return {opportunityId:opportunity.id,domain,company,peopleSearch:domain?{q_organization_domains_list:[domain],person_seniorities:['owner','founder','c_suite','director','manager'],per_page:10}:null,canSearch:Boolean(domain||company),searchConsumesCredits:false,enrichmentRequiresConfirmation:true,note:'People Search does not reveal email or phone. Enrichment is a separate credit-consuming action.'};
}
