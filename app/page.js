'use client';

import { useEffect, useMemo, useState } from 'react';

const initialOpportunities = [
  { id: 'demo-1', title: 'Preciso automatizar atendimento no WhatsApp', source: { name: 'Sinal público' }, intent: 'Alta', score: 92, hasPublicContact: true },
  { id: 'demo-2', title: 'Procuro sistema para organizar leads', source: { name: 'Comunidade pública' }, intent: 'Alta', score: 87, hasPublicContact: true },
  { id: 'demo-3', title: 'Alguém indica automação para pequena empresa?', source: { name: 'Fórum público' }, intent: 'Média', score: 78, hasPublicContact: false },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initialOpportunities);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('demo');
  const [connectors, setConnectors] = useState([]);
  const [saved, setSaved] = useState(new Set());

  useEffect(() => { fetch('/api/connectors').then(r=>r.json()).then(p=>setConnectors(p.data||[])).catch(()=>{}); }, []);

  const metrics = useMemo(() => ({
    signals: items.length,
    opportunities: items.filter(i=>i.score>=70).length,
    highIntent: items.filter(i=>i.intent==='Alta').length,
    sources: new Set(items.map(i=>i.source?.name||i.source)).size,
  }), [items]);

  async function searchSignals(event) {
    event?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/searches',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query})});
      let response = await fetch('/api/live-discovery',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({topic:query})});
      let payload = await response.json();
      if (!payload.meta?.live) {
        response = await fetch(`/api/opportunities?q=${encodeURIComponent(query)}`);
        payload = await response.json();
      }
      setItems(payload.data || []);
      setMode(payload.meta?.live ? 'live' : (payload.meta?.mode || 'demo'));
    } finally { setLoading(false); }
  }

  async function saveItem(item) {
    const response = await fetch('/api/saved',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item)});
    if (response.ok) setSaved(prev=>new Set([...prev,item.id]));
  }

  return <main className="shell">
    <aside className="sidebar"><div className="brand">RADAR<span>AI</span></div><p>Inteligência de oportunidades</p><nav><b>◉ Visão geral</b><span>⌕ Descobrir demandas</span><span>⚡ Oportunidades</span><span>◎ Contatos</span><span>↗ Campanhas</span><span>⚙ Integrações</span></nav></aside>
    <section className="content">
      <header><div><small>RADAR DE OPORTUNIDADES</small><h1>Encontre quem precisa <em>antes da concorrência.</em></h1><p>Detecte sinais públicos de intenção, classifique com IA e transforme problemas reais em oportunidades comerciais.</p></div><button onClick={()=>{setQuery('');setItems(initialOpportunities);setMode('demo')}}>+ Nova busca</button></header>
      <form className="search" onSubmit={searchSignals}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ex.: empresas procurando automação de WhatsApp"/><button disabled={loading}>{loading?'Analisando...':'Pesquisar sinais'}</button></form>
      <div className="mode">Modo atual: <strong>{mode}</strong> · {mode==='live'?'resultados vindos do provedor público configurado.':'fallback de demonstração até configurar busca pública.'}</div>
      <div className="metrics"><article><span>Sinais retornados</span><strong>{metrics.signals}</strong><small>na busca atual</small></article><article><span>Oportunidades</span><strong>{metrics.opportunities}</strong><small>score acima de 70</small></article><article><span>Alta intenção</span><strong>{metrics.highIntent}</strong><small>prioridade comercial</small></article><article><span>Fontes</span><strong>{metrics.sources}</strong><small>na busca atual</small></article></div>
      <div className="panel"><div className="panelTitle"><div><h2>Integrações</h2><p>Status técnico do ecossistema do Radar.</p></div></div><div className="connectorGrid">{connectors.map(c=><div className="connector" key={c.id}><strong>{c.name}</strong><span className={'status '+c.status}>{c.status}</span><small>{c.purpose}</small></div>)}</div></div>
      <div className="panel"><div className="panelTitle"><div><h2>Oportunidades encontradas</h2><p>Sinais classificados por intenção e potencial comercial.</p></div></div>{items.length===0?<div className="empty">Nenhum sinal encontrado para esta busca.</div>:items.map(o=><div className="row" key={o.id}><div className="score">{o.score}</div><div className="problem"><strong>{o.title}</strong><span>{o.source?.name||o.source||'Fonte pública'} · {o.hasPublicContact?'Contato público disponível':'Contato a enriquecer'}</span>{o.source?.url&&<a href={o.source.url} target="_blank" rel="noreferrer">Ver evidência ↗</a>}</div><span className={'tag '+(o.intent==='Alta'?'hot':'')}>{o.intent} intenção</span><button className="open" onClick={()=>saveItem(o)} disabled={saved.has(o.id)}>{saved.has(o.id)?'Salvo':'Salvar'}</button></div>)}</div>
    </section>
  </main>;
}
