import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const { sentence, grammarTitle } = await req.json().catch(() => ({}));
    if (!sentence) return NextResponse.json({ error: 'missing sentence' }, { status: 400 });

    // 缓存命中：句子+语法点确定性输入，全局共享，不扣额度不调 AI
    const cacheKey = `${String(sentence).replace(/\s+/g, ' ').trim()}::${String(grammarTitle || '').trim()}`;
    try {
      const db = await getDb();
      const cached = await db.exec(
        'SELECT result FROM grammar_breakdown_cache WHERE key = ?',
        [cacheKey]
      );
      const row = cached[0]?.values?.[0]?.[0];
      if (row) return NextResponse.json(JSON.parse(row as string));
    } catch {
      /* cache miss — proceed */
    }

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 判定次数已达上限，请明天再试或升级会员' },
        { status: 429 },
      );
    }

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
        model: 'deepseek-v4-flash',
        thinking: { type: 'disabled' },
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
      try {
        const db = await getDb();
        await db.run(
          'INSERT OR IGNORE INTO grammar_breakdown_cache (key, result, created_at) VALUES (?, ?, ?)',
          [cacheKey, JSON.stringify(parsed), Date.now()]
        );
      } catch {
        /* cache write fail not critical */
      }
      await recordAiUsage(auth.userId, 'judge');
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: 'parse error' }, { status: 500 });
    }
  } catch (err: any) {
    if (err?.name === 'FetchTimeoutError') {
      return NextResponse.json({ error: 'AI service timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'AI service error' }, { status: 500 });
  }
}
