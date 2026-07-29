import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import { activateMembership, defaultAmount } from '@/lib/server/membership';
import { TIERS, type Tier } from '@/lib/membership-benefits';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

// ── 会员名单 + 各档人数统计 ──
export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const search = (searchParams.get('search') || '').trim();
  const tierFilter = searchParams.get('tier') || 'all';
  const expiring = searchParams.get('expiring') === '1'; // 7 天内到期的付费档
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));

  const db = await getDb();
  const now = Date.now();

  // 各档人数（付费档按未过期口径；过期的月度/年度不计入）
  const counts: Record<Tier, number> = { free: 0, monthly: 0, yearly: 0, lifetime: 0 };
  const countRows = await db.exec(
    `SELECT membership_type, membership_expiry, COUNT(*) FROM users GROUP BY membership_type, membership_expiry`,
  );
  for (const row of countRows[0]?.values ?? []) {
    const t = row[0];
    const exp = typeof row[1] === 'number' ? row[1] : null;
    const c = Number(row[2] ?? 0);
    const tier: Tier = isTier(t) ? t : 'free';
    const expired = tier !== 'lifetime' && tier !== 'free' && exp != null && exp < now;
    if (expired) counts.free += c;
    else counts[tier] += c;
  }

  // 名单查询
  const where: string[] = ['1=1'];
  const params: unknown[] = [];
  if (search) {
    where.push('(username LIKE ? OR nickname LIKE ? OR email LIKE ?)');
    const q = `%${search}%`;
    params.push(q, q, q);
  }
  if (isTier(tierFilter)) {
    where.push('membership_type = ?');
    params.push(tierFilter);
  }
  if (expiring) {
    // 月度/年度且到期时间在 now ~ now+7d 内（lifetime 无到期，不计）
    where.push(`membership_type IN ('monthly','yearly') AND membership_expiry IS NOT NULL AND membership_expiry >= ? AND membership_expiry <= ?`);
    params.push(now, now + 7 * 24 * 60 * 60 * 1000);
  }
  const whereClause = `WHERE ${where.join(' AND ')}`;

  const countResult = await db.exec(`SELECT COUNT(*) FROM users ${whereClause}`, params);
  const total = Number(countResult[0]?.values[0]?.[0] ?? 0);

  const offset = (page - 1) * pageSize;
  const rows = await db.exec(
    `SELECT id, username, nickname, email, membership_type, membership_expiry, created_at
     FROM users ${whereClause}
     ORDER BY (membership_type != 'free') DESC, membership_expiry DESC, created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset],
  );

  const members = (rows[0]?.values ?? []).map((r) => {
    const tier: Tier = isTier(r[4]) ? r[4] : 'free';
    const expiry = typeof r[5] === 'number' ? r[5] : null;
    const effectiveTier: Tier =
      tier !== 'free' && tier !== 'lifetime' && expiry != null && expiry < now ? 'free' : tier;
    return {
      id: r[0] as string,
      username: r[1] as string,
      nickname: (r[2] as string) || '',
      email: (r[3] as string) || '',
      tier,
      effectiveTier,
      expiry,
      createdAt: Number(r[6] ?? 0),
    };
  });

  return NextResponse.json({ counts, members, total, page, pageSize });
}

// ── 手动开通 / 调整会员 ──
// body: { userId, tier, amount?, note? }
// 写 users(membership_type/expiry) + orders 一条 source='manual'；lifetime 额外建履约行
export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: { userId?: unknown; tier?: unknown; amount?: unknown; note?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const userId = typeof body.userId === 'string' ? body.userId : '';
  const tier = body.tier;
  if (!userId || !isTier(tier)) {
    return NextResponse.json({ error: '缺少 userId 或 tier 非法' }, { status: 400 });
  }
  const note = typeof body.note === 'string' ? body.note.slice(0, 500) : '';

  const db = await getDb();

  // 用户存在校验
  const userRow = await db.exec('SELECT username FROM users WHERE id = ?', [userId]);
  const username = userRow[0]?.values[0]?.[0];
  if (typeof username !== 'string') {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  // 金额：未显式传则用档位默认价（促销价→常规价→0，分）
  const amount = typeof body.amount === 'number' && Number.isFinite(body.amount)
    ? Math.max(0, Math.round(body.amount))
    : defaultAmount(tier);

  // 后台开通=覆盖式（extendFromCurrent:false，调整即重算）；付费续费才延期
  const operator = typeof admin.username === 'string' ? admin.username : 'admin';
  const res = await activateMembership(userId, tier, {
    source: 'manual',
    amount,
    note,
    operator,
    extendFromCurrent: false,
  });

  return NextResponse.json({ ok: true, tier: res.tier, expiry: res.expiry });
}
