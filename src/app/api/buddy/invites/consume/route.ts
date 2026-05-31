import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { inviteToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { inviteToken } = body;
  if (!inviteToken || typeof inviteToken !== 'string') {
    return NextResponse.json({ error: 'Missing inviteToken' }, { status: 400 });
  }

  const db = await getDb();

  // Look up the invite
  const invResult = await db.exec(
    'SELECT id, user_id, invite_token, expires_at FROM buddy_invites WHERE invite_token = ?',
    [inviteToken],
  );
  if (invResult.length === 0 || invResult[0].values.length === 0) {
    return NextResponse.json({ error: '邀请不存在或已失效' }, { status: 404 });
  }

  const [inviteId, inviterId, _token, expiresAt] = invResult[0].values[0] as [string, string, string, number | null];

  // Can't buddy yourself
  if (inviterId === auth.userId) {
    return NextResponse.json({ error: '不能添加自己为学习搭子' }, { status: 400 });
  }

  // Check expiry
  if (expiresAt && Date.now() > expiresAt) {
    return NextResponse.json({ error: '邀请已过期' }, { status: 410 });
  }

  // Check if already buddies
  const relResult = await db.exec(
    `SELECT id FROM buddy_relations
     WHERE (user_a_id = ? AND user_b_id = ?) OR (user_a_id = ? AND user_b_id = ?)`,
    [auth.userId, inviterId, inviterId, auth.userId],
  );
  if (relResult.length > 0 && relResult[0].values.length > 0) {
    return NextResponse.json({ error: '你们已经是学习搭子了' }, { status: 409 });
  }

  // Create buddy relation
  const relationId = generateId();
  const now = Date.now();
  await db.run(
    'INSERT INTO buddy_relations (id, user_a_id, user_b_id, status, created_at) VALUES (?, ?, ?, ?, ?)',
    [relationId, inviterId, auth.userId, 'active', now],
  );

  // Delete the invite (consumed)
  await db.run('DELETE FROM buddy_invites WHERE id = ?', [inviteId]);

  return NextResponse.json({ ok: true, buddyId: inviterId });
}
