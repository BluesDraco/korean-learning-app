import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

const PERK_STATUSES = ['pending', 'in_progress', 'done'] as const;
type PerkStatus = (typeof PERK_STATUSES)[number];
function isStatus(v: unknown): v is PerkStatus {
  return typeof v === 'string' && (PERK_STATUSES as readonly string[]).includes(v);
}

// ── 永久档履约清单 ──
export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status') || 'all';

  const db = await getDb();
  const where: string[] = ['1=1'];
  const params: unknown[] = [];
  if (isStatus(statusFilter)) {
    where.push('p.status = ?');
    params.push(statusFilter);
  }

  const rows = await db.exec(
    `SELECT p.id, p.user_id, u.username, u.nickname, p.perk_type, p.status, p.detail, p.created_at, p.updated_at
     FROM lifetime_perks p LEFT JOIN users u ON u.id = p.user_id
     WHERE ${where.join(' AND ')}
     ORDER BY (p.status = 'done') ASC, p.created_at DESC`,
    params,
  );

  const perks = (rows[0]?.values ?? []).map((r) => ({
    id: r[0] as string,
    userId: r[1] as string,
    username: (r[2] as string) || '(已注销)',
    nickname: (r[3] as string) || '',
    perkType: r[4] as string,
    status: r[5] as string,
    detail: (r[6] as string) || '',
    createdAt: Number(r[7] ?? 0),
    updatedAt: Number(r[8] ?? 0),
  }));

  return NextResponse.json({ perks });
}

// ── 更新履约状态 / 备注 ──
// body: { id, status?, detail? }
export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: { id?: unknown; status?: unknown; detail?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id : '';
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });

  const sets: string[] = [];
  const params: unknown[] = [];
  if (isStatus(body.status)) { sets.push('status = ?'); params.push(body.status); }
  if (typeof body.detail === 'string') { sets.push('detail = ?'); params.push(body.detail.slice(0, 1000)); }
  if (sets.length === 0) return NextResponse.json({ error: '无可更新字段' }, { status: 400 });

  sets.push('updated_at = ?');
  params.push(Date.now(), id);

  const db = await getDb();
  const res = await db.run(`UPDATE lifetime_perks SET ${sets.join(', ')} WHERE id = ?`, params);
  if (res.rowsAffected === 0) return NextResponse.json({ error: '记录不存在' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
