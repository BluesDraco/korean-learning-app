import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { path: pagePath, type, message } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: '反馈内容不能为空' }, { status: 400 });
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
