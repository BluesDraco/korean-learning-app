import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { ResolveFeedbackBody } from '@/types/admin';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const body: ResolveFeedbackBody = await request.json();

  if (!body.status || !['resolved', 'ignored'].includes(body.status)) {
    return NextResponse.json({ error: 'status 必须是 resolved 或 ignored' }, { status: 400 });
  }

  const db = await getDb();
  await db.run(
    `UPDATE feedbacks SET status = ? WHERE id = ?`,
    [body.status, id]
  );

  return NextResponse.json({
    id,
    status: body.status,
    resolvedAt: Date.now(),
    resolvedBy: adminCheck.username,
    note: body.note,
  });
}
