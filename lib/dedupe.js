function canonical(text=''){return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
export function fingerprint(signal={}){return canonical(`${signal.title||''} ${signal.text||''}`).slice(0,220)}
export function dedupeSignals(signals=[]){const seen=new Set();return signals.filter(s=>{const key=s.sourceUrl||fingerprint(s);if(!key||seen.has(key))return false;seen.add(key);return true})}
