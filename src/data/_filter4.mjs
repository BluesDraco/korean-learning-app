import fs from 'fs';
const dictArr = JSON.parse(fs.readFileSync('_dictset.json','utf8'));
const dictSet = new Set(dictArr.words);
const susp = fs.readFileSync('_suspicious5.txt','utf8').split('\n').filter(Boolean);

// Compound filter: word = A + B where both A,B in dict (min len 2 each, A>=2, B>=2)
function asCompound(w){
  for (let i=2;i<=w.length-2;i++){
    const a=w.slice(0,i), b=w.slice(i);
    if (dictSet.has(a) && dictSet.has(b)) return [a,b];
  }
  return null;
}

// Conjugation suffix filter: strip suffix, check if base in dict (as 다/하다/이다/되다/하다-verb)
const SUFF = ['았다','었다','였다','았고','었고','였고','았지만','었지만','였지만','았는데','었는데','였는데','았으면','었으면','였으면','았나','었나','였나','았니','었니','였니','았던','었던','였던','았다가','었다가','였다가','았는지','었는지','였는지','았을','었을','였을','았으니','었으니','였으니','았나요','었나요','였나요','았어요','었어요','였어요','았어','었어','였어','았습니다','었습니다','였습니다','는다','ㄴ다','다','ㄴ데','는데','는지','은지','ㄴ지','니까','면','서','고','며','지','죠','네','네요','군요','아요','어요','여요','습니다','읍니다','ㅂ니다','ㄹ게','ㄹ까','ㄹ래','ㄹ걸','ㄹ지','ㄹ게요','ㄹ까요','ㄹ래요','ㄹ걸요','ㄹ테','ㄹ래야','ㄹ는','ㄴ가','는가','ㄴ가요','은가','은지','을지','을까','ㄹ거예요','ㄹ거야','ㄹ게','ㄹ게요','ㄹ래','ㄹ래요','ㄹ걸','ㄹ걸요','ㄹ수록','ㅂ시다','읍시다','십시오','세요','셔요','시다','시지요','시군요','시더군요','시네요','시니','시면','시고','시는데','시는','실','시겠','시게','시도록','시려고','시러','아라','어라','여라','자','거라','라','니까','면서','지만','도록','거나','러','려고','려면','더니','느라고','다가','아서','어서','여서','다니','냐고','다고','자고','라고','더라도','거든','고자','길래','나니','노라','니만큼','느냐','더라','련','므로','세','아도','어도','여도','아야','어야','여야','자니','자마자','다','ㄴ다','는다','다면','든','이든','이라','이라는','이라도','이라고','이런','이러','인데','이니까','이지만','이고','이며','이라서','이어서','이지','이죠','이네','이구나','이야','예요','이에요','입니다','이었다','였어','였어요','였습니다','이었','였','이었어','이었어요','이었습니다','해서','하고','하며','하지만','하니까','하려고','하기','하게','하다가','하자','하려는','하려면','하면서','하다니','해야','해도','하든','하건','하나','하니','하네','하길','했다','했습니다','했어','했어요','했고','했지만','했는데','했던','했나','했네','했대','했나요','했구나','스럽다','스러워','스러운','스러워서','답다','다워','다운','다워서','롭다','로워','로운','로워서','져','져요','져서','졌다','졌어요','졌고','졌지만','졌는데','졌습니다','져야','져야지','어지다','아지다','여지다','어진','아진','여진','어졌','아졌','여졌','지고','지며','지면','지니','지려고','지게','지도록','지다','지기','지음','지는','지고','지면서'];
// also handle vowel-merged stems by checking if stripping the last 1-3 chars + adding 다 matches dict
const SUFF3 = ['렸다','렸고','렸지만','렸는데','렸으면','렸던','렸어','렸어요','렸나','렸니','렸나요','렸습니다','렸다가','렸는지','렸다면','셨다','셨고','셨지만','셨는데','셨으면','셨던','셨어','셨어요','셨습니다','셨나','셨나요','봤다','봤어','봤어요','봤고','봤지만','봤는데','봤던','봤습니다','봤나','봤나요','했던데','했으면','했는지','했니','했나요','ㄹ걸요','ㄹ걸','ㄹ지도','ㄹ는지','ㄹ테니까','ㄹ망정','는데도','는지도','은지도','더라도','ㄹ지라도','ㄹ지라','ㄹ지언정'];

function hasDictStem(w){
  // direct: w + 다/hada etc
  if (dictSet.has(w+'다')||dictSet.has(w+'하다')||dictSet.has(w+'이다')||dictSet.has(w+'되다')) return true;
  // strip known suffix
  for (const s of SUFF){
    if (w.length>s.length && w.endsWith(s)){
      const base=w.slice(0,-s.length);
      if (dictSet.has(base)||dictSet.has(base+'다')||dictSet.has(base+'하다')||dictSet.has(base+'이다')||dictSet.has(base+'되다')||dictSet.has(base+'기')) return true;
      // base is itself verb stem ending in 하/되 etc: 하→하다
      if (dictSet.has(base+'다')) return true;
    }
  }
  for (const s of SUFF3){
    if (w.length>s.length && w.endsWith(s)){
      const base=w.slice(0,-s.length);
      // vowel-merge reverse: stem likely base+리/이/우 etc
      const candidates=[base+'다',base+'리다',base+'이 다'.replace(' ',''),base+'우다',base+'치다',base+'이다',base+'하다',base+'되다',base+'기다'];
      for (const c of candidates) if (dictSet.has(c)) return true;
    }
  }
  return false;
}

const remaining=[];
for (const w of susp){
  if (w.length>12) continue; // skip very long sentence-fragments
  if (hasDictStem(w)) continue;
  if (asCompound(w)) continue;
  remaining.push(w);
}
console.log('After compound+conj filter:', remaining.length);
fs.writeFileSync('_remaining.txt', remaining.join('\n'), 'utf8');
console.log('Sample:', remaining.slice(0,80).join(' | '));
