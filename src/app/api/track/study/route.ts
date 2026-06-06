import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ success: false }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const { action, details, xpEarned } = body;

    const db = await getDb();
    await db.run(
      `INSERT INTO study_logs (id, user_id, action, details, xp_earned, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [generateId(), auth.userId, String(action || 'study').slice(0, 100), String(details || '').slice(0, 500), Number(xpEarned) || 0, Date.now()]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
