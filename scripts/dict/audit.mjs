// 词典数据全量审计。只读，不改数据。
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '../../src/data/dict');

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

const manifest = JSON.parse(readFileSync(join(DIR, 'manifest.json'), 'utf8'));
const problems = { bucket: [], order: [], placeholder: [], htmlEntity: [], mixZh: [], emptyK: [], emptySense: [], dupId: [], noPron: 0, noPos: 0 };
const seenIds = new Map();
let total = 0, withZh = 0, onlyKo = 0, withEx = 0, withLv = 0;
const posSet = new Set(), lvSet = new Set();
const samples = [];

const HANGUL = /[가-힣]/;
const CJK = /[一-鿿]/;
const HANGUL_RANGE = /[ᄀ-ᇿ㄰-㆏가-힣]/; // 韩文 jamo+음절

for (const key of INDEX_KEYS) {
  const fname = key === '#' ? 'etc' : `cho-${INDEX_KEYS.indexOf(key)}`;
  const arr = JSON.parse(readFileSync(join(DIR, `${fname}.json`), 'utf8'));
  if (arr.length !== manifest.buckets[key].count) {
    problems.bucket.push(`${key}: 文件 ${arr.length} 条 ≠ manifest ${manifest.buckets[key].count}`);
  }
  let prevK = '', prevH = 0;
  for (const e of arr) {
    total++;
    // dup id
    if (seenIds.has(e.id)) problems.dupId.push(`${e.id} (${e.k} & ${seenIds.get(e.id)})`);
    else seenIds.set(e.id, e.k);
    // empty k
    if (!e.k) { problems.emptyK.push(e.id); continue; }
    // bucket correctness
    const shouldBe = initialOf(e.k);
    if (shouldBe !== key) problems.bucket.push(`${e.k} 应在 ${shouldBe}，实际在 ${key}`);
    // ganada order
    if (prevK && e.k < prevK) problems.order.push(`${key}: "${e.k}" 排在 "${prevK}" 之后（乱序）`);
    prevK = e.k;
    // empty senses
    if (!e.s || e.s.length === 0) { problems.emptySense.push(`${e.k} (${e.id})`); continue; }
    // stats
    if (e.pron) {} else problems.noPron++;
    if (e.pos) posSet.add(e.pos); else problems.noPos++;
    if (e.lv) { lvSet.add(e.lv); withLv++; }
    let hasZh = false, hasEx = false;
    for (const s of e.s) {
      if (s.zh || s.defZh) hasZh = true;
      if (s.ex && s.ex.length) hasEx = true;
      // placeholder leak
      for (const f of ['zh','defZh','defKo']) {
        const v = s[f];
        if (v && (v.includes('(无对应词汇)') || v.includes('(無對應詞彙)'))) problems.placeholder.push(`${e.k}.${f}="${v}"`);
        if (v && /&(lt|gt|amp|quot|apos|#39);/.test(v)) problems.htmlEntity.push(`${e.k}.${f}="${v.slice(0,40)}"`);
      }
      // 混排：zh 字段里混入韩文音节
      if (s.zh && HANGUL_RANGE.test(s.zh)) problems.mixZh.push(`${e.k}.zh="${s.zh}"`);
    }
    if (hasZh) withZh++; else onlyKo++;
    if (hasEx) withEx++;
    // 收集抽样
    if (samples.length < 40 && Math.random() < 0.002) samples.push(e);
  }
}

console.log('════════ 词典数据审计 ════════');
console.log(`总条数: ${total}  (manifest: ${manifest.total})`);
console.log(`含中文(zh/defZh): ${withZh}  纯韩: ${onlyKo}  含例句: ${withEx}  含难度: ${withLv}`);
console.log(`无发音: ${problems.noPron}  无词性: ${problems.noPos}`);
console.log(`词性集合(${posSet.size}): ${[...posSet].join(', ')}`);
console.log(`难度集合: ${[...lvSet].join(', ')}`);
console.log('');
console.log('──── 问题清单 ────');
const report = (name, arr, cap = 15) => {
  console.log(`\n【${name}】 ${arr.length} 处`);
  arr.slice(0, cap).forEach(x => console.log('  ✗ ' + x));
  if (arr.length > cap) console.log(`  … 还有 ${arr.length - cap} 处`);
};
report('分桶错误', problems.bucket);
report('가나다乱序', problems.order);
report('占位符泄漏', problems.placeholder);
report('HTML实体泄漏', problems.htmlEntity);
report('中文字段混入韩文', problems.mixZh);
report('空表题词', problems.emptyK);
report('空义项', problems.emptySense);
report('重复ID', problems.dupId);

console.log('\n──── 随机抽样 20 条（人工核对用）────');
for (const e of samples.slice(0, 20)) {
  const s0 = e.s[0];
  console.log(`\n[${e.id}] ${e.k}${e.h?'⁽'+e.h+'⁾':''} ${e.pos||''} ${e.pron?'['+e.pron+']':''} ${e.lv||''}`);
  console.log(`  义项数:${e.s.length}  zh:"${s0.zh||''}" defZh:"${s0.defZh||''}"`);
  console.log(`  defKo:"${(s0.defKo||'').slice(0,60)}"`);
  if (s0.ex && s0.ex.length) console.log(`  例:"${s0.ex[0].ex}"`);
}
