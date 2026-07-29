#!/usr/bin/env node
/**
 * Day 生成器 · 为 diary 生成 5 个子关卡的空骨架文件
 *
 * 用法：
 *   node scripts/gen-diary-day.mjs <day> [--level beginner] [--dry-run]
 *
 * 示例：
 *   node scripts/gen-diary-day.mjs 2                    # 生成 Day 2 beginner 骨架
 *   node scripts/gen-diary-day.mjs 2 --dry-run          # 只打印，不写文件
 *   node scripts/gen-diary-day.mjs 5 --level beginner   # 显式指定级别
 *
 * 结构常量（对齐 Day 1）：
 *   vocab: encounter 8 + write 8 + recognize 6 + spell 4 + dictation 3
 *   listen: meaning 5 + cloze 4 + reply 3
 *   grammar: fix 5 + compose 4 + rule 4
 *   scene: situation 3 + dialogue 3 + context 2
 *   boss: 8 混合题（4 choice + 2 compose + 2 choice）
 *
 * 生成后自动更新 src/data/diary/subquests/index.ts 的 MAP。
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SUBQUEST_DIR = join(ROOT, 'src', 'data', 'diary', 'subquests');
const INDEX_FILE = join(SUBQUEST_DIR, 'index.ts');

// ── 参数解析 ──────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const dayArg = args.find((a) => /^\d+$/.test(a));
const levelIdx = args.indexOf('--level');
const level = levelIdx >= 0 ? args[levelIdx + 1] : 'beginner';

if (!dayArg) {
  console.error('用法：node scripts/gen-diary-day.mjs <day> [--level beginner] [--dry-run]');
  process.exit(1);
}
const day = parseInt(dayArg, 10);
if (!Number.isInteger(day) || day < 1 || day > 30) {
  console.error(`day 必须是 1-30 之间的整数，收到 ${dayArg}`);
  process.exit(1);
}
if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
  console.error(`level 必须是 beginner/intermediate/advanced，收到 ${level}`);
  process.exit(1);
}

// ── id 前缀 ──────────────────────────────────
const dNN = String(day).padStart(2, '0');

// ── 变量命名 ──────────────────────────────────
const camelCap = (s) => s[0].toUpperCase() + s.slice(1); // "vocab" → "Vocab"
const varName = (kind) => `day${day}${camelCap(kind)}`; // "day2Vocab"

// ── 模板生成 ──────────────────────────────────

function tmplVocab() {
  return `import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day ${day} · 1-1 单어 마스터 · 词汇子关卡
 *
 * 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 * 主流程新词 8 个，进 recognize 只考 core 6 词，ext 2 词进 spell/listen
 * 星级：全对 3 星 / 错 1-2 二星 / 错 3-4 一星 / 错 5+ 零星
 */
export const ${varName('vocab')}: VocabSubQuestData = {
  day: ${day},
  level: '${level}',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터', // TODO: 韩语标题
  subtitle: '', // TODO: 中文子标题

  // ─── Phase 1 · 语遇 8 张自动播故事卡 ───
  encounter: [
${Array.from({ length: 8 }, (_, i) => `    {
      id: 'd${dNN}-v1-e${i + 1}',
      korean: '', hangul: '', zh: '',
      pos: '', // 感叹词/名词/动词/形容词/表达
      example: { ko: '', zh: '' },
      tip: '',
      tier: 'core', // core / ext / emotion
    },`).join('\n')}
  ],

  // ─── Phase 2 · 手写 8 个音节字（覆盖率 ≥20% 及格，不计错） ───
  write: [
${Array.from({ length: 8 }, (_, i) => `    { id: 'd${dNN}-v1-w${i + 1}', korean: '', hangul: '', wordKorean: '', wordZh: '' },`).join('\n')}
  ],

  // ─── Phase 3 · 认词 6 题四选一（只考 core 6 词） ───
  recognize: [
${Array.from({ length: 6 }, (_, i) => `    {
      id: 'd${dNN}-v1-r${i + 1}',
      korean: '', hangul: '',
      choices: [
        { zh: '', correct: true },
        { zh: '', correct: false },
        { zh: '', correct: false },
        { zh: '', correct: false },
      ],
    },`).join('\n')}
  ],

  // ─── Phase 4 · 拼写 4 题音节块（非字母级） ───
  spell: [
${Array.from({ length: 4 }, (_, i) => `    {
      id: 'd${dNN}-v1-s${i + 1}',
      zhHint: '',
      answer: [], // 如 ['당', '근']
      syllables: [], // 含 2 个干扰音节
    },`).join('\n')}
  ],

  // ─── Phase 5 · 听写 3 词（听音写字，无描红，不计错） ───
  dictation: [
${Array.from({ length: 3 }, (_, i) => `    { id: 'd${dNN}-v1-d${i + 1}', korean: '', hangul: '', syllables: [], zh: '' },`).join('\n')}
  ],
};
`;
}

function tmplListen() {
  return `import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day ${day} · 1-2 귀 트이기 · 听力子关卡
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 */
export const ${varName('listen')}: ListenSubQuestData = {
  day: ${day}, level: '${level}', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '', // TODO

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
${Array.from({ length: 5 }, (_, i) => `    {
      id: 'd${dNN}-l2-m${i + 1}',
      audioKo: '',
      choices: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
${Array.from({ length: 4 }, (_, i) => `    {
      id: 'd${dNN}-l2-c${i + 1}',
      audioKo: '',
      clozeParts: ['', ''], // [挖空前, 挖空后]
      choices: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
${Array.from({ length: 3 }, (_, i) => `    {
      id: 'd${dNN}-l2-r${i + 1}',
      audioKo: '',
      promptZh: '',
      choices: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],
};
`;
}

function tmplGrammar() {
  return `import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day ${day} · 1-3 문법 탐험 · 语法关
 * 3 段：助词改错 5 → 组句 4 → 规则理解 4
 */
export const ${varName('grammar')}: GrammarSubQuestData = {
  day: ${day}, level: '${level}', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '', // TODO

  // ─── 助词改错：给含错句 → 选正确写法 ───
  fix: [
${Array.from({ length: 5 }, (_, i) => `    {
      id: 'd${dNN}-g3-f${i + 1}',
      promptKo: '',
      promptZh: '下列哪个句子是正确的？',
      choices: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: true },
        { text: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
${Array.from({ length: 4 }, (_, i) => `    {
      id: 'd${dNN}-g3-c${i + 1}',
      zhHint: '',
      audioKo: '',
      answer: [],
      tokens: [], // 含 2 个干扰词块
      explain: '',
    },`).join('\n')}
  ],

  // ─── 规则理解选择 ───
  rule: [
${Array.from({ length: 4 }, (_, i) => `    {
      id: 'd${dNN}-g3-r${i + 1}',
      promptZh: '',
      choices: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],
};
`;
}

function tmplScene() {
  return `import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day ${day} · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 */
export const ${varName('scene')}: SceneSubQuestData = {
  day: ${day}, level: '${level}', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '', // TODO

  tasks: [
    // ─── 情景应答 3 ─────────────────────
${Array.from({ length: 3 }, (_, i) => `    {
      type: 'situation',
      id: 'd${dNN}-sc-s${i + 1}',
      scenario: '',
      choices: [
        { ko: '', zh: '', correct: true },
        { ko: '', zh: '', correct: false },
        { ko: '', zh: '', correct: false },
        { ko: '', zh: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}

    // ─── 对话填空 3 ─────────────────────
${Array.from({ length: 3 }, (_, i) => `    {
      type: 'dialogue',
      id: 'd${dNN}-sc-d${i + 1}',
      lines: [
        { speaker: '', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '', zh: '', correct: true },
        { ko: '', zh: '', correct: false },
        { ko: '', zh: '', correct: false },
        { ko: '', zh: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}

    // ─── 语境判断 2 ─────────────────────
${Array.from({ length: 2 }, (_, i) => `    {
      type: 'context',
      id: 'd${dNN}-sc-c${i + 1}',
      ko: '',
      promptZh: '',
      choices: [
        { zh: '', correct: true },
        { zh: '', correct: false },
        { zh: '', correct: false },
        { zh: '', correct: false },
      ],
      explain: '',
    },`).join('\n')}
  ],
};
`;
}

function tmplBoss() {
  return `import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day ${day} · 1-5 최후의 관문 · Boss 战 · 综合大考
 * 8 题混合：4 choice + 2 compose + 2 choice
 * 参考 Day 1 分布：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 */
export const ${varName('boss')}: BossSubQuestData = {
  day: ${day}, level: '${level}', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '', // TODO
  intro: '', // 入场剧情
  outroHook: '', // 通关钩子（衔接下一 Day）

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd${dNN}-b5-t1',
        audioKo: '',
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd${dNN}-b5-t2',
        audioKo: '',
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd${dNN}-b5-t3',
        promptZh: '下面哪句是正确的？',
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd${dNN}-b5-t4',
        promptKo: '',
        promptHangul: '', // 罗马拼音（非韩文）
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd${dNN}-b5-t5',
        zhHint: '',
        audioKo: '',
        answer: [],
        tokens: [],
        explain: '',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd${dNN}-b5-t6',
        zhHint: '',
        audioKo: '',
        answer: [],
        tokens: [],
        explain: '',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd${dNN}-b5-t7',
        audioKo: '',
        promptZh: '',
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd${dNN}-b5-t8',
        promptZh: '',
        choices: [
          { text: '', correct: true },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
        ],
        explain: '',
      },
    },
  ],
};
`;
}

// ── 更新 index.ts ──────────────────────────────────

function patchIndex() {
  let text = readFileSync(INDEX_FILE, 'utf-8');
  const key = `${level}-${day}`;
  const kinds = ['vocab', 'listen', 'grammar', 'scene', 'boss'];

  // 1. 加 5 个 import
  const importBlock = kinds
    .map((k) => `import { ${varName(k)} } from './day-${day}-${k}';`)
    .join('\n');

  if (!text.includes(`from './day-${day}-vocab'`)) {
    // 插到最后一个 import 后面
    const lastImport = text.lastIndexOf('import ');
    const lineEnd = text.indexOf('\n', lastImport);
    text = text.slice(0, lineEnd + 1) + importBlock + '\n' + text.slice(lineEnd + 1);
  }

  // 2. 每个 MAP 里加一行 `'level-day': dayNKind,`
  const mapNames = {
    vocab: 'VOCAB_MAP',
    listen: 'LISTEN_MAP',
    grammar: 'GRAMMAR_MAP',
    scene: 'SCENE_MAP',
    boss: 'BOSS_MAP',
  };
  for (const k of kinds) {
    const mapName = mapNames[k];
    const re = new RegExp(`(const ${mapName}: Record<[^>]+> = \\{)([^}]*)\\}`, 's');
    const match = text.match(re);
    if (!match) continue;
    const body = match[2];
    if (body.includes(`'${key}'`)) continue; // 已注册
    const newBody = body.replace(/\s*$/, '') + `\n  '${key}': ${varName(k)},\n`;
    text = text.replace(match[0], `${match[1]}${newBody}}`);
  }

  return text;
}

// ── 执行 ──────────────────────────────────

const templates = {
  vocab: tmplVocab(),
  listen: tmplListen(),
  grammar: tmplGrammar(),
  scene: tmplScene(),
  boss: tmplBoss(),
};

const filesToWrite = Object.entries(templates).map(([kind, content]) => ({
  path: join(SUBQUEST_DIR, `day-${day}-${kind}.ts`),
  content,
}));

const patchedIndex = patchIndex();

if (dryRun) {
  console.log('\n=== DRY RUN · 不会写入任何文件 ===\n');
  for (const f of filesToWrite) {
    const rel = f.path.replace(ROOT, '');
    const exists = existsSync(f.path);
    console.log(`  ${exists ? '⚠ 已存在' : '+'} ${rel}  (${f.content.length} bytes)`);
  }
  console.log('\n=== index.ts 变更预览（前 40 行） ===');
  console.log(patchedIndex.split('\n').slice(0, 40).join('\n'));
  console.log('\n（用 --dry-run 不带的方式实际写入）');
  process.exit(0);
}

// 检查已存在
const existing = filesToWrite.filter((f) => existsSync(f.path));
if (existing.length > 0) {
  console.error('以下文件已存在，请先删除或换 Day 号：');
  for (const f of existing) console.error(`  ${f.path}`);
  process.exit(1);
}

// 写入
if (!existsSync(SUBQUEST_DIR)) mkdirSync(SUBQUEST_DIR, { recursive: true });
for (const f of filesToWrite) {
  writeFileSync(f.path, f.content, 'utf-8');
  console.log(`✓ 生成 ${f.path.replace(ROOT, '')}`);
}
writeFileSync(INDEX_FILE, patchedIndex, 'utf-8');
console.log(`✓ 更新 ${INDEX_FILE.replace(ROOT, '')}`);
console.log(`\n完成。跑 \x1b[36mnpx tsc --noEmit\x1b[0m 验证类型。`);
console.log(`填内容后跑 \x1b[36mnpm run lint:diary\x1b[0m 校验。`);
