// 全站韩语 TTS 静态化合成 — 服务器本地运行（纯 .mjs，零 TS 依赖）
// 读 scripts/tts-texts.json（本地 extract-tts-texts.mts 产出）→ 打 localhost:8800 落盘 → 产出 index.json
// 用法: node scripts/gen-all-tts.mjs
//
// 与旧 gen-vocab-audio.mjs 的区别：文本来源从"拉 vocabulary API"改为"读预抽取的 json 清单"，
// 覆盖全站（词汇+语法+日记+场景+听写+主题对话...）。落盘目录/URL/命名/语速全部不变，
// 前端 audioRegistry.loadVocabAudioIndex() 无需改。
import { createHash } from 'node:crypto';
import { mkdir, writeFile, readFile, readdir, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TTS = 'http://localhost:8800';
const VOICE = 'sunhi';
const RATE = '-25%'; // 对齐前端默认语速 0.75（audioRegistry VOCAB_BASE_RATE）
// 部署目录外，nginx 映射 /audio/vocab/ → 此处，避免部署清理误删（2026-07-29）
const OUT_DIR = '/www/tori-assets/vocab';
const INDEX_PATH = join(OUT_DIR, 'vocab-index.json');
const TEXTS_PATH = join(__dirname, 'tts-texts.json');
const CONCURRENCY = 4;

const md5 = (s) => createHash('md5').update(s).digest('hex');

async function main() {
  if (!existsSync(TEXTS_PATH)) {
    console.error(`缺少文本清单 ${TEXTS_PATH}。先在本地跑 npx tsx scripts/extract-tts-texts.mts 并上传。`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const texts = JSON.parse(await readFile(TEXTS_PATH, 'utf8'));
  console.log(`清单共 ${texts.length} 条文本待合成\n`);

  // 断点续跑：已有 mp3 直接复用（含旧 vocab 脚本产物，md5 命名一致）
  const existing = new Set(existsSync(OUT_DIR) ? await readdir(OUT_DIR) : []);

  // 若已有 index 先读入，新结果并入（保留旧 vocab 词条映射，避免覆盖丢失）
  const index = existsSync(INDEX_PATH)
    ? JSON.parse(await readFile(INDEX_PATH, 'utf8'))
    : {};

  let done = 0, failed = 0, cached = 0;
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
        // 原子落盘：先写临时文件再 rename，避免中断留下半截 mp3
        const tmp = join(OUT_DIR, `.${name}.tmp`);
        await writeFile(tmp, buf);
        await rename(tmp, join(OUT_DIR, name));
        existing.add(name);
        done++;
      } catch (e) {
        failed++;
        delete index[text];
        console.error(`FAIL "${text.slice(0, 30)}": ${e.message}`);
      }
      if (done % 200 === 0) {
        console.log(`  ${done}/${texts.length} (cached ${cached}, failed ${failed})`);
        await writeFile(INDEX_PATH, JSON.stringify(index)); // 定期 flush，边跑边可用
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await writeFile(INDEX_PATH, JSON.stringify(index));
  console.log(`\n完成: ${done} 生成/复用 (cached ${cached}), ${failed} 失败, index ${Object.keys(index).length} 条`);
  console.log(`index → ${INDEX_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
