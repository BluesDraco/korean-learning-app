import { NextRequest, NextResponse } from 'next/server';
import { assertInternalCaller } from '@/lib/server/internalAuth';
import { computeRevenue } from '@/lib/server/adminStats';

// 兄弟站取数接口：服务间密钥鉴权（非用户 token）。上海站聚合「海外/综合」时调这里。
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!assertInternalCaller(request)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));
  const type = searchParams.get('type') || 'all';
  const statusParam = searchParams.get('status') || 'paid';
  const exportAll = searchParams.get('export') === '1';

  const data = await computeRevenue({ page, pageSize, type, statusParam, exportAll });
  return NextResponse.json(data, { headers: { 'Cache-Control': 'private, no-store' } });
}
