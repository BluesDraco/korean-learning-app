import fs from 'fs';
import path from 'path';

const ROOT = 'C:/Users/Administrator/Desktop/korean-learning-app';
const SCOPES = ['src', 'public'];
const EXCLUDE_DIRS = new Set(['node_modules','.next','.git','dict']);
const dictArr = JSON.parse(fs.readFileSync('C:/Users/Administrator/Desktop/korean-learning-app/_dictset.json','utf8'));
const dictSet = new Set(dictArr.words);

const PARTICLES = ['이라고','이라는','이라도','이든지','이랑','으로부터','에게서','에서부터','에서만','에서는','에서도','에다가','에게는','에게도','한테서','부터','까지','처럼','한테','에게','에다','보다','마다','밖에','조차','마저','커녕','이나','든가','든지','만큼','치고','대로','쯤','끼리','뿐만','은커녕','이야말로','야말로','이라','으로','에서','라고','이야','이여','뿐','들은','로서','로써','라고는','은','는','이','가','을','를','에','의','와','과','도','만','나','들','요','서','라','여','로','고','며','랑','야','아','이든','이라니','인들'];
const VEND2 = ['습니다','ㅂ니다','습니까','세요','셔요','시네요','시지요','시군요','시니','시면','시고','시는데','시는','았었어요','었었어요','였었어요','았었습니다','었었습니다','였었습니다','았어요','었어요','였어요','았어','었어','였어','았습니다','었습니다','였습니다','았고','었고','였고','았지만','었지만','였지만','았는데','었는데','였는데','았으면','었으면','였으면','았나','었나','였나','았니','었니','였니','았다','었다','였다','았구나','었구나','였구나','았네','었네','였네','았대','었대','였대','았던','었던','였던','았더니','었더니','였더니','았는데요','었는데요','였는데요','았다가','었다가','였다가','았는지','었는지','였는지','았으니','었으니','였으니','았나요','었나요','였나요','아요','어요','여요','네요','군요','죠','지요','거든요','잖아요','나요','는데요','고요','도요','ㄹ게요','ㄹ까요','ㄹ래요','ㄹ걸요','ㄹ거예요','ㄹ거야','ㄹ지요','예요','이에요','이어요','이야','이지','이죠','이네요','이군요','이잖아요','이라서','이라면','이니까','이라는','인데','이었','였','이었다','였어요','였습니다','입니다','일까','일게','일걸','일지','이고','이며','이지만','이라도','일수록','일는지','이니까요','인데요','이라니','이거든','이구나','이네','겠다','겠어요','겠어','겠','겠네','겠지','겠지만','겠는데','겠다고','겠냐','겠는지','겠다면','겠으니','겠습니까','겠네요','겠군요','겠죠','겠나','겠더라','ㄹ게','ㄹ까','ㄹ래','ㄹ걸','ㄹ거예요','ㄹ거야','ㄹ수록','ㄹ지','ㄹ지도','ㄹ지라도','ㄹ지라','ㄹ는지','ㄹ테니까','ㄹ테지','ㄹ망정','니까','면서','지만','는데','ㄴ데','은데','도록','거나','자','려고','러','려면','려나','더니','느라고','다면','고','면','서','게','니','곤','다가','아서','어서','여서','다니','냐고','다고','자고','라고','려무나','다가는','다가도','다시피','다오','더라도','거든','거늘','거니','거니와','거들랑','거라','건마는','건만','고는','고도','고는요','고자','길래','나니','노라','니만큼','느냐','다손','더라','련','련마는','려거든','려던','려는','려니','려니와','려무나','므로','세','세나','아도','어도','여도','아야','어야','여야','자니','자마자','지만요','ㄴ','은','는','ㄹ','을','던','ㄴ다','는다','다','ㄴ다고','ㄴ다면','ㄴ데','는지','ㄴ지','을지','을까','ㄹ까','ㄹ래야','ㄹ는','ㄴ가','은가','는가','ㄴ가요','은가요','기','음','ㅁ','기에','기는','기도','기만','기를','기가','기로','기는요','기나','기니','기라','기로서니','기야','아라','어라','여라','자','십시오','라','거라','너라','시오','게나','냐','냐고','는냐','더냐','나요','오','소','으냐','느냐','으냐고','듯','듯이','뻔','나름','양','체','척','테','터','뿐','지경','리는','리','리라','련만','마는','마저','해','한','할','하는','했','해서','하지','하면','하고','하니','하며','하네','하니까','하지만','하곤','하도록','하려고','하기','하게','하다가','하더라','하자','하려는','하려면','하면서','하다니','하건','하건만','해야','해도','하든','하되','하건대','하자니','하자마자','하기는','하다못해','하느니','하니만큼','하니와','하라','하렴','하리라','하오','하옵니다','합니다','하십니다','하지요','하거든','하길','하니깐','하면은','해다가','했다','했다가','했고','했지만','했는데','했었','했어','했어요','했습니다','했으니','했더니','했던','했나','했네','했대','했나요','했구나','스럽다','스러워','스러운','스러워서','답다','다워','다운','다워서','롭다','로워','로운','로워서','져','져요','져서','졌','졌다','졌어요','졌고','졌지만','졌는데','졌습니다','지고','지며','지면','지니','지려고','지게','지도록','지다','지기','지음','지지','지','씩','당'];

function stripParticle(w){
  for (const p of PARTICLES){
    if (w.length>p.length && w.endsWith(p)) return { base: w.slice(0,-p.length), part: p };
  }
  return null;
}

function stripEnding(w){
  // returns array of candidate stems
  const out=[];
  for (const e of VEND2){
    if (w.length>e.length && w.endsWith(e)){
      const base = w.slice(0,-e.length);
      out.push({ base, end: e });
    }
  }
  return out;
}

// Check if A+B (or A+B' where B' strips particle/ending) forms a dict compound
function checkPair(A, B){
  const results=[];
  if (dictSet.has(A+B)) results.push(A+B);
  // strip particle from B
  const sp = stripParticle(B);
  if (sp && dictSet.has(A+sp.base)) results.push(A+sp.base);
  // strip verb ending from B, then try adding 다
  for (const {base} of stripEnding(B)){
    if (dictSet.has(A+base)) results.push(A+base);
    if (dictSet.has(A+base+'다')) results.push(A+base+'다');
  }
  return [...new Set(results)];
}

// collect all tokens with file + line context
const hits=[];
function processLine(line, file){
  const runs = [];
  const re = /[가-힣]{1,}/g;
  let m;
  while ((m = re.exec(line))){
    runs.push({ word: m[0], start: m.index, end: m.index+m[0].length });
  }
  for (let i=0;i<runs.length-1;i++){
    const A = runs[i], B = runs[i+1];
    // only pair runs separated by pure whitespace (no punctuation/other chars)
    const gap = line.slice(A.end, B.start);
    if (!/^\s*$/.test(gap)) continue;
    const comps = checkPair(A.word, B.word);
    for (const c of comps){
      const ctx = line.replace(/\s+/g,' ').trim();
      hits.push({ file, A: A.word, B: B.word, compound: c, ctx: ctx.slice(0,120) });
    }
  }
}

const files=[];
function walk(dir){
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const ent of ents){
    if (ent.isDirectory()){
      if (EXCLUDE_DIRS.has(ent.name)) continue;
      walk(path.join(dir, ent.name));
    } else if (ent.isFile()){
      const rel = path.relative(ROOT, path.join(dir, ent.name)).split(path.sep).join('/');
      const ext = path.extname(ent.name).toLowerCase();
      if (['.ts','.tsx','.js','.jsx','.mjs','.cjs','.html','.md','.txt','.json'].includes(ext)){
        files.push({ rel, abs: path.join(dir, ent.name) });
      }
    }
  }
}
for (const s of SCOPES) walk(path.join(ROOT, s));

for (const f of files){
  let content;
  try { content = fs.readFileSync(f.abs, 'utf8'); } catch { continue; }
  const lines = content.split('\n');
  for (const line of lines) processLine(line, f.rel);
}

// dedupe by file+A+B+compound
const seen = new Set();
const uniq = hits.filter(h => { const k = h.file+'|'+h.A+'|'+h.B+'|'+h.compound; if (seen.has(k)) return false; seen.add(k); return true; });
uniq.sort((a,b)=>a.compound.localeCompare(b.compound));
console.log('Spacing hits:', uniq.length);
fs.writeFileSync('C:/Users/Administrator/Desktop/korean-learning-app/_spacing_hits.json', JSON.stringify(uniq, null, 1));

// group by compound
const byComp = {};
for (const h of uniq){ if(!byComp[h.compound]) byComp[h.compound]=[]; byComp[h.compound].push(h); }
console.log('Distinct compounds:', Object.keys(byComp).length);
for (const c of Object.keys(byComp).sort()){
  const fs_ = new Set(byComp[c].map(h=>h.file));
  console.log(c.padEnd(14), byComp[c].length+' hits', [...fs_].slice(0,3).join(', '));
}


