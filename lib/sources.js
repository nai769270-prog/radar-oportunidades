export const sourceRegistry = [
  { id: 'web', name: 'Web pública', enabled: true, type: 'discovery' },
  { id: 'communities', name: 'Comunidades públicas', enabled: true, type: 'intent' },
  { id: 'business', name: 'Sites empresariais', enabled: true, type: 'business' },
  { id: 'apollo', name: 'Apollo', enabled: false, type: 'enrichment', requiresKey: true },
  { id: 'meta', name: 'Meta APIs', enabled: false, type: 'authorized-social', requiresKey: true },
];

export function getActiveSources(){return sourceRegistry.filter(s=>s.enabled)}
