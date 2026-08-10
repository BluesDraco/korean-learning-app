// 电台本地状态（收藏 / 打卡）——纯客户端 localStorage，无音频依赖。
// 收藏存 RadioCard 快照，这样首页즐겨찾기可跨 Day 渲染卡片而不额外请求。
import type { RadioCard } from '@/types';

const FAV_KEY = 'radio-favorites';
const STREAK_KEY = 'radio-streak';
const PROGRESS_KEY = 'radio-progress'; // { [episodeId]: 秒 } 断点续播
const LISTENED_KEY = 'radio-listened'; // string[] 听过（播到≥90%或播完）的 episodeId

// 收听模式：实时编成(按钟点解锁) / 自由收听(全解锁)。首次进电台由 PlaceIntro 选。
export const MODE_KEY = 'radio_broadcast_mode';
export type BroadcastMode = 'live' | 'free';

export interface RadioStreak {
  [k: string]: unknown;
  dates: string[]; // YYYY-MM-DD，已打卡日期
  currentStreak: number;
  longestStreak: number;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

// 本地日期 YYYY-MM-DD（不用 toISOString，避免 UTC 偏移）
export function todayStr(d = new Date()): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ── 收藏 ──────────────────────────────────────────────
export function getFavorites(): RadioCard[] {
  return readJSON<RadioCard[]>(FAV_KEY, []);
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.id === id);
}

// 切换收藏，返回切换后是否已收藏
export function toggleFavorite(card: RadioCard): boolean {
  const list = getFavorites();
  const idx = list.findIndex((f) => f.id === card.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    writeJSON(FAV_KEY, list);
    return false;
  }
  list.unshift(card);
  writeJSON(FAV_KEY, list);
  return true;
}

// ── 打卡 ──────────────────────────────────────────────
export function getStreak(): RadioStreak {
  return readJSON<RadioStreak>(STREAK_KEY, {
    dates: [],
    currentStreak: 0,
    longestStreak: 0,
  });
}

// 从日期集合算"到今天为止的连续天数"
function computeCurrentStreak(dateSet: Set<string>): number {
  let streak = 0;
  const cursor = new Date();
  // 今天没打卡则从昨天起算（连续未断）
  if (!dateSet.has(todayStr(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (dateSet.has(todayStr(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// 打开/收听任意一期即记今天为打卡日，返回更新后的 streak
export function markListenedToday(): RadioStreak {
  const s = getStreak();
  const today = todayStr();
  if (!s.dates.includes(today)) s.dates.push(today);
  const set = new Set(s.dates);
  s.currentStreak = computeCurrentStreak(set);
  s.longestStreak = Math.max(s.longestStreak, s.currentStreak);
  writeJSON(STREAK_KEY, s);
  return s;
}

// ── 断点续播（每期记住播放到第几秒）──────────────────────
type ProgressMap = Record<string, number>;

export function getResumePosition(id: string): number {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  const t = map[id];
  return typeof t === 'number' && t > 0 ? t : 0;
}

// 存播放位置：太靠开头(<3s)或太靠结尾(距末尾<5s)都清掉，避免"续播到几乎播完"
export function saveResumePosition(id: string, current: number, duration: number): void {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  if (current < 3 || (duration > 0 && current > duration - 5)) {
    delete map[id];
  } else {
    map[id] = Math.floor(current);
  }
  writeJSON(PROGRESS_KEY, map);
}

export function clearResumePosition(id: string): void {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  if (id in map) {
    delete map[id];
    writeJSON(PROGRESS_KEY, map);
  }
}

// ── 听过标记（播到 ≥90% 或播完）──────────────────────────
export function getListenedSet(): Set<string> {
  return new Set(readJSON<string[]>(LISTENED_KEY, []));
}

export function isListened(id: string): boolean {
  return getListenedSet().has(id);
}

export function markEpisodeListened(id: string): void {
  const list = readJSON<string[]>(LISTENED_KEY, []);
  if (!list.includes(id)) {
    list.push(id);
    writeJSON(LISTENED_KEY, list);
  }
}
