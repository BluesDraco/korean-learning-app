import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!token || token.length < 8) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
  }

  const db = await getDb();

  // Look up share link
  const linkResult = await db.exec(
    `SELECT user_id, expires_at, is_active FROM user_share_links WHERE token = ?`,
    [token]
  );
  const linkRow = linkResult[0]?.values[0];
  if (!linkRow || !linkRow[2]) {
    return NextResponse.json({ error: 'Link not found or inactive' }, { status: 404 });
  }

  const userId = linkRow[0] as string;
  const expiresAt = linkRow[1] as number | null;
  if (expiresAt && Date.now() > expiresAt) {
    return NextResponse.json({ error: 'Link expired' }, { status: 410 });
  }

  // Fetch user profile
  const profileResult = await db.exec(
    `SELECT nickname, xp, level, streak, longest_streak, created_at, is_ambassador, ambassador_since, share_enabled
     FROM user_profiles WHERE user_id = ?`,
    [userId]
  );
  const profileRow = profileResult[0]?.values[0];
  if (!profileRow || !profileRow[8]) {
    return NextResponse.json({ error: 'Profile not found or not public' }, { status: 404 });
  }

  // Fetch word stats
  const wordResult = await db.exec(
    `SELECT COUNT(*) as total, SUM(CASE WHEN mastery = 'mastered' THEN 1 ELSE 0 END) as mastered
     FROM user_words WHERE user_id = ?`,
    [userId]
  );
  const wordStats = wordResult[0]?.values[0] || [0, 0];

  // Fetch review count
  const reviewResult = await db.exec(
    `SELECT COUNT(*) FROM review_sessions WHERE user_id = ?`,
    [userId]
  );
  const reviewCount = reviewResult[0]?.values[0]?.[0] || 0;

  // Fetch daily logs count
  const daysResult = await db.exec(
    `SELECT COUNT(*) FROM daily_logs WHERE user_id = ?`,
    [userId]
  );
  const studyDays = daysResult[0]?.values[0]?.[0] || 0;

  // Fetch AI chat count
  const chatResult = await db.exec(
    `SELECT COUNT(*) FROM study_logs WHERE user_id = ? AND action = 'ai_chat'`,
    [userId]
  );
  const chatCount = chatResult[0]?.values[0]?.[0] || 0;

  // Fetch top words (most reviewed)
  const topWordsResult = await db.exec(
    `SELECT word, mastery, srs_level FROM user_words WHERE user_id = ? AND last_reviewed IS NOT NULL
     ORDER BY srs_level DESC LIMIT 30`,
    [userId]
  );
  const topWords = (topWordsResult[0]?.values || []).map((r: unknown[]) => ({
    word: r[0] as string,
    weight: (r[2] as number) || 1,
  }));

  // Fetch completed picture books
  const booksResult = await db.exec(
    `SELECT COUNT(*) FROM study_logs WHERE user_id = ? AND action = 'picture_book_complete'`,
    [userId]
  );
  const booksCount = booksResult[0]?.values[0]?.[0] || 0;

  return NextResponse.json({
    nickname: profileRow[0] as string,
    xp: profileRow[1] as number,
    level: profileRow[2] as number,
    streak: profileRow[3] as number,
    longestStreak: profileRow[4] as number,
    createdAt: profileRow[5] as number,
    isAmbassador: Boolean(profileRow[6]),
    totalWords: wordStats[0] as number,
    masteredWords: wordStats[1] as number,
    reviewCount,
    studyDays,
    chatCount,
    booksCount,
    topWords,
  });
}
