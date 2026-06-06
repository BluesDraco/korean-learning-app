import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { fetchWithTimeout } from '@/lib/fetch';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const { text, topic } = await req.json();
    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'analyze');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429 },
      );
    }

    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 30_000,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: `你是韩语写作教练。用户写了一段韩文练习，请给出简洁批改。

固定输出JSON格式：
{
  "original": "用户原文（原样返回）",
  "corrected": "更自然的韩文写法（若原文已很自然则与original相同）",
  "reason": "中文解释改动原因，1-2句，重点说明语法或表达问题",
  "isCorrect": true或false（原文是否已经自然正确）,
  "saveExpression": "从这段文字中提炼1个可复用的表达模板，用___占位变量部分，格式：韩文模板 — 中文说明"
}

只返回JSON，不要markdown代码块，不要其他文字。`,
          },
          {
            role: 'user',
            content: `主题：${topic || '自由写作'}\n\n用户写的韩文：\n${text.trim()}`,
          },
        ],
        temperature: 0.4,
        max_tokens: 600,
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
    const json = await res.json();
    const content = json.choices[0].message.content.trim();
    const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);

    await recordAiUsage(auth.userId, 'analyze');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[ai/writing]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
