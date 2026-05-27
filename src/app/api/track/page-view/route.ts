import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';

export async function POST(request: Request) {
  const auth = await getAuthFromCookie();
  const body = await request.json();
  const { path: pagePath, referrer, userAgent } = body;

  const db = await getDb();
  await db.run(
    `INSERT INTO page_views (id, user_id, path, referrer, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [generateId(), auth?.userId || null, pagePath || '', referrer || '', userAgent || '', Date.now()]
  );

  return NextResponse.json({ success: true });
}
