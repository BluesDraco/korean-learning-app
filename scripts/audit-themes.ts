import { themePacks } from '../src/data/vocabulary/themes';
import { allEntriesById } from '../src/data/vocabulary/vocab-data';

const V2_THEMES = [
  'theme-shopping', 'theme-subway', 'theme-hospital', 'theme-hotel',
  'theme-greetings', 'theme-emotions', 'theme-kdrama', 'theme-beauty',
  'theme-travel', 'theme-work', 'theme-classroom', 'theme-interview',
  'theme-meeting', 'theme-banking', 'theme-move', 'theme-sports',
  'theme-festival', 'theme-social-media', 'theme-dating', 'theme-study-abroad',
  // 2026-07-16 扩展：补齐短板分类
  'theme-airport', 'theme-sightseeing', 'theme-guesthouse', 'theme-emergency',
  'theme-invite', 'theme-thanks-apology', 'theme-refusal',
  'theme-variety', 'theme-concert',
  'theme-parttime', 'theme-online-class', 'theme-library',
  'theme-negotiation', 'theme-presentation', 'theme-client',
];

// 试点 v2（用作对照）
const PILOT_V2 = ['theme-cafe', 'theme-restaurant', 'theme-kpop'];

const MIN = {
  wordIds: 40,
  dialogues: 3,
  pitfalls: 5,
  wordGroups: 5,
  sentences: 8,
};

const allWordIds = new Set(allEntriesById.keys());

type Issue = { theme: string; severity: 'P0' | 'P1' | 'P2'; msg: string };
const issues: Issue[] = [];

function add(theme: string, severity: Issue['severity'], msg: string) {
  issues.push({ theme, severity, msg });
}

for (const id of V2_THEMES) {
  const t = themePacks.find((p) => p.id === id);
  if (!t) {
    add(id, 'P0', '主题不存在');
    continue;
  }

  // 字段完整性
  if (!t.wordGroups) add(id, 'P0', '缺 wordGroups');
  if (!t.dialogues) add(id, 'P0', '缺 dialogues');
  if (!t.pitfalls) add(id, 'P0', '缺 pitfalls');
  if (!t.sentences) add(id, 'P0', '缺 sentences');

  // 数量下限
  if (t.wordIds.length < MIN.wordIds)
    add(id, 'P1', `wordIds ${t.wordIds.length} < ${MIN.wordIds}`);
  if ((t.dialogues?.length ?? 0) < MIN.dialogues)
    add(id, 'P1', `dialogues ${t.dialogues?.length ?? 0} < ${MIN.dialogues}`);
  if ((t.pitfalls?.length ?? 0) < MIN.pitfalls)
    add(id, 'P1', `pitfalls ${t.pitfalls?.length ?? 0} < ${MIN.pitfalls}`);
  if ((t.wordGroups?.length ?? 0) < MIN.wordGroups)
    add(id, 'P1', `wordGroups ${t.wordGroups?.length ?? 0} < ${MIN.wordGroups}`);
  if (t.sentences.length < MIN.sentences)
    add(id, 'P1', `sentences ${t.sentences.length} < ${MIN.sentences}`);

  // 规范残留
  if ((t as { toriQuote?: string }).toriQuote)
    add(id, 'P1', '仍有 toriQuote 字段（v2 应移除）');
  if ((t as { estimatedMinutes?: number }).estimatedMinutes !== undefined)
    add(id, 'P1', '仍有 estimatedMinutes 字段（v2 应移除）');

  // wordIds 引用完整性
  const missing = t.wordIds.filter((wid) => !allWordIds.has(wid));
  if (missing.length) add(id, 'P0', `wordIds 引用不存在: ${missing.join(', ')}`);

  // wordIds 重复
  const dupeCount = t.wordIds.length - new Set(t.wordIds).size;
  if (dupeCount) add(id, 'P2', `wordIds 有 ${dupeCount} 处重复`);

  // wordGroups.wordIds 必须是主 wordIds 子集
  if (t.wordGroups) {
    const mainSet = new Set(t.wordIds);
    for (const g of t.wordGroups) {
      const orphan = g.wordIds.filter((w) => !mainSet.has(w));
      if (orphan.length) add(id, 'P0', `wordGroup "${g.label}" 有词不在主 wordIds: ${orphan.join(', ')}`);
      const gMissing = g.wordIds.filter((w) => !allWordIds.has(w));
      if (gMissing.length) add(id, 'P0', `wordGroup "${g.label}" 引用不存在: ${gMissing.join(', ')}`);
    }
  }

  // breakdown 格式（新版必须用 role/note，不是 partOfSpeech/meaning）
  let oldStyleBreakdown = 0;
  for (const s of t.sentences) {
    if (!s.breakdown) continue;
    for (const b of s.breakdown) {
      const hasNewStyle = 'role' in b || 'note' in b;
      const hasOldStyle = 'partOfSpeech' in b || 'meaning' in b;
      if (!hasNewStyle && hasOldStyle) oldStyleBreakdown++;
    }
  }
  if (oldStyleBreakdown)
    add(id, 'P1', `breakdown 有 ${oldStyleBreakdown} 处仍用 partOfSpeech/meaning`);
}

// 输出报告
const bySeverity = { P0: 0, P1: 0, P2: 0 };
const byTheme = new Map<string, Issue[]>();
for (const iss of issues) {
  bySeverity[iss.severity]++;
  const arr = byTheme.get(iss.theme) ?? [];
  arr.push(iss);
  byTheme.set(iss.theme, arr);
}

console.log('=== 第一层｜自动化结构校验报告 ===\n');
console.log(`总问题: ${issues.length}（P0=${bySeverity.P0} P1=${bySeverity.P1} P2=${bySeverity.P2}）\n`);

// 每主题详情
for (const id of V2_THEMES) {
  const list = byTheme.get(id);
  if (!list) {
    console.log(`✅ ${id}`);
    continue;
  }
  console.log(`❌ ${id}`);
  for (const iss of list) console.log(`   [${iss.severity}] ${iss.msg}`);
}

// 试点对照
console.log('\n=== 试点主题（cafe/restaurant/kpop）参考 ===');
for (const id of PILOT_V2) {
  const t = themePacks.find((p) => p.id === id);
  if (!t) continue;
  console.log(`${id}: wordIds=${t.wordIds.length}, groups=${t.wordGroups?.length ?? 0}, dialogues=${t.dialogues?.length ?? 0}, pitfalls=${t.pitfalls?.length ?? 0}, sentences=${t.sentences.length}`);
}

process.exit(bySeverity.P0 > 0 ? 1 : 0);
