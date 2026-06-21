import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const db = await getDb();
  const userId = auth.userId;
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayLogId = `log-${todayStart}`;

  const [
    dailyLogRes,
    courseWordsRes,
    dueCountRes,
    completeEventsRes,
    outputEventsRes,
    pronunciationRes,
    readingRes,
  ] = await Promise.all([
    db.exec(`SELECT words_reviewed FROM daily_logs WHERE id = ? AND user_id = ? LIMIT 1`, [todayLogId, userId]),
    db.exec(`SELECT source_detail FROM user_words WHERE user_id = ? AND source = 'course'`, [userId]),
    db.exec(`SELECT COUNT(*) as cnt FROM user_words WHERE user_id = ? AND next_review <= ?`, [userId, now]),
    db.exec(`SELECT day_num, timestamp FROM learning_events WHERE user_id = ? AND action = 'complete'`, [userId]),
    db.exec(`SELECT timestamp FROM learning_events WHERE user_id = ? AND action = 'output'`, [userId]),
    db.exec(`SELECT COUNT(*) as cnt FROM user_pronunciation_attempts WHERE user_id = ? AND created_at > ?`, [userId, todayStart]),
    db.exec(`SELECT COUNT(*) as cnt FROM article_learning_events WHERE user_id = ? AND created_at > ?`, [userId, todayStart]),
  ]);

  function col(res: { columns: string[]; values: unknown[][] }[], name: string, rowIdx = 0): unknown {
    const r = res[0];
    if (!r || !r.values[rowIdx]) return null;
    const ci = r.columns.indexOf(name);
    return ci >= 0 ? r.values[rowIdx][ci] : null;
  }

  function rows(res: { columns: string[]; values: unknown[][] }[]): Record<string, unknown>[] {
    const r = res[0];
    if (!r) return [];
    return r.values.map(row =>
      Object.fromEntries(r.columns.map((c, i) => [c, row[i]]))
    );
  }

  const wordsReviewed = (col(dailyLogRes, 'words_reviewed') as number) ?? 0;
  const dueCount = (col(dueCountRes, 'cnt') as number) ?? 0;
  const pronunciationCount = (col(pronunciationRes, 'cnt') as number) ?? 0;
  const readingCount = (col(readingRes, 'cnt') as number) ?? 0;

  const courseWords = rows(courseWordsRes).map(r => ({
    sourceDetail: (r.source_detail as string | null) ?? null,
  }));

  const completeEvents = rows(completeEventsRes).map(r => ({
    dayNum: r.day_num as number | null,
    timestamp: r.timestamp as number,
  }));

  const outputEvents = rows(outputEventsRes).map(r => ({
    timestamp: r.timestamp as number,
  }));

  return NextResponse.json({
    wordsReviewed,
    dueCount,
    pronunciationCount,
    readingCount,
    courseWords,
    completeEvents,
    outputEvents,
    todayStart,
  });
}
