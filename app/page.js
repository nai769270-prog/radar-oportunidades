const opportunities = [
  { problem: 'Preciso automatizar atendimento no WhatsApp', source: 'Sinal público', intent: 'Alta', score: 92, channel: 'WhatsApp / Instagram' },
  { problem: 'Procuro sistema para organizar leads', source: 'Comunidade pública', intent: 'Alta', score: 87, channel: 'E-mail / LinkedIn' },
  { problem: 'Alguém indica automação para pequena empresa?', source: 'Fórum público', intent: 'Média', score: 78, channel: 'Contato público' },
];

export default function Home() {
  return <main className="shell">
    <aside className="sidebar"><div className="brand">RADAR<span>AI</span></div><p>Inteligência de oportunidades</p><nav><b>◉ Visão geral</b><span>⌕ Descobrir demandas</span><span>⚡ Oportunidades</span><span>◎ Contatos</span><span>↗ Campanhas</span><span>⚙ Integrações</span></nav></aside>
    <section className="content"><header><div><small>RADAR DE OPORTUNIDADES</small><h1>Encontre quem precisa <em>antes da concorrência.</em></h1><p>Detecte sinais públicos de intenção, classifique com IA e transforme problemas reais em oportunidades comerciais.</p></div><button>+ Nova busca</button></header>
    <div className="search"><input placeholder="Ex.: empresas procurando automação de WhatsApp"/><button>Pesquisar sinais</button></div>
    <div className="metrics"><article><span>Sinais analisados</span><strong>1.284</strong><small>últimos 7 dias</small></article><article><span>Oportunidades</span><strong>146</strong><small>score acima de 70</small></article><article><span>Alta intenção</span><strong>38</strong><small>prioridade comercial</small></article><article><span>Fontes ativas</span><strong>12</strong><small>monitoramento público</small></article></div>
    <div className="panel"><div className="panelTitle"><div><h2>Oportunidades recentes</h2><p>Sinais públicos classificados por intenção e potencial.</p></div><button className="ghost">Ver todas →</button></div>{opportunities.map((o,i)=><div className="row" key={i}><div className="score">{o.score}</div><div className="problem"><strong>{o.problem}</strong><span>{o.source} · canal: {o.channel}</span></div><span className={'tag '+(o.intent==='Alta'?'hot':'')}>{o.intent} intenção</span><button className="open">Analisar</button></div>)}</div>
    </section></main>
}
