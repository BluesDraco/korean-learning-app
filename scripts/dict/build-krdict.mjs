// One-time build: download KRDict LMF XML (11 files) from GitHub, extract
// Korean + Chinese fields, bucket by 초성, write JSON to src/data/dict/.
// Source: spellcheck-ko/korean-dict-nikl (CC BY-SA 2.0, 국립국어원 KRDict)
// Run: node scripts/dict/build-krdict.mjs

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../../src/data/dict');
const REPO = 'spellcheck-ko/korean-dict-nikl';
const FILES = ['001','002','003','004','005','006','007','008','009','010','011'];

// ── 초성 index ──────────────────────────────────────────────────
const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
// 双写归并到基本초성，减少空桶（ㄲ→ㄱ 等），符合词典가나다分组习惯
const CHO_MERGE = { 'ㄲ':'ㄱ','ㄸ':'ㄷ','ㅃ':'ㅂ','ㅆ':'ㅅ','ㅉ':'ㅈ' };
const INDEX_KEYS = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','#'];

function initialOf(word) {
  const c = word.codePointAt(0);
  if (c >= 0xac00 && c <= 0xd7a3) {
    const cho = CHOSEONG[Math.floor((c - 0xac00) / 588)];
    return CHO_MERGE[cho] ?? cho;
  }
  return '#'; // 非완성형 한글（숫자/기호/외국어 표제어）
}

// ── minimal HTML entity decode ─────────────────────────────────
function decode(s) {
  if (!s) return s;
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function feat(block, att) {
  const m = block.match(new RegExp(`<feat att="${att}" val="([^"]*)"`));
  return m ? decode(m[1]) : '';
}

// ── download with retry via GitHub contents API (raw domain blocked) ──
async function download(name) {
  const url = `https://api.github.com/repos/${REPO}/contents/krdict/${name}.xml`;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/vnd.github.raw+json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (!text.includes('<LexicalEntry')) throw new Error('no entries in payload');
      return text;
    } catch (e) {
      console.log(`  [${name}] attempt ${attempt} failed: ${e.message}`);
      if (attempt === 5) throw e;
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ── parse one file → array of DictEntry ────────────────────────
function parseFile(xml) {
  const out = [];
  // split on LexicalEntry boundaries
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

    // pronunciation + sound: first WordForm of type 발음
    let pron = '', sound = '';
    const wfBlocks = block.match(/<WordForm>[\s\S]*?<\/WordForm>/g) || [];
    for (const wf of wfBlocks) {
      if (feat(wf, 'type') === '발음') {
        pron = feat(wf, 'pronunciation');
        sound = feat(wf, 'sound');
        break;
      }
    }

    // senses
    const senseBlocks = block.match(/<Sense [\s\S]*?<\/Sense>/g) || [];
    const senses = [];
    for (const sb of senseBlocks) {
      const defKo = feat(sb, 'definition');
      // Chinese equivalent
      let zh = '', defZh = '';
      const eqBlocks = sb.match(/<Equivalent>[\s\S]*?<\/Equivalent>/g) || [];
      for (const eq of eqBlocks) {
        if (feat(eq, 'language') === '중국어') {
          zh = feat(eq, 'lemma');
          if (zh === '(无对应词汇)' || zh === '(無對應詞彙)') zh = ''; // KRDict 占位符，非真对译
          defZh = feat(eq, 'definition');
          break;
        }
      }
      // examples (구/문장/대화)
      const exBlocks = sb.match(/<SenseExample>[\s\S]*?<\/SenseExample>/g) || [];
      const examples = [];
      for (const ex of exBlocks) {
        const type = feat(ex, 'type');
        // 대화 has two example feats; grab all
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

// 韩语 가나다 排序（완성형 한글 codepoint 顺序即가나다）
function ganadaCmp(a, b) {
  if (a.k < b.k) return -1;
  if (a.k > b.k) return 1;
  return (Number(a.h) || 0) - (Number(b.h) || 0);
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const buckets = {};
  for (const key of INDEX_KEYS) buckets[key] = [];

  let total = 0;
  for (const name of FILES) {
    console.log(`Downloading ${name}.xml …`);
    const xml = await download(name);
    console.log(`  parsing (${(xml.length / 1048576).toFixed(1)}MB) …`);
    const parsed = parseFile(xml);
    total += parsed.length;
    for (const e of parsed) {
      const key = initialOf(e.k);
      buckets[key].push(e);
    }
    console.log(`  ${name}.xml → ${parsed.length} entries (running total ${total})`);
  }

  // write per-초성 files + a manifest with counts
  const manifest = {};
  let onlyKoCount = 0, withZhCount = 0;
  for (const key of INDEX_KEYS) {
    buckets[key].sort(ganadaCmp);
    const arr = buckets[key];
    for (const e of arr) {
      if (e.s.some(s => s.zh)) withZhCount++; else onlyKoCount++;
    }
    const fname = key === '#' ? 'etc' : `cho-${INDEX_KEYS.indexOf(key)}`;
    writeFileSync(join(OUT_DIR, `${fname}.json`), JSON.stringify(arr));
    manifest[key] = { file: fname, count: arr.length };
  }
  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify({
    total, withZhCount, onlyKoCount, index: INDEX_KEYS, buckets: manifest,
    source: '국립국어원 한국어기초사전 (KRDict) · CC BY-SA 2.0',
  }, null, 2));

  console.log(`\nDONE. total=${total}, withZh=${withZhCount}, onlyKo=${onlyKoCount}`);
  console.log('Manifest:', JSON.stringify(manifest, null, 2));
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
