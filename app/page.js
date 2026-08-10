'use client';

import { useMemo, useState } from 'react';

const initialOpportunities = [
  { id: 'demo-1', title: 'Preciso automatizar atendimento no WhatsApp', source: 'Sinal público', intent: 'Alta', score: 92, channel: 'WhatsApp / Instagram' },
  { id: 'demo-2', title: 'Procuro sistema para organizar leads', source: 'Comunidade pública', intent: 'Alta', score: 87, channel: 'E-mail / LinkedIn' },
  { id: 'demo-3', title: 'Alguém indica automação para pequena empresa?', source: 'Fórum público', intent: 'Média', score: 78, channel: 'Contato público' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initialOpportunities);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('demo');

  const metrics = useMemo(() => ({
    signals: items.length,
    opportunities: items.filter(item => item.score >= 70).length,
    highIntent: items.filter(item => item.intent === 'Alta').length,
    sources: new Set(items.map(item => item.source)).size,
  }), [items]);

  async function searchSignals(event) {
    event?.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/opportunities?q=${encodeURIComponent(query)}`);
      const payload = await response.json();
      const normalized = (payload.data || []).map(item => ({
        id: item.id,
        title: item.title,
        source: item.source || 'Fonte pública',
        intent: item.intent,
        score: item.score,
        channel: item.hasPublicContact ? 'Contato público disponível' : 'Contato a enriquecer',
      }));
      setItems(normalized);
      setMode(payload.meta?.mode || 'api');
    } finally {
      setLoading(false);
    }
  }

  return <main className="shell">
    <aside className="sidebar"><div className="brand">RADAR<span>AI</span></div><p>Inteligência de oportunidades</p><nav><b>◉ Visão geral</b><span>⌕ Descobrir demandas</span><span>⚡ Oportunidades</span><span>◎ Contatos</span><span>↗ Campanhas</span><span>⚙ Integrações</span></nav></aside>
    <section className="content"><header><div><small>RADAR DE OPORTUNIDADES</small><h1>Encontre quem precisa <em>antes da concorrência.</em></h1><p>Detecte sinais públicos de intenção, classifique com IA e transforme problemas reais em oportunidades comerciais.</p></div><button onClick={() => { setQuery(''); setItems(initialOpportunities); }}>+ Nova busca</button></header>
    <form className="search" onSubmit={searchSignals}><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: empresas procurando automação de WhatsApp"/><button disabled={loading}>{loading ? 'Analisando...' : 'Pesquisar sinais'}</button></form>
    <div className="mode">Modo atual: <strong>{mode}</strong> · o MVP usa dados de demonstração até conectarmos as fontes reais autorizadas.</div>
    <div className="metrics"><article><span>Sinais retornados</span><strong>{metrics.signals}</strong><small>na busca atual</small></article><article><span>Oportunidades</span><strong>{metrics.opportunities}</strong><small>score acima de 70</small></article><article><span>Alta intenção</span><strong>{metrics.highIntent}</strong><small>prioridade comercial</small></article><article><span>Fontes</span><strong>{metrics.sources}</strong><small>na busca atual</small></article></div>
    <div className="panel"><div className="panelTitle"><div><h2>Oportunidades encontradas</h2><p>Sinais classificados por intenção e potencial comercial.</p></div></div>{items.length === 0 ? <div className="empty">Nenhum sinal encontrado para esta busca.</div> : items.map(o => <div className="row" key={o.id}><div className="score">{o.score}</div><div className="problem"><strong>{o.title}</strong><span>{o.source} · {o.channel}</span></div><span className={'tag '+(o.intent==='Alta'?'hot':'')}>{o.intent} intenção</span><button className="open">Analisar</button></div>)}</div>
    </section></main>;
}
