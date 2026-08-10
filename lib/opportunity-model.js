export function buildOpportunity(signal, score, intent) {
  return {
    id: signal.id,
    title: signal.title,
    problem: signal.text || '',
    score,
    intent,
    source: {
      name: signal.source || 'public-web',
      url: signal.sourceUrl || null,
      capturedAt: signal.capturedAt || new Date().toISOString(),
    },
    business: signal.business || null,
    contacts: signal.contacts || [],
    status: 'new',
    evidence: signal.evidence || signal.text || signal.title,
  };
}
