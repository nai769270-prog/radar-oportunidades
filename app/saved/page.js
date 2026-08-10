'use client';
import {useEffect,useState} from 'react';
const stages=['new','qualified','enrichment_ready','contact_ready','contacted','replied','won'];
const labels={new:'Nova',qualified:'Qualificada',enrichment_ready:'Enriquecer',contact_ready:'Contato pronto',contacted:'Contatada',replied:'Respondeu',won:'Ganha',lost:'Perdida'};
export default function Saved(){
 const[items,setItems]=useState([]);const[loading,setLoading]=useState(true);
 useEffect(()=>{load()},[]);function load(){return fetch('/api/saved').then(r=>r.json()).then(p=>setItems(p.data||[])).finally(()=>setLoading(false))}
 function analyze(o){sessionStorage.setItem('radar:selected',JSON.stringify(o));location.href='/opportunity'}
 async function move(o,to){const r=await fetch('/api/pipeline',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:o.id,to})});if(r.ok){const p=await r.json();setItems(list=>list.map(x=>x.id===o.id?p.data:x))}}
 function next(o){const i=stages.indexOf(o.status||'new');return i>=0&&i<stages.length-1?stages[i+1]:null}
 return <main className="detail"><a href="/">← Voltar ao Radar</a><div className="panel"><small>PIPELINE COMERCIAL</small><h1>Oportunidades salvas</h1><p>Avance cada oportunidade conforme houver evidência real de progresso.</p></div><div className="kanban">{Object.entries(labels).map(([key,label])=><section className="kanbanCol" key={key}><h3>{label}</h3><span>{items.filter(i=>(i.status||'new')===key).length}</span>{items.filter(i=>(i.status||'new')===key).map(o=><article className="leadCard" key={o.id}><b>{o.title}</b><small>Score {o.score} · {o.intent}</small><button className="open" onClick={()=>analyze(o)}>Abrir</button>{next(o)&&<button className="open" onClick={()=>move(o,next(o))}>Avançar →</button>}{!['won','lost'].includes(o.status||'new')&&<button className="lostBtn" onClick={()=>move(o,'lost')}>Perdida</button>}</article>)}</section>)}</div>{!loading&&!items.length&&<div className="panel empty">Nenhuma oportunidade salva ainda.</div>}</main>
}
