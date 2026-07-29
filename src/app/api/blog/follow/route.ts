import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogFollows, setBlogFollow } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 当前用户已关注的动物 id 列表（未登录返回空）
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ follows: [] }, { headers: NO_STORE });
  const follows = await getBlogFollows(auth.userId);
  return NextResponse.json({ follows }, { headers: NO_STORE });
}

// POST — 关注/取关切换（需登录）。body: { animalId, following }
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  let body: { animalId?: unknown; following?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers: NO_STORE });
  }

  const animalId = typeof body.animalId === 'string' ? body.animalId : '';
  const following = typeof body.following === 'boolean' ? body.following : undefined;
  if (!animalId || following === undefined) {
    return NextResponse.json({ error: 'animalId & following required' }, { status: 400, headers: NO_STORE });
  }

  try {
    const result = await setBlogFollow(auth.userId, animalId, following);
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    if (e instanceof Error && e.message === 'UNKNOWN_ANIMAL') {
      return NextResponse.json({ error: 'Unknown animal' }, { status: 400, headers: NO_STORE });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: NO_STORE });
  }
}
