import { NextResponse } from 'next/server';
import { chatResponseDeepSeek } from '@/lib/deepseek';

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { scenario, context, userMessage } = await req.json();
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Missing userMessage' }, { status: 400 });
    }

    const result = await chatResponseDeepSeek(
      { scenario, context, userMessage },
      apiKey
    );
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
