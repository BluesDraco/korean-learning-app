import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function PATCH(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }

  let body: { nickname?: string; avatarUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const updates: string[] = [];
  const args: (string | number)[] = [];

  if (typeof body.nickname === 'string') {
    const nickname = body.nickname.trim();
    if (nickname.length === 0 || nickname.length > 20) {
      return NextResponse.json({ error: '昵称长度需在 1-20 字符之间' }, { status: 400, headers: NO_STORE });
    }
    updates.push('nickname = ?');
    args.push(nickname);
  }

  if (typeof body.avatarUrl === 'string') {
    // 只接受本站上传接口返回的头像路径（见 /api/user/avatar），空串表示清除头像。
    // 拒绝任意外链/伪协议，防止存储型 XSS 或外部追踪。
    const avatarUrl = body.avatarUrl;
    if (avatarUrl !== '' && !avatarUrl.startsWith('/api/user/avatar/')) {
      return NextResponse.json({ error: '头像地址不合法' }, { status: 400, headers: NO_STORE });
    }
    updates.push('avatar_url = ?');
    args.push(avatarUrl);
  }

  updates.push('updated_at = ?');
  args.push(Date.now());
  args.push(auth.userId);

  const db = await getDb();
  // 插值仅拼接 "col = ?" 片段（列名代码内固定），实际值走 args，无注入风险
  // eslint-disable-next-line no-restricted-syntax
  await db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, args);

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
