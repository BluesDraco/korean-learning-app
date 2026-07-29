import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { filterContent } from '@/lib/contentFilter';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { path: pagePath, type, message } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: '反馈内容不能为空' }, { status: 400 });
  }
  if (message.length > 500) {
    return NextResponse.json({ error: '反馈内容不能超过500个字符' }, { status: 400 });
  }
  const feedbackCheck = filterContent(message, 'user_content');
  if (!feedbackCheck.ok) {
    return NextResponse.json({ error: feedbackCheck.reason }, { status: 400 });
  }

  const auth = await getAuthFromCookie();
  const db = await getDb();

  await db.run(
    `INSERT INTO feedbacks (id, user_id, path, type, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
    [generateId(), auth?.userId || null, pagePath || '', type || 'content_error', message.trim(), Date.now()]
  );

  return NextResponse.json({ success: true });
}
