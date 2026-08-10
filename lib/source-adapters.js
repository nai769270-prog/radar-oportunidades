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
function sourceQuality(result={}){const url=String(result.url||result.sourceUrl||'');let host='';try{host=new URL(url).hostname.replace(/^www\./,'')}catch{}if(result.sourceQuality!=null)return Number(result.sourceQuality);if(/linkedin\.com|reddit\.com|facebook\.com|instagram\.com|x\.com|twitter\.com/.test(host))return .9;if(/google\.com|bing\.com/.test(host))return .45;if(host)return .7;return .5}
export function normalizeExternalResult(result={}) {
  const publishedAt=result.publishedAt||result.date||result.published_at||null;
  return {
    id: result.id || crypto.randomUUID(),
    title: String(result.title || '').trim(),
    text: String(result.snippet || result.text || '').trim(),
    source: result.source || 'public-web',
    sourceUrl: result.url || null,
    publishedAt,
    capturedAt: new Date().toISOString(),
    evidence: String(result.snippet || result.text || '').trim(),
    sourceQuality:sourceQuality(result),
    hasPublicContact: Boolean(result.hasPublicContact),
    contacts: Array.isArray(result.contacts) ? result.contacts : [],
  };
}
