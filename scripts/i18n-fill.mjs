// i18n-fill.mjs — 中文为源，英文自动生成/重译
// 用法: node scripts/i18n-fill.mjs
//
// 策略：zh.ts 是唯一结构源，en.ts 完全按 zh.ts 的行结构（注释/顺序/key）重建。
// 每个 key 的英文值来源：
//   - 中文未改（hash 匹配）→ 复用 en.ts 现有英文（保住人工翻译）
//   - 中文改了 / 是新 key   → 调 DeepSeek 机翻
// hash 表存在 src/locales/_en-hash.json，记录上次生成英文时所用的中文源 hash。
// 首次运行（无 hash 表）：信任所有现有英文，只翻 en 缺失的 key，并建立 hash 基线。

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ZH_FILE = resolve(ROOT, 'src/locales/zh.ts');
const EN_FILE = resolve(ROOT, 'src/locales/en.ts');
const HASH_FILE = resolve(ROOT, 'src/locales/_en-hash.json');

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';
const BATCH_SIZE = 20;

const DRY_RUN = process.argv.includes('--dry');

// ── env ──────────────────────────────────────────────
function loadEnv() {
  const p = resolve(ROOT, '.env.local');
  if (!existsSync(p)) throw new Error('.env.local not found');
  const env = {};
  for (const line of readFileSync(p, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

// ── 解析 locale 文件 ──────────────────────────────────
// 返回 { headLines, bodyLines, tailLines, map }
// bodyLines = 对象字面量内部的原始行（含注释/空行/key 行）
function parseLocale(file) {
  const src = readFileSync(file, 'utf-8');
  const lines = src.split('\n');
  const openIdx = lines.findIndex((l) => /:\s*Record<string,\s*string>\s*=\s*\{/.test(l));
  const closeIdx = lines.findIndex((l, i) => i > openIdx && /^\};\s*$/.test(l));
  if (openIdx === -1 || closeIdx === -1) throw new Error(`无法解析结构: ${file}`);
  const bodyLines = lines.slice(openIdx + 1, closeIdx);

  // 用 Function 求值对象体，安全提取 key→value（JS 对象字面量支持 // 注释和 trailing comma）
  const body = bodyLines.join('\n');
  // eslint-disable-next-line no-new-func
  const map = Function(`"use strict"; return {${body}};`)();
  return { bodyLines, map };
}

const keyLineRe = /^(\s*)(['"])((?:\\.|[^\\])*?)\2\s*:/;

function md5(s) {
  return createHash('md5').update(s, 'utf8').digest('hex').slice(0, 12);
}

// ── DeepSeek 批量翻译 ─────────────────────────────────
async function translateBatch(items, apiKey) {
  const sys = `你是韩语学习 App「Tori」的 UI 本地化翻译。把中文界面文案翻成自然、简洁、地道的英文，面向东南亚和欧美的英语使用者（不是母语中文者）。

规则：
- 译文是 App 界面文字（按钮/标题/提示/空状态等），要短、清楚、符合英文 UI 习惯，不要逐字直译。
- 若某条中文值本身已经是韩语（如 안녕하세요）或本身就是英文/专有名词，原样返回，不要翻译。
- 保留占位符原样：{n} {name} {count} \${...} %s 等，位置按英文语序自然调整。
- 保留结尾标点/箭头风格（如 → 、!、?、…）。
- 保留 emoji。

输入是 JSON 数组，每项 {"key","zh"}。只返回 JSON 数组，每项 {"key","en"}，key 原样对应，不要 markdown 代码块，不要任何解释。`;

  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: JSON.stringify(items.map((i) => ({ key: i.key, zh: i.zh }))) },
      ],
      temperature: 0.2,
      max_tokens: 4000,
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  let content = json.choices[0].message.content.trim();
  content = content.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const arr = JSON.parse(content);
  const out = {};
  for (const it of arr) {
    if (!it || !it.key) continue;
    const en = String(it.en ?? '').trim();
    if (en) out[it.key] = en; // 空翻译不回填，交由调用方回退中文
  }
  return out;
}

// ── 主流程 ────────────────────────────────────────────
async function main() {
  const env = loadEnv();
  const apiKey = env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_LOOKUP_KEY 缺失');

  const zh = parseLocale(ZH_FILE);
  const en = parseLocale(EN_FILE);
  const oldHash = existsSync(HASH_FILE) ? JSON.parse(readFileSync(HASH_FILE, 'utf-8')) : null;
  const firstRun = oldHash === null;

  const zhKeys = Object.keys(zh.map);
  const toTranslate = [];   // {key, zh}
  const finalEn = {};       // key → 英文值

  for (const key of zhKeys) {
    const zhVal = zh.map[key];
    const curHash = md5(zhVal);
    const enVal = en.map[key];
    const enHasNonEmpty = typeof enVal === 'string' && enVal.trim() !== ''; // 空英文视同缺失，需重译
    let reuse;
    if (firstRun) {
      reuse = enHasNonEmpty; // 首次：信任现有非空英文，缺失/空则补
    } else {
      reuse = enHasNonEmpty && oldHash[key] === curHash; // 中文没改且英文非空才复用
    }
    if (reuse) {
      finalEn[key] = enVal;
    } else {
      toTranslate.push({ key, zh: zhVal });
      finalEn[key] = enHasNonEmpty ? enVal : zhVal; // 占位（回退中文），翻译后覆盖
    }
  }

  const deadKeys = Object.keys(en.map).filter((k) => !(k in zh.map));

  console.log(`zh keys: ${zhKeys.length} | en 现有: ${Object.keys(en.map).length}`);
  console.log(`首次运行: ${firstRun}`);
  console.log(`需翻译（新增/中文改动）: ${toTranslate.length}`);
  console.log(`将删除的死 key（en 有 zh 无）: ${deadKeys.length}${deadKeys.length ? ' → ' + deadKeys.join(', ') : ''}`);

  if (toTranslate.length && !DRY_RUN) {
    for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
      const batch = toTranslate.slice(i, i + BATCH_SIZE);
      process.stdout.write(`  翻译 ${i + 1}-${i + batch.length} / ${toTranslate.length} ... `);
      const res = await translateBatch(batch, apiKey);
      for (const it of batch) if (res[it.key] != null) finalEn[it.key] = res[it.key];
      console.log('ok');
    }
    // 补翻：仍等于中文（含 CJK）的项，说明该批漏翻，重试最多 2 轮、小批
    for (let round = 1; round <= 4; round++) {
      const missed = toTranslate.filter((it) => finalEn[it.key] === it.zh && /[一-鿿]/.test(it.zh));
      if (missed.length === 0) break;
      console.log(`  补翻第 ${round} 轮：${missed.length} 条`);
      for (let i = 0; i < missed.length; i += BATCH_SIZE) {
        const batch = missed.slice(i, i + BATCH_SIZE);
        const res = await translateBatch(batch, apiKey);
        for (const it of batch) if (res[it.key] != null) finalEn[it.key] = res[it.key];
      }
    }
  } else if (toTranslate.length && DRY_RUN) {
    console.log('  [dry] 跳过实际翻译');
    for (const it of toTranslate) console.log(`    ${it.key} :: ${it.zh}`);
  }

  // ── 按 zh.ts 行结构重建 en.ts ──
  const rebuilt = zh.bodyLines.map((line) => {
    const m = line.match(keyLineRe);
    if (!m) return line; // 注释 / 空行 → 原样
    const indent = m[1];
    const key = m[3];
    const val = finalEn[key] || zh.map[key]; // 空英文回退中文，绝不写空串
    return `${indent}'${key}': ${JSON.stringify(val)},`;
  });

  const enOut =
    `// English dictionary — auto-generated from zh.ts by scripts/i18n-fill.mjs\n` +
    `// 不要手改：改中文请编辑 zh.ts 后跑 \`node scripts/i18n-fill.mjs\`\n` +
    `const en: Record<string, string> = {\n` +
    rebuilt.join('\n') +
    `\n};\n\nexport default en;\n`;

  const newHash = {};
  for (const key of zhKeys) newHash[key] = md5(zh.map[key]);

  if (DRY_RUN) {
    console.log('\n[dry] 未写文件。');
    return;
  }

  writeFileSync(EN_FILE, enOut, 'utf-8');
  writeFileSync(HASH_FILE, JSON.stringify(newHash, null, 0) + '\n', 'utf-8');
  console.log(`\n✅ 写入 ${EN_FILE}`);
  console.log(`✅ 写入 hash 基线 ${HASH_FILE}（${zhKeys.length} keys）`);
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
