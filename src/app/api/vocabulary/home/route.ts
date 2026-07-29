import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 一次 SQL 聚合首屏所需的全部数据：
// - 单词统计（total / mastered / learning / dueReview）
// - 单词本列表（id/name/color/word_ids 数量）
// - 用户每日目标（dailyGoalWords）
// 替代原先并发 6 个 /api/user-data 请求，将 RTT 从 ~6 次压成 1 次。

// 6-26 事故兜底：用户私人数据 API 必须 force-dynamic + private no-store
export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });

  try {
    const db = await getDb();
    const userId = auth.userId;
    const now = Date.now();

    const [statsRes, booksRes, profileRes] = await Promise.all([
      db.exec(
        `SELECT
           COUNT(*) AS total,
           SUM(CASE WHEN mastery = 'mastered' THEN 1 ELSE 0 END) AS mastered,
           SUM(CASE WHEN mastery IN ('learning','reviewing') THEN 1 ELSE 0 END) AS learning,
           SUM(CASE WHEN next_review <= ? AND mastery != 'mastered' THEN 1 ELSE 0 END) AS due_review
         FROM user_words WHERE user_id = ?`,
        [now, userId],
      ),
      db.exec(
        `SELECT id, name, color, word_ids, created_at, updated_at
         FROM word_books WHERE user_id = ? ORDER BY updated_at DESC`,
        [userId],
      ),
      db.exec(
        `SELECT daily_goal_words FROM user_profiles WHERE user_id = ? LIMIT 1`,
        [userId],
      ),
    ]);

    const statsRow = statsRes[0]?.values[0] ?? [0, 0, 0, 0];
    const total = Number(statsRow[0] ?? 0);
    const mastered = Number(statsRow[1] ?? 0);
    const learning = Number(statsRow[2] ?? 0);
    const dueReview = Number(statsRow[3] ?? 0);
    const newWords = Math.max(0, total - mastered - learning);

    const books = (booksRes[0]?.values ?? []).map((row: unknown[]) => {
      let wordIds: string[] = [];
      try { wordIds = row[3] == null ? [] : JSON.parse(String(row[3])); } catch { wordIds = []; }
      return {
        id: String(row[0]),
        name: String(row[1] ?? ''),
        color: row[2] == null ? null : String(row[2]),
        wordIds,
        createdAt: Number(row[4] ?? 0),
        updatedAt: Number(row[5] ?? 0),
      };
    });

    const dailyGoalWords = Number(profileRes[0]?.values[0]?.[0] ?? 20);

    return NextResponse.json({
      stats: { total, mastered, learning, newWords, dueReview },
      books,
      dailyGoalWords,
    }, { headers: NO_STORE });
  } catch (err) {
    console.error('[vocabulary/home]', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500, headers: NO_STORE });
  }
}
