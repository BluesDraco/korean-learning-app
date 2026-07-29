import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { generateAnimalReply } from '@/lib/server/blog';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const ENDPOINT = 'blog-comment-reply';

// POST { slug } — 用户在 NPC 帖下评论后，前端并发触发本端点生成动物回复。
// 服务端调 DeepSeek 生成针对性韩语回应（失败回落静态安全池，见 generateAnimalReply）。
// 回复以短延迟揭晓，前端靠既有轮询发现，故这里只返回 { ok }，不回内容。
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }

  let body: { slug?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers: NO_STORE });
  }
  const slug = typeof body.slug === 'string' ? body.slug : '';
  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400, headers: NO_STORE });
  }

  // 超限不报错：skipAi=true 让 generateAnimalReply 直接回落静态池，用户仍有回应。
  const rl = await checkAiRateLimit(auth.userId, ENDPOINT);

  try {
    await generateAnimalReply(auth.userId, slug, !rl.allowed);
    if (rl.allowed) await recordAiUsage(auth.userId, ENDPOINT);
  } catch {
    // generateAnimalReply 内部已兜底静态池；万一整体抛错也不阻断，静默即可
  }
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
