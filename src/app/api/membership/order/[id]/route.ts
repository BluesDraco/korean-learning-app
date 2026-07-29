import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 含用户订单数据，禁缓存
export const dynamic = 'force-dynamic';

// GET /api/membership/order/[id] → 收银台页轮询订单状态
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: '缺少订单号' }, { status: 400 });

  const db = await getDb();
  const rows = await db.exec(
    `SELECT id, user_id, tier, amount, status, paid_at FROM orders WHERE id = ?`,
    [id],
  );
  const row = rows[0]?.values[0];
  if (!row) return NextResponse.json({ error: '订单不存在' }, { status: 404 });

  // 只能查自己的订单
  if ((row[1] as string) !== auth.userId) {
    return NextResponse.json({ error: '无权查看' }, { status: 403 });
  }

  return NextResponse.json({
    id: row[0] as string,
    tier: row[2] as string,
    amount: Number(row[3] ?? 0),
    status: row[4] as string,
    paidAt: typeof row[5] === 'number' ? row[5] : null,
  });
}
