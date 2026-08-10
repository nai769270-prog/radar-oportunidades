import { normalizeExternalResult } from './source-adapters';

export async function searchPublicWeb(query) {
  const endpoint = process.env.SEARCH_API_URL;
  const key = process.env.SEARCH_API_KEY;
  if (!endpoint || !key) return { configured: false, results: [] };
  const url = new URL(endpoint);
  url.searchParams.set('q', query);
  const response = await fetch(url, { headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' }, cache: 'no-store' });
  if (!response.ok) throw new Error(`search_provider_${response.status}`);
  const payload = await response.json();
  const raw = payload.results || payload.items || payload.organic || [];
  return { configured: true, results: raw.slice(0, 20).map(item => normalizeExternalResult({ title: item.title, snippet: item.snippet || item.description, url: item.url || item.link, source: item.source||'public-web', publishedAt:item.publishedAt||item.published_at||item.date||item.datetime||null, sourceQuality:item.sourceQuality })) };
}
