// 词汇/例句静态音频预生成 — 服务器本地运行
// 拉线上 level API → 收集 korean + examples.korean → 打 localhost:8800 落盘 → 产出 index.json
// 用法: node scripts/gen-vocab-audio.mjs
import { createHash } from 'node:crypto';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const APP = 'http://localhost:3000';
const TTS = 'http://localhost:8800';
const VOICE = 'sunhi';
const RATE = '-25%'; // 对齐前端默认语速 0.75
// 部署目录外，nginx 映射 /audio/vocab/ → 此处，避免部署清理误删（2026-07-29）
const OUT_DIR = '/www/tori-assets/vocab';
const INDEX_PATH = join(OUT_DIR, 'vocab-index.json');
const CONCURRENCY = 4;

const md5 = (s) => createHash('md5').update(s).digest('hex');

function collectTexts(words) {
  const set = new Set();
  for (const w of words) {
    if (w.korean && /[가-힣]/.test(w.korean)) set.add(w.korean.trim());
    for (const ex of w.examples || []) {
      if (ex.korean && /[가-힣]/.test(ex.korean)) set.add(ex.korean.trim());
    }
  }
  return set;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const all = new Set();
  for (const lv of [1, 2, 3, 4, 5, 6]) {
    const r = await fetch(`${APP}/api/vocabulary/levels/${lv}`);
    const d = await r.json();
    const before = all.size;
    for (const t of collectTexts(d.words || [])) all.add(t);
    console.log(`level ${lv}: +${all.size - before} (total ${all.size})`);
  }

  const texts = [...all];
  console.log(`\n共 ${texts.length} 条文本待生成\n`);

  const index = {};
  let done = 0, failed = 0, cached = 0;
  const existing = new Set(existsSync(OUT_DIR) ? await readdir(OUT_DIR) : []);

  const queue = [...texts];
  async function worker() {
    while (queue.length) {
      const text = queue.shift();
      const name = `${md5(text)}.mp3`;
      const rel = `/audio/vocab/${name}`;
      index[text] = rel;
      if (existing.has(name)) { cached++; done++; continue; }
      try {
        const url = `${TTS}/tts?text=${encodeURIComponent(text)}&voice=${VOICE}&rate=${encodeURIComponent(RATE)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`http ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 800) throw new Error(`too small ${buf.length}`);
        await writeFile(join(OUT_DIR, name), buf);
        done++;
      } catch (e) {
        failed++;
        delete index[text];
        console.error(`FAIL "${text}": ${e.message}`);
      }
      if (done % 200 === 0) {
        console.log(`  ${done}/${texts.length} (cached ${cached}, failed ${failed})`);
        // 定期 flush index，使已生成的词可先部署生效，边跑边补
        await writeFile(INDEX_PATH, JSON.stringify(index));
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await writeFile(INDEX_PATH, JSON.stringify(index));
  console.log(`\n完成: ${done} 生成/复用, ${failed} 失败, index ${Object.keys(index).length} 条`);
  console.log(`index → ${INDEX_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
