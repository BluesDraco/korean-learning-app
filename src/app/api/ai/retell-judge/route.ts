import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';

// 含鉴权/用户数据，禁 Next.js 自动缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_SPEAKING_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const body = await req.json();
    const { spoken, reference, keyPoints, meaning } = body;

    if (!spoken || !reference || !Array.isArray(keyPoints)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof spoken !== 'string' || spoken.length > 800) {
      return NextResponse.json({ error: '输入过长' }, { status: 400 });
    }
    const points: string[] = keyPoints
      .filter((s: unknown): s is string => typeof s === 'string' && s.trim().length > 0)
      .slice(0, 8);
    if (points.length === 0) {
      return NextResponse.json({ error: 'No key points' }, { status: 400 });
    }

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 判定次数已达上限，请明天再试或升级会员' },
        { status: 429 },
      );
    }

    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 20_000,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          {
            role: 'system',
            content: `你是韩语口语复述评估专家。用户听了一小段韩语后，用自己的话口语复述其大意。

【重要前提】
1. 用户是通过语音识别输入的，文本可能有识别误差、缺标点，请只看语义，不因标点或识别小错扣分。
2. 复述【不要求逐字复述】，只要说到了关键信息即可。用户可以用自己的词、换句式、精简表达。
3. 评估核心是【内容完整度】：用户说到了几条"要点"。其次看表达是否自然通顺。

评估要点：逐条判断每个"要点"用户有没有覆盖到（语义覆盖即算，不需原词）。

只返回JSON，格式：
{
  "score": 0-100,
  "coverage": 0-100,
  "coveredPoints": ["用户说到的要点原文"],
  "missedPoints": ["用户遗漏的要点原文"],
  "naturalness": "对表达自然度的一句中文点评",
  "suggestion": "更地道、更完整的整段韩语说法（1-3句，可选，没有则返回 null）",
  "verdict": "correct" | "acceptable" | "wrong"
}
verdict 规则：coverage>=80 且表达通顺=correct；coverage>=50=acceptable；否则 wrong。
coveredPoints/missedPoints 必须从给定要点列表中原样选取。不要 markdown，不要其他文字。`,
          },
          {
            role: 'user',
            content: `原文大意：${meaning || reference}
标准韩语原文：${reference}
要点清单：${points.map((p, i) => `${i + 1}. ${p}`).join('；')}
用户复述：${spoken.trim()}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
    const json = await res.json();
    const content = json.choices[0].message.content.trim();
    const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);

    // Safety defaults
    result.coverage = typeof result.coverage === 'number' ? Math.min(100, Math.max(0, result.coverage)) : 0;
    result.score = typeof result.score === 'number' ? Math.min(100, Math.max(0, result.score)) : result.coverage;
    result.coveredPoints = Array.isArray(result.coveredPoints) ? result.coveredPoints.filter((s: unknown) => typeof s === 'string') : [];
    result.missedPoints = Array.isArray(result.missedPoints) ? result.missedPoints.filter((s: unknown) => typeof s === 'string') : [];
    result.naturalness = typeof result.naturalness === 'string' && result.naturalness.trim() ? result.naturalness.trim() : null;
    result.suggestion = typeof result.suggestion === 'string' && result.suggestion.trim() ? result.suggestion.trim() : null;
    result.verdict = ['correct', 'acceptable', 'wrong'].includes(result.verdict)
      ? result.verdict
      : result.coverage >= 80 ? 'correct' : result.coverage >= 50 ? 'acceptable' : 'wrong';

    await recordAiUsage(auth.userId, 'judge');
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('[ai/retell-judge]', err);
    return NextResponse.json({ error: 'AI服务异常' }, { status: 500 });
  }
}
