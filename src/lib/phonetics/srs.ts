// 音标错题本 + SRS 工具
// 复用 SM-2 算法（src/lib/srs.ts），但走独立的 phoneticMistakes / phoneticSrs 表
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import type { PhoneticMistake, PhoneticSrsItem } from '@/types';

const MASTERED_THRESHOLD = 2; // 错题本：同 session 内答对 2 次后置 resolved

// userId 过滤辅助：
// - 登录用户：拿自己的记录 + 无主（游客期）记录，保留登录前的错题积累
// - 游客：只拿无主记录，防止串号看到别人的错题
function byUser<T extends { userId?: string }>(items: T[], userId?: string): T[] {
  if (!userId) return items.filter(m => !m.userId);
  return items.filter(m => m.userId === userId || !m.userId);
}

// ─────────── 错题本 ───────────

/** quiz 答错时调用：同 (target,wrong,userId) 对幂等累加 wrong_count */
export async function recordPhoneticMistake(
  targetJamo: string,
  wrongJamo: string,
  stage: number,
  userId?: string,
): Promise<void> {
  const all = await db.phoneticMistakes.toArray().catch(() => [] as PhoneticMistake[]);
  const matched = byUser(all, userId).find(
    (m) => m.targetJamo === targetJamo && m.wrongJamo === wrongJamo
  );
  const now = Date.now();
  if (matched) {
    await db.phoneticMistakes.put({ ...matched, wrongCount: matched.wrongCount + 1, lastWrongAt: now, resolved: 0 });
  } else {
    await db.phoneticMistakes.put({
      id: crypto.randomUUID(),
      userId,
      targetJamo,
      wrongJamo,
      stage,
      wrongCount: 1,
      lastWrongAt: now,
      resolved: 0,
      createdAt: now,
    });
  }
}

/** 取当前用户所有未掌握的错题（resolved=0），按 wrong_count desc 排 */
export async function getDueMistakes(userId?: string): Promise<PhoneticMistake[]> {
  const all = await db.phoneticMistakes.toArray().catch(() => [] as PhoneticMistake[]);
  return byUser(all, userId).filter((m) => !m.resolved).sort((a, b) => b.wrongCount - a.wrongCount);
}

/** 错题本练习答对：记一次"连续答对"，超阈值标 resolved */
export async function markMistakePassed(id: string, consecutive: number, userId?: string): Promise<void> {
  const all = await db.phoneticMistakes.toArray();
  const item = byUser(all, userId).find((m) => m.id === id);
  if (!item) return;
  if (consecutive >= MASTERED_THRESHOLD) {
    await db.phoneticMistakes.put({ ...item, resolved: 1 });
  }
}

// ─────────── SRS ───────────

/** letter "我会了" 时调用：jamo 不存在则插入，初始 level=0, 1 天后复习 */
export async function ensurePhoneticSrs(jamo: string, stage: number, userId?: string): Promise<void> {
  const all = await db.phoneticSrs.toArray().catch(() => [] as PhoneticSrsItem[]);
  if (byUser(all, userId).find((s) => s.jamo === jamo)) return;
  const now = Date.now();
  await db.phoneticSrs.put({
    id: crypto.randomUUID(),
    userId,
    jamo,
    stage,
    srsLevel: 0,
    easeFactor: 2.5,
    interval: 1,
    nextReviewAt: now + 24 * 60 * 60 * 1000,
    seenCount: 0,
    correctCount: 0,
    wrongCount: 0,
    createdAt: now,
  });
}

/** SRS 复习答完：quality 0-5 → SM-2 更新 */
export async function updatePhoneticSrs(jamo: string, quality: number, userId?: string): Promise<void> {
  const all = await db.phoneticSrs.toArray().catch(() => [] as PhoneticSrsItem[]);
  const item = byUser(all, userId).find((s) => s.jamo === jamo);
  if (!item) return;
  const { srsLevel, easeFactor, interval, nextReview } = calculateSRS(
    quality,
    item.srsLevel,
    item.easeFactor,
    item.interval,
  );
  const isCorrect = quality >= 3;
  await db.phoneticSrs.put({
    ...item,
    srsLevel,
    easeFactor,
    interval,
    nextReviewAt: nextReview,
    seenCount: item.seenCount + 1,
    correctCount: item.correctCount + (isCorrect ? 1 : 0),
    wrongCount: item.wrongCount + (isCorrect ? 0 : 1),
  });
}

/** 拉到期的 SRS 条目（next_review_at <= now），按 next_review_at 升序 */
export async function getDueSrsItems(limit = 20, userId?: string): Promise<PhoneticSrsItem[]> {
  const now = Date.now();
  const all = await db.phoneticSrs.toArray().catch(() => [] as PhoneticSrsItem[]);
  return byUser(all, userId)
    .filter((s) => s.nextReviewAt <= now)
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
    .slice(0, limit);
}

/** 总览统计：未掌握错题数 + 到期 SRS 数 */
export async function getPracticeCounts(userId?: string): Promise<{ mistakes: number; due: number }> {
  const [mistakes, srs] = await Promise.all([
    db.phoneticMistakes.toArray().catch(() => [] as PhoneticMistake[]),
    db.phoneticSrs.toArray().catch(() => [] as PhoneticSrsItem[]),
  ]);
  const now = Date.now();
  return {
    mistakes: byUser(mistakes, userId).filter((m) => !m.resolved).length,
    due: byUser(srs, userId).filter((s) => s.nextReviewAt <= now).length,
  };
}
