import { NextResponse } from 'next/server';
import { lookupWordDeepSeek } from '@/lib/deepseek';
import { romanize, deconjugate } from '@/lib/dictionary';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit } from '@/lib/server/rate-limit';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const limit = await checkAiRateLimit(auth.userId, 'word-lookup');
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '每日AI调用次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return NextResponse.json({
      dictionaryForm: '',
      pronunciation: '',
      meaning: '',
      partOfSpeech: '未知',
      example: { text: '', translation: '' },
    });
  }

  let word: string;
  try {
    const body = await req.json();
    word = body.word;
    if (!word || typeof word !== 'string') {
      return NextResponse.json({ error: 'Missing word' }, { status: 400 });
    }

    const result = await lookupWordDeepSeek(word, apiKey);

    if (!result.pronunciation) {
      result.pronunciation = romanize(result.dictionaryForm || word);
    }

    return NextResponse.json(result);
  } catch (err: any) {
    const { dictionaryForm, conjugation } = deconjugate(word!);
    return NextResponse.json({
      dictionaryForm,
      pronunciation: romanize(dictionaryForm),
      meaning: '',
      partOfSpeech: '未知',
      conjugation,
      example: { text: '', translation: '' },
    });
  }
}
