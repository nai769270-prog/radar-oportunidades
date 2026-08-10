export function extractDomain(sourceUrl='') {
  try { return new URL(sourceUrl).hostname.replace(/^www\./,''); } catch { return null; }
}

export function enrichmentCandidate(opportunity={}) {
  const domain = opportunity.business?.domain || extractDomain(opportunity.source?.url);
  return {
    opportunityId: opportunity.id,
    domain,
    companyName: opportunity.business?.name || null,
    eligible: Boolean(domain),
    provider: 'apollo',
    status: domain ? 'ready-for-user-approved-enrichment' : 'needs-business-identification',
  };
}
