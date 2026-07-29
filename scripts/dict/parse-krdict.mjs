// Parse locally-downloaded KRDict LMF XML → JSON buckets by 초성.
// Reads from a dir of NNN.xml files (default: $TEMP/krdict), writes to src/data/dict/.
// Run: node scripts/dict/parse-krdict.mjs [xmlDir]

import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../../src/data/dict');
const XML_DIR = process.argv[2] || join(process.env.TEMP || '/tmp', 'krdict');

const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const CHO_MERGE = { 'ㄲ':'ㄱ','ㄸ':'ㄷ','ㅃ':'ㅂ','ㅆ':'ㅅ','ㅉ':'ㅈ' };
const INDEX_KEYS = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','#'];

function initialOf(word) {
  const c = word.codePointAt(0);
  if (c >= 0xac00 && c <= 0xd7a3) {
    const cho = CHOSEONG[Math.floor((c - 0xac00) / 588)];
    return CHO_MERGE[cho] ?? cho;
  }
  return '#';
}
function decode(s) {
  if (!s) return s;
  return s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&apos;/g,"'").replace(/&amp;/g,'&');
}
function feat(block, att) {
  const m = block.match(new RegExp(`<feat att="${att}" val="([^"]*)"`));
  return m ? decode(m[1]) : '';
}

function parseFile(xml) {
  const out = [];
  const entries = xml.split('<LexicalEntry').slice(1);
  for (const raw of entries) {
    const block = '<LexicalEntry' + raw.split('</LexicalEntry>')[0];
    const idM = block.match(/<LexicalEntry att="id" val="([^"]*)"/);
    const lemmaBlock = block.match(/<Lemma>[\s\S]*?<\/Lemma>/);
    const korean = lemmaBlock ? feat(lemmaBlock[0], 'writtenForm') : '';
    if (!korean) continue;
    const homonym = feat(block, 'homonym_number');
    const pos = feat(block, 'partOfSpeech');
    const level = feat(block, 'vocabularyLevel');
    const cat = feat(block, 'semanticCategory');
    let pron = '', sound = '';
    const wfBlocks = block.match(/<WordForm>[\s\S]*?<\/WordForm>/g) || [];
    for (const wf of wfBlocks) {
      if (feat(wf, 'type') === '발음') { pron = feat(wf, 'pronunciation'); sound = feat(wf, 'sound'); break; }
    }
    const senseBlocks = block.match(/<Sense [\s\S]*?<\/Sense>/g) || [];
    const senses = [];
    for (const sb of senseBlocks) {
      const defKo = feat(sb, 'definition');
      let zh = '', defZh = '';
      const eqBlocks = sb.match(/<Equivalent>[\s\S]*?<\/Equivalent>/g) || [];
      for (const eq of eqBlocks) {
        if (feat(eq, 'language') === '중국어') {
          zh = feat(eq, 'lemma');
          if (zh === '(无对应词汇)' || zh === '(無對應詞彙)') zh = '';
          defZh = feat(eq, 'definition');
          break;
        }
      }
      const exBlocks = sb.match(/<SenseExample>[\s\S]*?<\/SenseExample>/g) || [];
      const examples = [];
      for (const ex of exBlocks) {
        const type = feat(ex, 'type');
        const vals = [...ex.matchAll(/<feat att="example" val="([^"]*)"/g)].map(m => decode(m[1]));
        for (const v of vals) examples.push({ t: type, ex: v });
      }
      senses.push({
        defKo,
        ...(zh ? { zh } : {}),
        ...(defZh ? { defZh } : {}),
        ...(examples.length ? { ex: examples.slice(0, 6) } : {}),
      });
    }
    if (senses.length === 0) continue;
    out.push({
      id: idM ? idM[1] : korean,
      k: korean,
      ...(homonym && homonym !== '0' ? { h: homonym } : {}),
      ...(pos ? { pos } : {}),
      ...(pron ? { pron } : {}),
      ...(sound ? { snd: sound } : {}),
      ...(level ? { lv: level } : {}),
      ...(cat ? { cat } : {}),
      s: senses,
    });
  }
  return out;
}
function ganadaCmp(a, b) {
  if (a.k < b.k) return -1;
  if (a.k > b.k) return 1;
  return (Number(a.h) || 0) - (Number(b.h) || 0);
}

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const files = readdirSync(XML_DIR).filter(f => /^\d+\.xml$/.test(f)).sort();
  if (files.length === 0) { console.error('No XML files in', XML_DIR); process.exit(1); }

  const buckets = {};
  for (const key of INDEX_KEYS) buckets[key] = [];
  let total = 0, dupSkipped = 0;
  const seenIds = new Set();

  for (const f of files) {
    const xml = readFileSync(join(XML_DIR, f), 'utf8');
    const parsed = parseFile(xml);
    for (const e of parsed) {
      if (seenIds.has(e.id)) { dupSkipped++; continue; }
      seenIds.add(e.id);
      buckets[initialOf(e.k)].push(e);
      total++;
    }
    console.log(`${f} → ${parsed.length} parsed (total ${total}, dup ${dupSkipped})`);
  }

  const manifest = {};
  let withZhCount = 0, onlyKoCount = 0;
  for (const key of INDEX_KEYS) {
    buckets[key].sort(ganadaCmp);
    for (const e of buckets[key]) { if (e.s.some(s => s.zh || s.defZh)) withZhCount++; else onlyKoCount++; }
    const fname = key === '#' ? 'etc' : `cho-${INDEX_KEYS.indexOf(key)}`;
    writeFileSync(join(OUT_DIR, `${fname}.json`), JSON.stringify(buckets[key]));
    manifest[key] = { file: fname, count: buckets[key].length };
  }
  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify({
    total, withZhCount, onlyKoCount, index: INDEX_KEYS, buckets: manifest,
    source: '국립국어원 한국어기초사전 (KRDict) · CC BY-SA 2.0',
  }, null, 2));
  console.log(`\nDONE. total=${total}, withZhOrDefZh=${withZhCount}, onlyKo=${onlyKoCount}`);
  for (const key of INDEX_KEYS) console.log(`  ${key}: ${manifest[key].count}`);
}
main();
