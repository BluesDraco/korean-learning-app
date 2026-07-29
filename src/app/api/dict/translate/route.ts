import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { translateKoToZhDeepSeek } from '@/lib/deepseek';

// 6-26 事故兜底：含鉴权的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let text: string;
  try {
    const body = await req.json();
    text = (body.text || '').trim();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
  if (!text) return NextResponse.json({ error: '缺少文本' }, { status: 400 });
  if (text.length > 200) return NextResponse.json({ error: '句子过长' }, { status: 400 });

  const cacheKey = `tr:${text}`;
  try {
    const db = await getDb();
    const cached = await db.exec('SELECT result FROM word_lookup_cache WHERE word = ?', [cacheKey]);
    const row = cached[0]?.values?.[0]?.[0];
    if (row) return NextResponse.json({ translation: String(row) });
  } catch { /* 缓存读失败继续走 AI */ }

  const apiKey = process.env.DEEPSEEK_TRANSLATE_KEY || process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) return NextResponse.json({ error: 'AI 服务未配置' }, { status: 503 });

  try {
    const translation = (await translateKoToZhDeepSeek(text, apiKey)).trim();
    if (!translation) return NextResponse.json({ error: '翻译失败' }, { status: 502 });
    try {
      const db = await getDb();
      await db.run('INSERT OR IGNORE INTO word_lookup_cache (word, result, created_at) VALUES (?, ?, ?)', [cacheKey, translation, Date.now()]);
    } catch { /* 缓存写失败不影响返回 */ }
    return NextResponse.json({ translation });
  } catch {
    return NextResponse.json({ error: 'AI 服务异常，请稍后重试' }, { status: 502 });
  }
}
