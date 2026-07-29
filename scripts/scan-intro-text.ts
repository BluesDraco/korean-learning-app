/**
 * 扫描全站"介绍性中文词条"
 *
 * 目标字段（介绍性）:
 * - description / subtitle / summary / intro / lead / tagline / caption
 * - title（顶层页面/模块）
 * - toriQuote / quote / hint / desc
 *
 * 不含: 教学内容主体（sentences.chinese、breakdown.note、pitfall.detail、对话内容）
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = 'C:/Users/Administrator/Desktop/korean-learning-app/src';

// 介绍性字段关键词
const INTRO_KEYS = [
  'description', 'subtitle', 'summary', 'intro', 'lead',
  'tagline', 'caption', 'toriQuote', 'quote', 'hint',
  'desc', 'blurb', 'note',
];

// 需要扫描的目录
const SCAN_DIRS = [
  'data',
  'app',
  'components',
  'lib',
];

// 排除
const EXCLUDE = [
  'node_modules', '.next', '.git', 'dist', 'build',
  'phonetics-progressive.ts', // 语音数据
  'entries-topik', 'entries-topik-textbook',
  'kpopSongs.ts', 'kpopTracks.ts',
];

type Hit = {
  file: string;
  line: number;
  key: string;
  value: string;
  category: string;
};

const hits: Hit[] = [];
const hasChinese = (s: string) => /[一-龥]/.test(s);

function categorize(file: string): string {
  const f = file.replace(/\\/g, '/');
  if (f.includes('/data/vocabulary/themes')) return 'vocab-theme';
  if (f.includes('/data/vocabulary/')) return 'vocab-word';
  if (f.includes('/data/diary/subquests')) return 'diary-subquest';
  if (f.includes('/data/diary/days')) return 'diary-day';
  if (f.includes('/data/diary')) return 'diary-other';
  if (f.includes('/data/grammar')) return 'grammar';
  if (f.includes('/data/topik')) return 'topik';
  if (f.includes('/data/reading')) return 'reading';
  if (f.includes('/data/kpop')) return 'kpop';
  if (f.includes('/data/scenePreview')) return 'scene-preview';
  if (f.includes('/data/navigation')) return 'navigation';
  if (f.includes('/data/')) return 'data-other';
  if (f.includes('/app/')) return 'app-page';
  if (f.includes('/components/')) return 'component';
  if (f.includes('/lib/')) return 'lib';
  return 'other';
}

function scanFile(file: string) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  const keyPattern = new RegExp(
    `^\\s*(${INTRO_KEYS.join('|')})\\s*[:=]\\s*['"\`]([^'"\`]{2,300})['"\`]`,
    'i'
  );

  const cat = categorize(file);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(keyPattern);
    if (!m) continue;
    const key = m[1];
    const value = m[2];
    if (!hasChinese(value)) continue;
    if (value.length < 4) continue;

    hits.push({
      file: file.replace(ROOT + '/', ''),
      line: i + 1,
      key,
      value,
      category: cat,
    });
  }
}

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (EXCLUDE.some((e) => name.includes(e))) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(name)) scanFile(full);
  }
}

for (const sub of SCAN_DIRS) walk(path.join(ROOT, sub));

// 归类统计
const byCategory = new Map<string, Hit[]>();
const byKey = new Map<string, number>();
for (const h of hits) {
  const arr = byCategory.get(h.category) ?? [];
  arr.push(h);
  byCategory.set(h.category, arr);
  byKey.set(h.key, (byKey.get(h.key) ?? 0) + 1);
}

// 判断腔调风险（老 tori 腔 / emoji 过多 / 营销黑话）
const TORI_MARKS = ['토리', '与你一起', '让你', '教你', '带你', '和你一起'];
const EMOJI_RE = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/gu;
const MARKETING = ['必备', '一站搞定', '轻松', '再也不', '不再头疼', '说走就走', '搞定', '不用怕', '不再害怕', '玩得转', '不再尴尬'];

// 日记 subquest subtitle 用 emoji 是设计，不算风险
const risky: Hit[] = [];
for (const h of hits) {
  const emojiCount = (h.value.match(EMOJI_RE) || []).length;
  const toriHit = TORI_MARKS.some((k) => h.value.includes(k));
  const marketingHit = MARKETING.some((k) => h.value.includes(k));
  const isDiarySubtitle = h.category.startsWith('diary') && h.key === 'subtitle';
  const emojiRisky = emojiCount > 0 && !isDiarySubtitle;
  if (emojiRisky || toriHit || marketingHit) risky.push(h);
}

// 输出报告
console.log('=== 全站介绍性中文词条扫描 ===\n');
console.log(`总命中: ${hits.length} 条`);
console.log(`高风险（含 emoji/托利腔/营销黑话）: ${risky.length} 条\n`);

console.log('【按字段类型】');
for (const [k, n] of [...byKey.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${n}`);
}

console.log('\n【按模块】');
for (const [c, arr] of [...byCategory.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${c}: ${arr.length} 条`);
}

console.log('\n【高风险条目前 40 个】');
risky.slice(0, 40).forEach((h) => {
  console.log(`  [${h.category}] ${h.file}:${h.line} (${h.key})`);
  console.log(`    "${h.value}"`);
});

console.log('\n【非高风险样例（各分类抽 3 个）】');
for (const [c, arr] of byCategory) {
  console.log(`  === ${c} ===`);
  const clean = arr.filter((h) => !risky.includes(h)).slice(0, 3);
  for (const h of clean) console.log(`    "${h.value}"  [${h.file}:${h.line}]`);
}

// 全量输出到 json 备用
fs.writeFileSync(
  path.join(ROOT, '..', 'scripts', 'intro-text-scan.json'),
  JSON.stringify({ hits, risky }, null, 2),
  'utf8'
);
console.log(`\n完整清单已写入 scripts/intro-text-scan.json（${hits.length} 条）`);
