import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { fetchWithTimeout } from '@/lib/fetch';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_SPEAKING_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const body = await req.json();
    const { spoken, target, meaning, type } = body;

    if (!spoken || !target || !meaning) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof spoken !== 'string' || spoken.length > 200) {
      return NextResponse.json({ error: '输入过长' }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'analyze');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429 },
      );
    }

    const isWord = type === 'word';
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 15_000,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: `你是韩语口语评估专家。用户正在练习韩语${isWord ? '单词' : '句子'}表达。

评估规则：
- correct：完全正确，或语义完全等价的不同说法（如 감사합니다 和 고마워요 都表示谢谢）
- acceptable：意思基本正确但有轻微问题（语法小错、敬语级别不符、口音导致的轻微偏差等）
- wrong：意思明显错误、说了完全不同的词、或识别出的文字与目标相差太远

只返回JSON，格式：
{
  "result": "correct" | "acceptable" | "wrong",
  "score": 0-100,
  "correctAnswer": "最标准的说法",
  "alternativeAnswers": ["其他正确说法1", "其他正确说法2"],
  "errorReason": "错误原因（仅 wrong 时填写，用中文说明哪里错了，其他情况返回 null）",
  "tip": "学习提示（correct/acceptable 时如有更地道表达则填写，否则返回 null）"
}
不要 markdown，不要其他文字。`,
          },
          {
            role: 'user',
            content: `题目：用韩语表达「${meaning}」\n参考答案：${target}\n用户说的：${spoken.trim()}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
    const json = await res.json();
    const content = json.choices[0].message.content.trim();
    const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);

    // Safety defaults
    result.result = ['correct', 'acceptable', 'wrong'].includes(result.result) ? result.result : 'wrong';
    result.score = typeof result.score === 'number' ? Math.min(100, Math.max(0, result.score)) : 0;
    result.correctAnswer = result.correctAnswer ?? target;
    result.alternativeAnswers = Array.isArray(result.alternativeAnswers) ? result.alternativeAnswers : [];
    result.errorReason = result.errorReason ?? null;
    result.tip = result.tip ?? null;

    await recordAiUsage(auth.userId, 'analyze');
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('[ai/speaking-judge]', err);
    return NextResponse.json({ error: 'AI服务异常' }, { status: 500 });
  }
}
