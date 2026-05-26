import { NextResponse } from 'next/server';
import { translateKoToZhDeepSeek } from '@/lib/deepseek';

export async function POST(req: Request) {
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
