export function classifyContact(contact={}){
  if(!contact.value) return {usable:false, reason:'missing'};
  if(contact.visibility !== 'public') return {usable:false, reason:'not-public'};
  if(!['business_email','business_phone','whatsapp_business','public_social','website_form'].includes(contact.type)) return {usable:false, reason:'unsupported'};
  return {usable:true, reason:'public-business-contact'};
}

export function filterUsableContacts(contacts=[]){return contacts.filter(c=>classifyContact(c).usable)}
