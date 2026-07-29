import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
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
    const { spoken, target, meaning, type, alternatives } = body;

    if (!spoken || !target || !meaning) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof spoken !== 'string' || spoken.length > 200) {
      return NextResponse.json({ error: '输入过长' }, { status: 400 });
    }

    // 剥掉浏览器语音识别常见标点,避免把标点当发音错误
    // sentence 类型 = 写作文字输入,保留空格(韩语띄어쓰기); word 类型 = 语音识别,空格也剥掉
    const cleanedSpoken = type === 'sentence'
      ? spoken.trim().replace(/[。？！，,.?!、…～~·ㆍ「」『』（）()《》〈〉""''\-—]+/g, '')
      : spoken.trim().replace(/[。？！，,.?!、…～~·ㆍ「」『』（）()《》〈〉""''\-—\s]+/g, '');
    if (!cleanedSpoken) {
      return NextResponse.json({ error: 'Empty input' }, { status: 400 });
    }

    const altList: string[] = Array.isArray(alternatives)
      ? alternatives.filter((s): s is string => typeof s === 'string' && s.trim().length > 0).slice(0, 6)
      : [];

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 判定次数已达上限，请明天再试或升级会员' },
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
        thinking: { type: 'disabled' },
        messages: [
          {
            role: 'system',
            content: `你是韩语口语评估专家。用户正在练习韩语${isWord ? '单词' : '句子'}表达。

【重要前提】
1. 用户是通过语音识别输入的，识别文本已剥离标点，仅比对文字与语义，不要因缺少标点扣分。
2. 如果用户说的与"参考答案"或"可接受的其他说法"任一在语义上等价（含敬语级别不同、语气词差异、同义替换），直接判 correct。
3. 只有当用户明显说错词、说了不同意思、或识别文字与所有可接受答案都相差太远时才判 wrong。

评估规则：
- correct：命中参考答案或任一"可接受的其他说法"，或语义完全等价（如 감사합니다 和 고마워요 都表示谢谢）
- acceptable：意思基本正确但有轻微问题（语法小错、敬语级别不符、多/少一两个字但不影响意思）
- wrong：意思明显错误、说了完全不同的词、或识别出的文字与目标相差太远

只返回JSON，格式：
{
  "result": "correct" | "acceptable" | "wrong",
  "score": 0-100,
  "correctAnswer": "最标准的说法",
  "alternativeAnswers": ["其他正确说法1", "其他正确说法2"],
  "errorReason": "错误原因（仅 wrong 时填写，用中文说明哪里错了，其他情况返回 null）",
  "tip": "学习提示（correct/acceptable 时如有更地道表达则填写，否则返回 null）",
  "grammar": "涉及的核心语法/助词/词尾说明（1 句中文，如'이/가 是主语助词，用于陈述主体；-아요/어요 是非正式敬语'。没有明显语法点时返回 null）"
}
不要 markdown，不要其他文字。`,
          },
          {
            role: 'user',
            content: `题目：用韩语表达「${meaning}」
参考答案：${target}${altList.length ? `\n可接受的其他说法：${altList.join(' / ')}` : ''}
用户说的：${cleanedSpoken}`,
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
    result.grammar = typeof result.grammar === 'string' && result.grammar.trim() ? result.grammar.trim() : null;

    await recordAiUsage(auth.userId, 'judge');
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('[ai/speaking-judge]', err);
    return NextResponse.json({ error: 'AI服务异常' }, { status: 500 });
  }
}
