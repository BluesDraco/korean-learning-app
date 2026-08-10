// Practice Hub · 跨 4 模式数据聚合
// 服务端 /api/user-data 已按 user_id 强制过滤,前端 db.xxx.toArray() 只返回当前用户数据
// 不新建服务端表,只从现有 IndexedDB 后端 + localStorage 拼数据
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { t, type Lang } from '@/lib/i18n';

export type PracticeMode = 'listening' | 'dictation' | 'writing' | 'typing';

export interface PracticeRow {
  id: string;
  mode: PracticeMode;
  timestamp: number;
  scoreText: string;
  meta: string;
  href: string;
}

export interface PracticeStats {
  listening: { total: number; today: number; lastAt?: number; doneToday: boolean };
  dictation: { total: number; correct: number; accuracy: number; today: number; lastAt?: number; doneToday: boolean };
  writing:   { total: number; today: number; lastAt?: number; doneToday: boolean };
  typing:    { total: number; bestWpm: number; bestAcc: number; today: number; lastAt?: number; doneToday: boolean };
  // 今日已完成的模式数(0-4),用作 hub 主目标计数
  modesDoneToday: number;
  // 本周节律:近 7 天(rolling 7 天)每天练习总次数
  weekly: number[]; // length 7,index 0 = 6 天前,index 6 = 今日
  // 每个模式独立 7 天(用于 sparkbar)
  weeklyByMode: {
    listening: number[]; dictation: number[]; writing: number[]; typing: number[];
  };
  streak: number;   // 连续练习天数(从今日往回数)
}

export interface PracticeAggregate {
  stats: PracticeStats;
  recent: PracticeRow[];
}

const SPEAKING_HISTORY_KEY = (uid: string) => `speaking-history:${uid}`;
const SPEAKING_HISTORY_MAX = 30;

interface SpeakingHistoryEntry { id: string; timestamp: number; correct: number; total: number; }

export function readSpeakingHistory(uid: string | undefined): SpeakingHistoryEntry[] {
  if (!uid || typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SPEAKING_HISTORY_KEY(uid));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(0, SPEAKING_HISTORY_MAX) : [];
  } catch { return []; }
}

export function pushSpeakingHistory(uid: string | undefined, correct: number, total: number) {
  if (!uid || typeof window === 'undefined') return;
  try {
    const prev = readSpeakingHistory(uid);
    const next: SpeakingHistoryEntry[] = [
      { id: `sp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: Date.now(), correct, total },
      ...prev,
    ].slice(0, SPEAKING_HISTORY_MAX);
    localStorage.setItem(SPEAKING_HISTORY_KEY(uid), JSON.stringify(next));
  } catch { /* localStorage 满/禁用,忽略 */ }
}

function startOfToday() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const zero7 = () => [0, 0, 0, 0, 0, 0, 0];
const EMPTY_STATS: PracticeStats = {
  listening: { total: 0, today: 0, doneToday: false },
  dictation: { total: 0, correct: 0, accuracy: 0, today: 0, doneToday: false },
  writing:   { total: 0, today: 0, doneToday: false },
  typing:    { total: 0, bestWpm: 0, bestAcc: 0, today: 0, doneToday: false },
  modesDoneToday: 0,
  weekly: zero7(),
  weeklyByMode: { listening: zero7(), dictation: zero7(), writing: zero7(), typing: zero7() },
  streak: 0,
};

function bucketize(dates: number[]): number[] {
  const arr = zero7();
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const start = now.getTime() - 6 * 86400000;
  for (const ts of dates) {
    const idx = Math.floor((ts - start) / 86400000);
    if (idx >= 0 && idx < 7) arr[idx] += 1;
  }
  return arr;
}


// 一次 db 查询 · 同时算 stats 和 recent
export async function readAll(uid: string | undefined, recentLimit = 20, lang: Lang = 'zh'): Promise<PracticeAggregate> {
  if (!uid) return { stats: EMPTY_STATS, recent: [] };

  const [dictRecs, writings, typings, typingMastery, writingTotal] = await Promise.all([
    db.dictationRecords.orderBy('date').reverse().limit(1000).toArray().catch(e => { console.error('[aggregate] dictationRecords.toArray failed', e); return []; }),
    db.writingHistory.orderBy('createdAt').reverse().limit(200).toArray().catch(e => { console.error('[aggregate] writingHistory.toArray failed', e); return []; }),
    db.typingPackProgress.orderBy('updatedAt').reverse().limit(30).toArray().catch(e => { console.error('[aggregate] typingPackProgress.toArray failed', e); return []; }),
    db.typingMastery.orderBy('updatedAt').reverse().limit(100).toArray().catch(e => { console.error('[aggregate] typingMastery.toArray failed', e); return []; }),
    db.writingHistory.count().catch(e => { console.error('[aggregate] writingHistory.count failed', e); return 0; }),
  ]);

  const todayStart = startOfToday();
  const spHist = readSpeakingHistory(uid);

  // ── STATS ──
  const dictCorrect = dictRecs.filter(r => r.correct).length;
  const dictToday = dictRecs.filter(r => r.date >= todayStart).length;
  const writeToday = writings.filter(w => w.createdAt >= todayStart).length;
  const spToday = spHist.filter(s => s.timestamp >= todayStart).length;

  const typingBestWpm = typings.reduce((m, t) => Math.max(m, t.bestWpm), 0);
  const typingBestAcc = typings.reduce((m, t) => Math.max(m, t.bestAccuracy), 0);
  const typingLastAt = typings.reduce((m, t) => Math.max(m, t.updatedAt), 0);
  // 打字今日=完成过主题包 OR mid-session 答对过任何一题(mastery 每题答对/错都会 put)
  const typingDoneToday = typings.some(t => t.updatedAt >= todayStart)
    || typingMastery.some(m => m.updatedAt >= todayStart);
  const typingToday = typings.filter(t => t.updatedAt >= todayStart).length;

  const spDone = spToday > 0;
  const dictDone = dictToday > 0;
  const writeDone = writeToday > 0;
  const modesDoneToday = (spDone ? 1 : 0) + (dictDone ? 1 : 0) + (writeDone ? 1 : 0) + (typingDoneToday ? 1 : 0);

  const weeklyListening = bucketize(spHist.map(s => s.timestamp));
  const weeklyDictation = bucketize(dictRecs.map(r => r.date));
  const weeklyWriting   = bucketize(writings.map(w => w.createdAt));
  const weeklyTyping    = bucketize(typings.map(t => t.updatedAt));
  const weekly = weeklyListening.map((v, i) => v + weeklyDictation[i] + weeklyWriting[i] + weeklyTyping[i]);

  // streak · 从 gamification profile 取真实连续天数（7 天滚动窗口只够 sparkbar）
  let streak = 0;
  try {
    const profile = await getProfile();
    streak = profile.streak ?? 0;
  } catch {
    // 兜底：拿不到 profile 时仍用 7 天窗口估算
    if (weekly[6] > 0) {
      streak = 1;
      for (let i = 5; i >= 0; i--) {
        if (weekly[i] > 0) streak += 1; else break;
      }
    }
  }

  const stats: PracticeStats = {
    listening: { total: spHist.length, today: spToday, lastAt: spHist[0]?.timestamp, doneToday: spDone },
    dictation: {
      total: dictRecs.length,
      correct: dictCorrect,
      accuracy: dictRecs.length ? Math.round(dictCorrect / dictRecs.length * 100) : 0,
      today: dictToday,
      lastAt: dictRecs[0]?.date,
      doneToday: dictDone,
    },
    writing: { total: writingTotal, today: writeToday, lastAt: writings[0]?.createdAt, doneToday: writeDone },
    typing:  {
      total: typings.reduce((sum, t) => sum + (t.practiceCount || 0), 0),
      bestWpm: typingBestWpm,
      bestAcc: typingBestAcc,
      today: typingToday,
      lastAt: typingLastAt || undefined,
      doneToday: typingDoneToday,
    },
    modesDoneToday,
    weekly,
    weeklyByMode: {
      listening: weeklyListening,
      dictation: weeklyDictation,
      writing:   weeklyWriting,
      typing:    weeklyTyping,
    },
    streak,
  };

  // ── RECENT ──
  const rows: PracticeRow[] = [];

  // 默写按天聚合(单条 record 只是"某单词某次")
  const dictByDay = new Map<string, { correct: number; total: number; ts: number }>();
  for (const r of dictRecs.slice(0, 200)) {
    const day = new Date(r.date).toISOString().slice(0, 10);
    const cur = dictByDay.get(day) ?? { correct: 0, total: 0, ts: r.date };
    cur.total += 1;
    if (r.correct) cur.correct += 1;
    cur.ts = Math.max(cur.ts, r.date);
    dictByDay.set(day, cur);
  }
  for (const [day, v] of dictByDay) {
    const pct = v.total ? Math.round(v.correct / v.total * 100) : 0;
    rows.push({
      id: `d-${day}`,
      mode: 'dictation',
      timestamp: v.ts,
      scoreText: `${pct}`,
      meta: `${t('prac.mode_dictation', lang)} · ${v.correct}/${v.total} ${t('prac.meta_correct', lang)}`,
      href: '/dictation',
    });
  }

  // 写作每篇一条(score 是原始字符串,不做数值加工)
  for (const w of writings.slice(0, 60)) {
    rows.push({
      id: `w-${w.id}`,
      mode: 'writing',
      timestamp: w.createdAt,
      scoreText: w.score || '–',
      meta: `${t('prac.mode_writing', lang)} · ${w.modeLabel}`,
      href: '/writing',
    });
  }

  // 打字每个主题包一条
  for (const tp of typings) {
    rows.push({
      id: `t-${tp.id}`,
      mode: 'typing',
      timestamp: tp.updatedAt,
      scoreText: `WPM ${tp.bestWpm}`,
      meta: `${t('prac.mode_typing', lang)} · ${tp.id}`,
      href: '/typing',
    });
  }

  // 听说从 localStorage
  for (const s of spHist) {
    const pct = s.total ? Math.round(s.correct / s.total * 100) : 0;
    rows.push({
      id: s.id,
      mode: 'listening',
      timestamp: s.timestamp,
      scoreText: `${pct}`,
      meta: `${t('prac.mode_listening', lang)} · ${s.correct}/${s.total} ${t('prac.meta_hit', lang)}`,
      href: '/speaking',
    });
  }

  rows.sort((a, b) => b.timestamp - a.timestamp);
  return { stats, recent: rows.slice(0, recentLimit) };
}

// 兼容旧接口,内部走 readAll(仅在需要时用)
export async function readStats(uid: string | undefined, lang: Lang = 'zh'): Promise<PracticeStats> {
  return (await readAll(uid, 20, lang)).stats;
}
export async function readRecent(uid: string | undefined, limit = 20, lang: Lang = 'zh'): Promise<PracticeRow[]> {
  return (await readAll(uid, limit, lang)).recent;
}

export function fmtTime(ts?: number, lang: Lang = 'zh'): string {
  if (!ts) return '–';
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${t('prac.time_today', lang)} ${hh}:${mm}`;
  }
  const diffDays = Math.floor((now.getTime() - ts) / 86400000);
  if (diffDays < 7) return t('prac.time_days_ago', lang, { n: diffDays });
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
