import { NextResponse } from 'next/server';
import { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit } from '@/lib/server/rate-limit';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const limit = await checkAiRateLimit(auth.userId, 'handwriting');
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '每日AI调用次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  const apiKey = process.env.DEEPSEEK_HANDWRITING_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { image } = await req.json();
    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
    }

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是韩文手写识别助手。用户上传手写韩文的图片，你识别出图片中的韩文字符并返回。只返回韩文原文，不要解释。如果是多个字符就连续返回。如果图片中没有韩文，返回空字符串。',
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: image },
              },
              {
                type: 'text',
                text: '请识别图片中的韩文手写内容。',
              },
            ],
          },
        ],
        temperature: 0.1,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Handwriting API error:', res.status, errText.slice(0, 500));
      // If vision not supported, fall back gracefully
      return NextResponse.json({ text: '', error: `API error: ${res.status}` }, { status: 200 });
    }

    const json = await res.json();
    const text = json.choices?.[0]?.message?.content?.trim() || '';
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ text: '', error: err.message }, { status: 200 });
  }
}
