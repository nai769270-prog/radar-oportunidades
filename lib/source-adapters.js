import { buildDiscoveryQueries } from './query-builder';

export function createDiscoveryJob(topic='') {
  return {
    id: crypto.randomUUID(),
    topic: String(topic).trim(),
    queries: buildDiscoveryQueries(topic),
    adapters: [
      { id: 'public-web', enabled: true, execution: 'external-search-provider' },
      { id: 'business-web', enabled: true, execution: 'public-business-pages' },
      { id: 'authorized-social', enabled: false, execution: 'official-api-required' },
    ],
    createdAt: new Date().toISOString(),
  };
}

export function normalizeExternalResult(result={}) {
  return {
    id: result.id || crypto.randomUUID(),
    title: String(result.title || '').trim(),
    text: String(result.snippet || result.text || '').trim(),
    source: result.source || 'public-web',
    sourceUrl: result.url || null,
    capturedAt: new Date().toISOString(),
    evidence: String(result.snippet || result.text || '').trim(),
    hasPublicContact: Boolean(result.hasPublicContact),
    contacts: Array.isArray(result.contacts) ? result.contacts : [],
  };
}
