import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { ContentResponse, ContentModuleStats, FeedbackItem } from '@/types/admin';
import { grammarPoints } from '@/data/grammar';
import { themePacks } from '@/data/vocabulary/themes';
import { idioms, slangs, loanwords } from '@/data/expressions';
import { readingArticles } from '@/data/reading-new';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  // Content module stats — 真实条数（数据文件长度）
  const moduleStats: ContentModuleStats[] = [
    { module: '语法库', icon: '📐', totalItems: grammarPoints.length },
    { module: '词汇主题', icon: '📖', totalItems: themePacks.length },
    { module: '情景表达', icon: '💬', totalItems: idioms.length + slangs.length + loanwords.length },
    { module: '阅读文章', icon: '📄', totalItems: readingArticles.length },
  ];

  // 状态筛选：pending/resolved/ignored/all
  const feedbackStatus = new URL(request.url).searchParams.get('feedbackStatus') || 'all';
  const statusWhere = ['pending', 'resolved', 'ignored'].includes(feedbackStatus)
    ? 'WHERE f.status = ?'
    : '';
  const statusParams = statusWhere ? [feedbackStatus] : [];

  // Query feedbacks with user info
  const fbResult = await db.exec(
    `SELECT f.id, f.user_id, f.path, f.type, f.message, f.status, f.created_at,
            u.username, u.nickname
     FROM feedbacks f
     LEFT JOIN users u ON f.user_id = u.id
     ${statusWhere}
     ORDER BY f.created_at DESC
     LIMIT 200`,
    statusParams
  );

  const feedbacks: FeedbackItem[] = [];
  if (fbResult.length > 0) {
    for (const row of fbResult[0].values) {
      feedbacks.push({
        id: String(row[0]),
        userId: String(row[1] || ''),
        username: String(row[8] || row[7] || '匿名用户'),
        type: (row[3] as FeedbackItem['type']) || 'other',
        content: String(row[4] || ''),
        path: String(row[2] || ''),
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
