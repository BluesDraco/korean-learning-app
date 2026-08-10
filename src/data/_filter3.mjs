import fs from 'fs';
const dictArr = JSON.parse(fs.readFileSync('_dictset.json','utf8'));
const dictSet = new Set(dictArr.words);
const validStems = new Set(dictArr.stems);
for (const w of dictSet){
  if (!w.endsWith('다') || w.length < 3) continue;
  const stem = w.slice(0,-1);
  if (stem.length < 2) continue;
  const last = stem[stem.length-1];
  if ('ㅏㅗ'.includes(last.slice(-1))) validStems.add(stem+'아'); else validStems.add(stem+'어');
  if (last.endsWith('ㅂ')) { validStems.add(stem.slice(0,-1)+'우'); validStems.add(stem.slice(0,-1)+'워'); }
  if (last.endsWith('ㄷ')) { validStems.add(stem.slice(0,-1)+'ㄹ'); validStems.add(stem.slice(0,-1)+'ㄹ어'); }
  if (last.endsWith('르')) { validStems.add(stem.slice(0,-1)+'ㄹ라'); validStems.add(stem.slice(0,-1)+'ㄹ러'); validStems.add(stem.slice(0,-1)+'ㄹ레'); }
  if (last.endsWith('ㅅ')) { validStems.add(stem.slice(0,-1)+'어'); validStems.add(stem.slice(0,-1)+'아'); }
  if (last.endsWith('ㅎ')) { validStems.add(stem.slice(0,-1)+'애'); validStems.add(stem.slice(0,-1)+'얘'); }
  if (last.endsWith('우')) validStems.add(stem.slice(0,-1)+'워');
  if (last.endsWith('쁘')) { validStems.add(stem.slice(0,-1)+'빠'); validStems.add(stem.slice(0,-1)+'뻐'); }
  if (last.endsWith('스')) validStems.add(stem.slice(0,-1)+'써');
  if (last.endsWith('크')) validStems.add(stem.slice(0,-1)+'커');
  if (last.endsWith('뜨')) validStems.add(stem.slice(0,-1)+'떠');
  if (last.endsWith('끄')) validStems.add(stem.slice(0,-1)+'꺼');
}

const PARTICLES = ['이라고','이라는','이라도','이든지','이랑','으로부터','에게서','에서부터','에서만','에서는','에서도','에다가','에게는','에게도','한테서','부터','까지','처럼','한테','에게','에다','보다','마다','밖에','조차','마저','커녕','이나','든가','든지','만큼','치고','대로','쯤','끼리','뿐만','은커녕','이야말로','야말로','이라','으로','에서','라고','이야','이여','뿐','들은','로서','로써','라고는','은','는','이','가','을','를','에','의','와','과','도','만','나','들','요','서','라','여','로','고','며','랑','야','아','이든','이라니','인들'];
const VEND = ['습니다','습니까','ㅂ니다','ㅂ니까','십시오','시죠','읍시다','ㅂ시다','시오','세요','셔요','시네요','시더군요','시지요','시군요','시니','시면','시고','시고요','시는데','시는','실','시겠','시게','시도록','시려고','시러','았었어요','었었어요','였었어요','았었습니다','었었습니다','였었습니다','았었고','었었고','였었고','았었지만','었었지만','였었지만','았었는데','었었는데','였었는데','았어요','었어요','였어요','았어','었어','였어','았습니다','었습니다','였습니다','았고','었고','였고','았지만','었지만','였지만','았는데','었는데','였는데','았으면','었으면','였으면','았나','었나','였나','았니','었니','였니','았다','었다','였다','았구나','었구나','였구나','았네','었네','였네','았대','었대','였대','았던','었던','였던','았더니','었더니','였더니','았는데요','었는데요','였는데요','았다가','었다가','였다가','았는지','었는지','였는지','았으니','었으니','였으니','았나요','었나요','였나요','아요','어요','여요','네요','군요','죠','지요','거든요','잖아요','나요','는데요','고요','도요','ㄹ게요','ㄹ까요','ㄹ래요','ㄹ걸요','ㄹ거예요','ㄹ거야','ㄹ지요','ㄹ게','예요','이에요','이어요','이야','이지','이죠','이네요','이군요','이잖아요','이라서','이라면','이니까','이라','이라는','인데','인','이었','였','이었다','였어요','였습니다','입니다','일까','일게','일걸','일지','이고','이며','이지만','이라도','일수록','일는지','이니까요','인데요','이라니','이거든','이구나','이네','겠다','겠어요','겠어','겠','겠네','겠지','겠지만','겠는데','겠다고','겠냐','겠는지','겠다면','겠으니','겠습니까','겠네요','겠군요','겠죠','겠나','겠더라','ㄹ게','ㄹ게요','ㄹ까','ㄹ까요','ㄹ래','ㄹ래요','ㄹ걸','ㄹ걸요','ㄹ거예요','ㄹ거야','ㄹ수록','ㄹ지','ㄹ지도','ㄹ지라도','ㄹ지라','ㄹ는지','ㄹ테니까','ㄹ테지','ㄹ망정','니까','면서','지만','는데','ㄴ데','은데','도록','거나','자','려고','러','려면','려나','더니','느라고','다면','고','면','서','게','니','곤','다가','아서','어서','여서','다니','냐고','다고','자고','라고','려무나','다가는','다가도','다시피','다오','더라도','거든','거늘','거니','거니와','거들랑','거라','건마는','건만','고는','고도','고는요','고자','길래','나니','노라','니만큼','느냐','다손','더라','련','련마는','려거든','려던','려는','려니','려니와','려무나','므로','세','세나','아도','어도','여도','아야','어야','여야','자니','자마자','지만요','ㄴ','은','는','ㄹ','을','던','ㄴ다','는다','다','ㄴ다고','ㄴ다면','ㄴ데','는지','ㄴ지','을지','을까','ㄹ까','ㄹ래야','ㄹ는','ㄴ가','은가','는가','ㄴ가요','은가요','기','음','ㅁ','기에','기는','기도','기만','기를','기가','기로','기는요','기나','기니','기라','기로서니','기야','아라','어라','여라','자','십시오','라','거라','너라','시오','게나','세요','냐','냐고','는냐','더냐','니','나','나요','오','소','으냐','느냐','으냐고','듯','듯이','대로','만큼','치고','뻔','나름','양','체','척','테','터','뿐','지경','리는','리','리라','련만','마는','마저','이고','이라면','이라도','인들','해','한','할','하는','했','해서','하지','하면','하고','하니','하며','하네','하니까','하지만','하곤','하도록','하려고','하기','하게','하다가','하더라','하자','하려는','하려면','하면서','하다니','하건','하건만','해야','해도','하든','하되','하건대','하자니','하자마자','하기는','하다못해','하느니','하니만큼','하니와','하라','하렴','하리라','하오','하옵니다','합니다','하십니다','하지요','하거든','하길','하니깐','하면은','해다가','했다','했다가','했고','했지만','했는데','했었','했어','했어요','했습니다','했으니','했더니','했던','했나','했네','했대','했나요','했구나','스럽다','스러워','스러운','스러워서','답다','다워','다운','다워서','롭다','로워','로운','로워서','져','져요','져서','졌','졌다','졌어요','졌고','졌지만','졌는데','졌습니다','지','씩','당','지고','지며','지면','지니','지려고','지게','지도록','지다','지기','지음','지지'];
const ALL = [...new Set([...PARTICLES, ...VEND])].sort((a,b)=>b.length-a.length);

function irregularBase(p){
  const c = [];
  if (p.endsWith('워')) { c.push(p.slice(0,-2)+'ㅂ다'); c.push(p.slice(0,-1)+'우다'); }
  if (p.endsWith('와')) c.push(p.slice(0,-2)+'ㅂ다');
  if (p.endsWith('우')) c.push(p.slice(0,-1)+'ㅂ다');
  if (p.endsWith('라')) { c.push(p.slice(0,-1)+'르다'); c.push(p.slice(0,-1)+'다'); }
  if (p.endsWith('러')) c.push(p.slice(0,-1)+'르다');
  if (p.endsWith('써')) c.push('쓰다');
  if (p.endsWith('커')) c.push('크다');
  if (p.endsWith('뻐')) c.push(p.slice(0,-1)+'쁘다');
  if (p.endsWith('떠')) c.push(p.slice(0,-1)+'뜨다');
  if (p.endsWith('께')) c.push(p.slice(0,-1)+'끄다');
  if (p.endsWith('꿔')) c.push(p.slice(0,-1)+'꾸다');
  if (p.endsWith('빠')) c.push(p.slice(0,-1)+'쁘다');
  if (p.endsWith('지어')) c.push('짓다');
  if (p.endsWith('부어')) c.push('붓다');
  if (p.endsWith('나아')) c.push('낫다');
  if (p.endsWith('개')) c.push(p.slice(0,-1)+'ㅎ다');
  if (p.endsWith('래')) c.push(p.slice(0,-1)+'ㅎ다');
  if (p.endsWith('얘')) c.push(p.slice(0,-1)+'ㅎ다');
  if (p.endsWith('들')) c.push('듣다');
  if (p.endsWith('걸')) c.push('걷다');
  if (p.endsWith('물')) c.push('묻다');
  return c.filter(x => dictSet.has(x));
}
function baseOk(p){
  if (!p || p.length < 1) return false;
  if (dictSet.has(p) || dictSet.has(p+'다') || dictSet.has(p+'하다') || dictSet.has(p+'이다') || dictSet.has(p+'되다')) return true;
  if (validStems.has(p)) return true;
  return irregularBase(p).length > 0;
}
function decomposes(word){
  if (dictSet.has(word) || validStems.has(word)) return true;
  for (const e of ALL){
    if (word.length > e.length && word.endsWith(e)){
      const p = word.slice(0, -e.length);
      if (baseOk(p)) return true;
      if (p.length >= 2 && decomposes(p)) return true;
    }
  }
  return false;
}

const tokFiles = JSON.parse(fs.readFileSync('_tokfiles.json','utf8'));
const susp = [];
for (const w of Object.keys(tokFiles)){ if (!decomposes(w)) susp.push(w); }
susp.sort();
console.log('Suspicious:', susp.length);
fs.writeFileSync('_suspicious5.txt', susp.join('\n'), 'utf8');

// Jamo decomposition for confusability
const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function decomposeSyllable(ch){
  const code = ch.charCodeAt(0) - 0xAC00;
  if (code < 0 || code >= 11172) return null;
  return { cho: CHO[Math.floor(code/588)], jung: JUNG[Math.floor((code%588)/28)], jong: JONG[code%28] };
}
const TENSED = [['ㄱ','ㅋ','ㄲ'],['ㄷ','ㅌ','ㄸ'],['ㅂ','ㅍ','ㅃ'],['ㅅ','ㅆ'],['ㅈ','ㅊ','ㅉ']];
function confusable(a, b){
  if (a === b) return 4;
  const da = decomposeSyllable(a), db = decomposeSyllable(b);
  if (!da || !db) return 0;
  if (da.jung === db.jung && da.jong === db.jong){
    for (const grp of TENSED) if (grp.includes(da.cho) && grp.includes(db.cho)) return 3;
    return 1; // same vowel+fianl, diff cho not tensed
  }
  if (da.jung === db.jung) return 2;
  if (da.jong === db.jong) return 1;
  return 0;
}

const delMap = new Map();
for (const w of [...dictSet].filter(w=>w.length>=2&&w.length<=5)){
  for (let j=0;j<w.length;j++){
    const k = w.slice(0,j)+w.slice(j+1);
    let a = delMap.get(k); if (!a){a=[]; delMap.set(k,a);} a.push({w,j});
  }
}
const high = [], med = [], low = [];
for (const t of susp){
  if (t.length<3||t.length>5) continue;
  let best = 0, bestWord = null;
  for (let i=0;i<t.length;i++){
    const a = delMap.get(t.slice(0,i)+t.slice(i+1));
    if (!a) continue;
    for (const {w,j} of a){
      if (w.length===t.length && j===i){
        const score = confusable(t[i], w[i]);
        if (score > best){ best = score; bestWord = w; }
      }
    }
  }
  if (best >= 3) high.push({t, w:bestWord, score:best});
  else if (best === 2) med.push({t, w:bestWord, score:best});
  else if (best === 1) low.push({t, w:bestWord, score:best});
}
console.log('HIGH (tensed/aspirated confusion):', high.length);
console.log('MED (same vowel):', med.length);
console.log('LOW (other 1-char diff):', low.length);
fs.writeFileSync('_ranked_high.json', JSON.stringify(high));
fs.writeFileSync('_ranked_med.json', JSON.stringify(med));
fs.writeFileSync('_ranked_low.json', JSON.stringify(low));
console.log('--- HIGH sample ---');
for (const c of high.slice(0,60)) console.log(c.t, '=>', c.w);


