import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { setBlogReaction } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

// POST — 点赞/收藏（需登录）。body: { postId, liked?, saved? }
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  let body: { postId?: unknown; liked?: unknown; saved?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers: NO_STORE });
  }

  const postId = typeof body.postId === 'string' ? body.postId : '';
  if (!postId) {
    return NextResponse.json({ error: 'postId required' }, { status: 400, headers: NO_STORE });
  }

  const patch: { liked?: boolean; saved?: boolean } = {};
  if (typeof body.liked === 'boolean') patch.liked = body.liked;
  if (typeof body.saved === 'boolean') patch.saved = body.saved;

  try {
    const result = await setBlogReaction(auth.userId, postId, patch);
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    if (e instanceof Error && e.message === 'POST_NOT_VISIBLE') {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers: NO_STORE });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: NO_STORE });
  }
}
