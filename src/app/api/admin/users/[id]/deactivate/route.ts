import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { deactivateUser } from '@/lib/server/account';

// 含鉴权/破坏性操作，禁缓存
export const dynamic = 'force-dynamic';

// POST — 注销账号（软删除 + 匿名化）。body: { confirm: true }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { id } = await params;
  if (admin.userId === id) {
    return NextResponse.json({ error: '不能注销自己的账号' }, { status: 403 });
  }

  let body: { confirm?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
  if (body.confirm !== true) {
    return NextResponse.json({ error: '需二次确认' }, { status: 400 });
  }

  const operator = typeof admin.username === 'string' ? admin.username : 'admin';
  const res = await deactivateUser(id, operator);
  if (!res.ok) {
    const msg = res.reason === 'not_found' ? '用户不存在' : '账号已注销';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
