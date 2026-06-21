import { NextResponse } from 'next/server';
import { lookupWordDeepSeek } from '@/lib/deepseek';
import { romanize, deconjugate } from '@/lib/dictionary';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { getDb } from '@/lib/server/db';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let word: string;
  try {
    const body = await req.json();
    word = body.word;
    if (!word || typeof word !== 'string') {
      return NextResponse.json({ error: 'Missing word' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_SHADOWING_KEY;
  if (!apiKey) {
    return NextResponse.json({
      dictionaryForm: '',
      pronunciation: '',
      meaning: '',
      partOfSpeech: '未知',
      example: { text: '', translation: '' },
    });
  }

  // Check global word_lookup_cache first (no rate limit cost on hit)
  try {
    const db = await getDb();
    const cached = await db.exec('SELECT result FROM word_lookup_cache WHERE word = ?', [word]);
    const row = cached[0]?.values?.[0]?.[0];
    if (row) {
      const p = JSON.parse(row as string);
      return NextResponse.json({
        dictionaryForm: p.korean ?? word,
        pronunciation: p.romanization ?? '',
        meaning: p.meaning ?? '',
        partOfSpeech: p.partOfSpeech ?? '未知',
        example: {
          text: p.examples?.[0]?.korean ?? '',
          translation: p.examples?.[0]?.chinese ?? '',
        },
      });
    }
  } catch { /* cache read failed, continue */ }

  const limit = await checkAiRateLimit(auth.userId, 'word-lookup');
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '每日AI调用次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  try {
    const result = await lookupWordDeepSeek(word, apiKey);

    if (!result.pronunciation) {
      result.pronunciation = romanize(result.dictionaryForm || word);
    }

    await recordAiUsage(auth.userId, 'word-lookup');

    // Write to global cache (fire and forget)
    getDb().then(db => db.run(
      'INSERT OR IGNORE INTO word_lookup_cache (word, result, created_at) VALUES (?, ?, ?)',
      [word, JSON.stringify({
        korean: result.dictionaryForm,
        romanization: result.pronunciation,
        meaning: result.meaning,
        partOfSpeech: result.partOfSpeech,
        examples: result.example?.text
          ? [{ korean: result.example.text, chinese: result.example.translation }]
          : [],
      }), Date.now()]
    )).catch(() => {});

    return NextResponse.json(result);
  } catch {
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
