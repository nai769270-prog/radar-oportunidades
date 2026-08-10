'use client';
import { useEffect,useState } from 'react';

export default function OpportunityPage(){
 const [o,setO]=useState(null); const [draft,setDraft]=useState(null);
 useEffect(()=>{try{const raw=sessionStorage.getItem('radar:selected');if(raw)setO(JSON.parse(raw));}catch{}},[]);
 async function prepare(){if(!o)return;const r=await fetch('/api/outreach-draft',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});setDraft((await r.json()).data)}
 if(!o)return <main className="detail"><a href="/">← Voltar</a><div className="panel"><h1>Nenhuma oportunidade selecionada</h1><p>Volte ao Radar e clique em Analisar.</p></div></main>;
 return <main className="detail"><a href="/">← Voltar ao Radar</a><div className="detailGrid"><section className="panel"><small>OPORTUNIDADE</small><h1>{o.title}</h1><div className="detailScore">Score {o.score} · {o.intent} intenção</div><h3>Evidência</h3><p>{o.evidence||o.problem||'Sem trecho adicional.'}</p>{o.source?.url&&<a className="linkBtn" href={o.source.url} target="_blank" rel="noreferrer">Abrir fonte original ↗</a>}</section><aside className="panel"><h2>Próxima ação</h2><p>Status: <strong>{o.status||'new'}</strong></p><p>Empresa: <strong>{o.business?.name||'A identificar'}</strong></p><p>Contatos públicos: <strong>{o.contacts?.length||0}</strong></p><button onClick={prepare}>Preparar abordagem</button></aside></div>{draft&&<section className="panel draft"><h2>Rascunho para revisão</h2><h3>{draft.draft.subject}</h3><p>{draft.draft.message}</p><small>Não enviado automaticamente. Revise antes de qualquer contato.</small></section>}</main>
}
