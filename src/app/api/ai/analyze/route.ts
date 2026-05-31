import { NextResponse } from 'next/server';
import { analyzeSentenceDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { sentence } = await req.json();
    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json({ error: 'Missing sentence' }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'analyze');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
      );
    }

    const result = await analyzeSentenceDeepSeek(sentence, apiKey);
    await recordAiUsage(auth.userId, 'analyze');
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
