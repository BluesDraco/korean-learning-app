import { NextResponse } from 'next/server';
import { getAuthFromCookie, assertActiveUser } from '@/lib/server/auth';
import { getUserComments, addUserComment } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

// 每用户私有的评论，绝不能被 CDN/代理跨用户缓存（同 6-26 串号事故门类）
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET ?slug= — 当前用户在该帖下已揭晓的评论/回复（未登录返回空）
export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ items: [] }, { headers: NO_STORE });
  }
  const slug = new URL(req.url).searchParams.get('slug') ?? '';
  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400, headers: NO_STORE });
  }
  const items = await getUserComments(auth.userId, slug);
  return NextResponse.json({ items }, { headers: NO_STORE });
}

// POST — 在 NPC 帖下发一条评论。body: { slug, text }。返回刚写的用户评论（立即回显）
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }
  if (!(await assertActiveUser(auth.userId))) {
    return NextResponse.json({ error: '账号状态异常，无法评论' }, { status: 403, headers: NO_STORE });
  }

  let body: { slug?: unknown; text?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers: NO_STORE });
  }

  const slug = typeof body.slug === 'string' ? body.slug : '';
  const text = typeof body.text === 'string' ? body.text : '';
  if (!slug || !text.trim()) {
    return NextResponse.json({ error: 'slug/text required' }, { status: 400, headers: NO_STORE });
  }

  try {
    const item = await addUserComment(auth.userId, slug, text);
    return NextResponse.json({ item }, { headers: NO_STORE });
  } catch (e) {
    if (e instanceof Error && e.message === 'POST_NOT_VISIBLE') {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers: NO_STORE });
    }
    if (e instanceof Error && e.message === 'EMPTY_COMMENT') {
      return NextResponse.json({ error: 'empty' }, { status: 400, headers: NO_STORE });
    }
    if (e instanceof Error && e.message.startsWith('BLOCKED:')) {
      return NextResponse.json({ error: e.message.slice('BLOCKED:'.length) }, { status: 400, headers: NO_STORE });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: NO_STORE });
  }
}
