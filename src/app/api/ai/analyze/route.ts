import { NextResponse } from 'next/server';
import { analyzeSentenceDeepSeek } from '@/lib/deepseek';

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { sentence } = await req.json();
    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json({ error: 'Missing sentence' }, { status: 400 });
    }

    const result = await analyzeSentenceDeepSeek(sentence, apiKey);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
