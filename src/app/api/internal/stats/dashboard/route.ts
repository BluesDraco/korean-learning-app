import { NextRequest, NextResponse } from 'next/server';
import { assertInternalCaller } from '@/lib/server/internalAuth';
import { computeDashboard } from '@/lib/server/adminStats';

// 兄弟站取数接口：服务间密钥鉴权（非用户 token）。上海站聚合「海外/综合」时调这里。
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!assertInternalCaller(request)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const data = await computeDashboard();
  return NextResponse.json(data, { headers: { 'Cache-Control': 'private, no-store' } });
}
