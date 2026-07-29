import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { recognize } from '@/lib/server/aliyunNls';

// 含鉴权/用户数据，禁缓存
export const dynamic = 'force-dynamic';
export const maxDuration = 20;

const MAX_BYTES = 2 * 1024 * 1024; // 2MB
// ASR 不做功能性限流：实时语音每轮必紧跟一次 /api/ai/realtime-chat，由后者的 realtime_chat 额度把关。
// 这里只保留一个宽松上限防脚本单独刷 ASR（正常用户碰不到），并记 usage 用于统计。
const ASR_ABUSE_LIMIT = 400;

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const limit = await checkAiRateLimit(auth.userId, 'voice_chat', ASR_ABUSE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '语音识别调用过于频繁，请稍后再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': String(ASR_ABUSE_LIMIT), 'Retry-After': '86400' } },
    );
  }

  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.length === 0) {
    return NextResponse.json({ error: 'empty audio' }, { status: 400 });
  }
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: 'audio too large' }, { status: 413 });
  }

  // 从 Content-Type 判断格式：默认 wav。
  const ct = req.headers.get('content-type') || '';
  let format = 'wav';
  if (ct.includes('opus') || ct.includes('webm')) format = 'opus';
  else if (ct.includes('mp3') || ct.includes('mpeg')) format = 'mp3';

  try {
    const text = await recognize(buf, { format });
    await recordAiUsage(auth.userId, 'voice_chat', 'aliyun-nls-asr');
    return NextResponse.json({ text });
  } catch (err) {
    console.error('[asr/aliyun]', err);
    return NextResponse.json({ error: 'ASR 失败，请重试' }, { status: 502 });
  }
}
