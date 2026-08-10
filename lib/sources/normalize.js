export function normalizeSignal(input = {}) {
  const title = String(input.title || '').trim();
  const text = String(input.text || input.description || '').trim();
  const source = String(input.source || 'unknown').trim();
  const sourceUrl = input.sourceUrl || input.url || null;

  return {
    id: input.id || `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    text,
    source,
    sourceUrl,
    publishedAt: input.publishedAt || null,
    authorType: input.authorType || 'unknown',
    publicContact: input.publicContact || null,
    hasPublicContact: Boolean(input.publicContact),
    evidence: input.evidence || text.slice(0, 280),
  };
}

export function isUsableSignal(signal) {
  return Boolean(signal && signal.title && (signal.text || signal.evidence));
}
