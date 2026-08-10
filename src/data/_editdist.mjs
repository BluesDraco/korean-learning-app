import fs from 'fs';
const dictArr = JSON.parse(fs.readFileSync('_dictset.json','utf8'));
const dictSet = new Set(dictArr.words);
const susp = fs.readFileSync('_suspicious3.txt','utf8').split('\n').filter(Boolean);

// Build deletion index with position: key -> [{w, j}]
const delMap = new Map();
const dictWords = [...dictSet].filter(w => w.length >= 2 && w.length <= 5);
for (const w of dictWords){
  for (let j=0;j<w.length;j++){
    const k = w.slice(0,j)+w.slice(j+1);
    let a = delMap.get(k);
    if (!a){a=[]; delMap.set(k,a);}
    a.push({w,j});
  }
}
console.log('delMap keys:', delMap.size, 'entries:', dictWords.length);

const candidates = [];
const allClose = new Set();
for (const t of susp){
  if (t.length<2||t.length>5) continue;
  const close = new Set();
  for (let i=0;i<t.length;i++){
    const a = delMap.get(t.slice(0,i)+t.slice(i+1));
    if (!a) continue;
    for (const {w,j} of a){
      if (w.length===t.length && j===i) close.add(w);
    }
  }
  if (close.size){
    candidates.push({t, close:[...close].sort()});
    close.forEach(x=>allClose.add(x));
  }
}
console.log('Accurate edit-distance-1 candidates:', candidates.length);
console.log('Distinct dict words referenced:', allClose.size);
fs.writeFileSync('_candidates.json', JSON.stringify(candidates));
// Print all candidates compactly
for (const c of candidates) console.log(c.t, '=>', c.close.join('/'));
