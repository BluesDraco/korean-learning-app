import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import { getCampaignConfig, type CampaignConfig, type CampaignTier } from '@/lib/server/invite';

// 含鉴权数据，禁止缓存
export const dynamic = 'force-dynamic';

const CONFIG_KEY = 'invite_campaign';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;
  const config = await getCampaignConfig();
  return NextResponse.json({ config });
}

// 清洗：tiers 每档 count/days 需正整数，按 count 升序；cap 非负整数
function sanitize(input: unknown): CampaignConfig | null {
  if (!input || typeof input !== 'object') return null;
  const raw = input as Partial<CampaignConfig>;
  if (!Array.isArray(raw.tiers) || raw.tiers.length === 0) return null;

  const tiers: CampaignTier[] = [];
  for (const t of raw.tiers) {
    const count = Number((t as CampaignTier)?.count);
    const days = Number((t as CampaignTier)?.days);
    if (!Number.isInteger(count) || count <= 0) return null;
    if (!Number.isInteger(days) || days <= 0) return null;
    tiers.push({ count, days });
  }
  tiers.sort((a, b) => a.count - b.count);

  const cap = Number(raw.cap);
  return {
    enabled: raw.enabled !== false,
    tiers,
    cap: Number.isInteger(cap) && cap >= 0 ? cap : 0,
  };
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: { config?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const clean = sanitize(body.config);
  if (!clean) return NextResponse.json({ error: '配置格式非法（tiers 需含正整数 count/days）' }, { status: 400 });

  const db = await getDb();
  await db.run(
    `INSERT INTO app_config (key, value, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [CONFIG_KEY, JSON.stringify(clean), Date.now()],
  );

  return NextResponse.json({ ok: true, config: clean });
}
