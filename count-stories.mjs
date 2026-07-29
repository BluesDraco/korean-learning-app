import fs from 'fs';
const t = fs.readFileSync('src/data/reading-new.ts', 'utf8');
const ids = ['story-a1-favorite-color','story-a1-give-me-apple','story-a1-im-hungry','story-a1-its-raining','story-a1-like-dislike','story-a1-morning-greeting','story-a1-my-day','story-a1-my-family','story-a1-one-two-three','story-a1-where-is-it'];
for (const id of ids) {
  const start = t.indexOf("id: '" + id + "'");
  if (start < 0) { console.log(id, 'NOTFOUND'); continue; }
  const others = ids.map(x => t.indexOf("id: '" + x + "'", start + 10)).filter(i => i > 0).sort((a,b)=>a-b);
  const nextIdx = others.length ? others[0] : t.length;
  const seg = t.slice(start, nextIdx);
  const sIdx = seg.indexOf('sentences:');
  const qIdx = seg.indexOf('questions:', sIdx);
  const sblock = seg.slice(sIdx, qIdx > 0 ? qIdx : seg.length);
  const cnt = (sblock.match(/\bid: 's\d+'/g) || []).length;
  // count hangul ONLY in ko: '...' lines
  const koMatches = sblock.match(/\n\s*ko: '[^\n]*'/g) || [];
  let hangul = 0;
  for (const m of koMatches) hangul += (m.match(/[가-힣]/g) || []).length;
  const hasTokki = /토끼|토리|兔/.test(seg) ? ' <<TOKKI!' : '';
  console.log(id.padEnd(30), 'sentences=' + cnt, 'ko_hangul=' + hangul, hasTokki);
}
