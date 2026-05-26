import { NextResponse } from 'next/server';
import { lookupWordDeepSeek } from '@/lib/deepseek';
import { romanize, deconjugate } from '@/lib/dictionary';

export async function POST(req: Request) {
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

  try {
    const { word } = await req.json();
    if (!word || typeof word !== 'string') {
      return NextResponse.json({ error: 'Missing word' }, { status: 400 });
    }

    const result = await lookupWordDeepSeek(word, apiKey);

    // Add romanization if not provided by DeepSeek
    if (!result.pronunciation) {
      result.pronunciation = romanize(result.dictionaryForm || word);
    }

    return NextResponse.json(result);
  } catch (err: any) {
    // Fallback: local deconjugate + empty translation
    const { dictionaryForm, conjugation } = deconjugate((await req.clone().json()).word);
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
