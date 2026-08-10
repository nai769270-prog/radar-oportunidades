export async function sendTransactionalEmail(message={}){
 const provider=String(process.env.EMAIL_PROVIDER||'').toLowerCase();
 if(provider!=='resend')return {sent:false,error:'email_provider_not_configured'};
 const apiKey=process.env.RESEND_API_KEY;const from=process.env.EMAIL_FROM;
 if(!apiKey||!from)return {sent:false,error:'email_credentials_not_configured'};
 if(!message.to||!message.subject||!message.body)return {sent:false,error:'invalid_email_message'};
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[message.to],subject:message.subject,text:message.body})});
 const data=await response.json();
 if(!response.ok)return {sent:false,error:'email_send_failed',details:data};
 return {sent:true,id:data.id||null,provider:'resend',sentAt:new Date().toISOString()};
}
