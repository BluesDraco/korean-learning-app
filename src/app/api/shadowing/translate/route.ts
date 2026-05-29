import { NextResponse } from 'next/server';
import { translateKoToZhDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit } from '@/lib/server/rate-limit';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const limit = await checkAiRateLimit(auth.userId, 'translate');
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '每日AI调用次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  const apiKey = process.env.DEEPSEEK_TRANSLATE_KEY;
  if (!apiKey) {
    // Fallback: return empty translation so client can handle
    return NextResponse.json({ translation: '' });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const translation = await translateKoToZhDeepSeek(text, apiKey);
    return NextResponse.json({ translation });
  } catch (err: any) {
    return NextResponse.json({ translation: '', error: err.message }, { status: 500 });
  }
}
