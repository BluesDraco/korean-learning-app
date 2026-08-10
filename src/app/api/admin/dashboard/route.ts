import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { scopedDashboard } from '@/lib/server/adminStats';
import type { AdminScope } from '@/types/admin';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

function parseScope(v: string | null): AdminScope {
  return v === 'overseas' || v === 'combined' ? v : 'domestic';
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const scope = parseScope(new URL(request.url).searchParams.get('scope'));
  const response = await scopedDashboard(scope);
  return NextResponse.json(response, { headers: { 'Cache-Control': 'private, no-store' } });
}
