export function connectorStatus() {
  return [
    { id: 'web', name: 'Fontes web públicas', status: 'ready', purpose: 'Descoberta de sinais' },
    { id: 'apollo', name: 'Apollo.io', status: process.env.APOLLO_API_KEY ? 'configured' : 'workspace-connected', purpose: 'Enriquecimento B2B e organização' },
    { id: 'meta', name: 'Meta', status: process.env.META_APP_ID ? 'configured' : 'pending', purpose: 'APIs sociais autorizadas' },
    { id: 'database', name: 'Banco de dados', status: process.env.DATABASE_URL ? 'configured' : 'pending', purpose: 'Persistência de sinais e oportunidades' },
    { id: 'ai', name: 'IA', status: process.env.OPENAI_API_KEY ? 'configured' : 'pending', purpose: 'Classificação e análise semântica' },
  ];
}
