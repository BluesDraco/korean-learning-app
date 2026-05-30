import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { ContentResponse, ContentModuleStats, FeedbackItem } from '@/types/admin';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  // Content module stats
  const moduleStats: ContentModuleStats[] = [
    { module: '语法库', icon: '📐', totalItems: 0, lastUpdated: 0 },
    { module: '词汇库', icon: '📖', totalItems: 0, lastUpdated: 0 },
    { module: '情景表达', icon: '💬', totalItems: 0, lastUpdated: 0 },
    { module: '文化知识', icon: '🎎', totalItems: 0, lastUpdated: 0 },
    { module: '阅读文章', icon: '📄', totalItems: 0, lastUpdated: 0 },
  ];

  // Query feedbacks with user info
  const fbResult = await db.exec(
    `SELECT f.id, f.user_id, f.path, f.type, f.message, f.status, f.created_at,
            u.username, u.nickname
     FROM feedbacks f
     LEFT JOIN users u ON f.user_id = u.id
     ORDER BY f.created_at DESC
     LIMIT 200`
  );

  const feedbacks: FeedbackItem[] = [];
  if (fbResult.length > 0) {
    for (const row of fbResult[0].values) {
      feedbacks.push({
        id: String(row[0]),
        userId: String(row[1] || ''),
        username: String(row[7] || row[8] || '匿名用户'),
        type: (row[3] as FeedbackItem['type']) || 'other',
        content: String(row[4] || ''),
        status: (row[5] as FeedbackItem['status']) || 'pending',
        createdAt: Number(row[6]) || 0,
      });
    }
  }

  const response: ContentResponse = {
    moduleStats,
    feedbacks,
    total: feedbacks.length,
  };

  return NextResponse.json(response);
}
