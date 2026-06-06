import { NextResponse } from 'next/server';
import { chatResponseDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { scenario, context, userMessage } = await req.json();
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Missing userMessage' }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'chat');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
      );
    }

    const result = await chatResponseDeepSeek(
      { scenario, context, userMessage },
      apiKey
    );
    await recordAiUsage(auth.userId, 'chat');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[ai/chat]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
