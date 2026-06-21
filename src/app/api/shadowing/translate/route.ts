import { NextResponse } from 'next/server';
import { translateKoToZhDeepSeek, translateBatchDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { filterContent } from '@/lib/contentFilter';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let text: string | undefined;
  let texts: string[] | undefined;
  try {
    const body = await req.json();
    text = body.text;
    texts = body.texts;
    if (!text && !texts) {
      return NextResponse.json({ error: 'Missing text or texts' }, { status: 400 });
    }
    const inputToCheck = text ?? (texts && texts[0]) ?? '';
    const translateCheck = filterContent(inputToCheck, 'ai_input');
    if (!translateCheck.ok) {
      return NextResponse.json({ error: translateCheck.reason }, { status: 400 });
    }
    if (texts) {
      for (const t of texts) {
        const batchCheck = filterContent(t, 'ai_input');
        if (!batchCheck.ok) return NextResponse.json({ error: batchCheck.reason }, { status: 400 });
      }
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_TRANSLATE_KEY;
  if (!apiKey) {
    if (texts) return NextResponse.json({ translations: texts.map(() => '') });
    return NextResponse.json({ translation: '' });
  }

  const limit = await checkAiRateLimit(auth.userId, 'translate');
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '每日AI调用次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  try {
    if (texts && texts.length > 0) {
      const translations = await translateBatchDeepSeek(texts, apiKey);
      await recordAiUsage(auth.userId, 'translate');
      return NextResponse.json({ translations });
    }
    const translation = await translateKoToZhDeepSeek(text!, apiKey);
    await recordAiUsage(auth.userId, 'translate');
    return NextResponse.json({ translation });
  } catch (err: any) {
    if (texts) return NextResponse.json({ translations: texts.map(() => ''), error: 'Translation failed' }, { status: 500 });
    return NextResponse.json({ translation: '', error: 'Translation failed' }, { status: 500 });
  }
}
