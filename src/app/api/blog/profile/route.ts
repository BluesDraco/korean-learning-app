import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogUserStats, setBlogProfile, getUserCurrentDay } from '@/lib/server/blog';
import { getBlogAvatar } from '@/data/blogAvatars';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 当前用户的博客档案（形象/昵称/经验）。未设置返回 null。
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }
  const stats = await getBlogUserStats(auth.userId);
  const currentDay = await getUserCurrentDay(auth.userId);
  return NextResponse.json({ stats, currentDay }, { headers: NO_STORE });
}

// POST — 选形象 + 设昵称。body: { animalId, nickname }
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  let body: { animalId?: unknown; nickname?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers: NO_STORE });
  }

  const animalId = typeof body.animalId === 'string' ? body.animalId : '';
  const nickname = typeof body.nickname === 'string' ? body.nickname.trim() : '';

  if (!getBlogAvatar(animalId)) {
    return NextResponse.json({ error: '형상을 선택해 주세요' }, { status: 400, headers: NO_STORE });
  }
  if (!nickname || nickname.length > 20) {
    return NextResponse.json({ error: '닉네임을 확인해 주세요' }, { status: 400, headers: NO_STORE });
  }

  const stats = await setBlogProfile(auth.userId, animalId, nickname);
  return NextResponse.json({ stats }, { headers: NO_STORE });
}
