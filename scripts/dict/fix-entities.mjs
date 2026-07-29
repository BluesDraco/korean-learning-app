// 定向修复：dict JSON 里残留的 HTML 实体二次解码。只重写有变化的文件。
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '../../src/data/dict');
const KEYS = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','#'];

function dec(s) {
  if (typeof s !== 'string' || !s.includes('&')) return s;
  return s
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

let filesChanged = 0, fieldsChanged = 0;
for (let i = 0; i < KEYS.length; i++) {
  const fname = KEYS[i] === '#' ? 'etc' : `cho-${i}`;
  const path = join(DIR, `${fname}.json`);
  const arr = JSON.parse(readFileSync(path, 'utf8'));
  let dirty = false;
  for (const e of arr) {
    for (const s of e.s) {
      for (const f of ['zh', 'defZh', 'defKo']) {
        if (s[f]) { const v = dec(s[f]); if (v !== s[f]) { console.log(`  ${e.k}.${f}: "${s[f]}" → "${v}"`); s[f] = v; fieldsChanged++; dirty = true; } }
      }
      if (s.ex) for (const x of s.ex) { const v = dec(x.ex); if (v !== x.ex) { x.ex = v; fieldsChanged++; dirty = true; } }
    }
  }
  if (dirty) { writeFileSync(path, JSON.stringify(arr)); filesChanged++; console.log(`✓ 重写 ${fname}.json`); }
}
console.log(`\n完成：${filesChanged} 个文件，${fieldsChanged} 处字段。`);
