import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_WRITING_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const { text, topic } = await req.json();
    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: '输入不能超过1000个字符' }, { status: 400 });
    }
    const writingCheck = filterContent(text, 'ai_input');
    if (!writingCheck.ok) {
      return NextResponse.json({ error: writingCheck.reason }, { status: 400 });
    }

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 判定次数已达上限，请明天再试或升级会员' },
        { status: 429 },
      );
    }

    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 30_000,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          {
            role: 'system',
            content: `你是韩语写作教练。用户写了一段韩文练习，请从多个维度批改并打分。

评分维度（0-100 整数）：
- vocabulary：词汇是否准确、丰富、用词地道
- grammar：语法/助词/词尾是否正确
- naturalness：整体是否像母语者的自然表达
- overall：综合分（可加权，不必是三项平均）

固定输出JSON格式：
{
  "original": "用户原文（原样返回）",
  "corrected": "更自然的韩文写法（若原文已很自然则与original相同）",
  "reason": "中文解释改动原因，1-2句，重点说明语法或表达问题",
  "isCorrect": true或false（原文是否已经自然正确，overall>=85 视为 true）,
  "scores": { "vocabulary": 0-100, "grammar": 0-100, "naturalness": 0-100, "overall": 0-100 },
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

    // Safety defaults · scores clamp 0-100,缺失时兜底
    const clamp = (n: unknown) => typeof n === 'number' ? Math.min(100, Math.max(0, Math.round(n))) : undefined;
    const s = result.scores ?? {};
    const overall = clamp(s.overall);
    result.scores = {
      vocabulary: clamp(s.vocabulary) ?? overall ?? 0,
      grammar: clamp(s.grammar) ?? overall ?? 0,
      naturalness: clamp(s.naturalness) ?? overall ?? 0,
      overall: overall ?? 0,
    };
    if (typeof result.isCorrect !== 'boolean') result.isCorrect = result.scores.overall >= 85;

    await recordAiUsage(auth.userId, 'judge');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[ai/writing]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
