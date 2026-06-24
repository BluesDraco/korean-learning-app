import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  const { sentence, grammarTitle } = await req.json().catch(() => ({}));
  if (!sentence) return NextResponse.json({ error: 'missing sentence' }, { status: 400 });

  const prompt = `你是韩语语法教师。将以下韩语句子拆解为有意义的词素，为每个词素给出简短中文语法解释。
语法点：${grammarTitle || ''}
句子：${sentence}
规则：
- 每个词素不超过6个字符
- 每条解释不超过15个中文字
- 特别标注今天的语法点
只返回JSON：{"tokens":[{"text":"词素","role":"解释"}]}`;

  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
    timeoutMs: 10000,
  });

  if (!res.ok) return NextResponse.json({ error: 'AI error' }, { status: 502 });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '{}';
  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'parse error' }, { status: 500 });
  }
}
