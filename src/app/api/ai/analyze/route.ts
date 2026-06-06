import { NextResponse } from 'next/server';
import { analyzeSentenceDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { fetchWithTimeout } from '@/lib/fetch';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

async function analyzeModeTranslate(sentence: string, apiKey: string): Promise<Record<string, unknown>> {
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 30_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: `你是韩语翻译助手。对给定的韩文句子/段落，返回JSON：
{
  "mode": "translate",
  "fullTranslation": "自然通顺的中文翻译",
  "alternativeTranslation": "另一种可能的译法（如果有）",
  "note": "如果涉及文化特定表达或韩语独特语法，加一条简短说明（10-20字），否则留空"
}
只返回JSON，不要markdown代码块。`,
        },
        { role: 'user', content: `翻译成中文：${sentence}` },
      ],
      temperature: 0.3,
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek translate error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  return JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim());
}

async function analyzeModeLearn(sentence: string, apiKey: string): Promise<Record<string, unknown>> {
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 30_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: `你是韩语教学专家。对给定的韩语句子，返回以下JSON格式：

{
  "mode": "learn",
  "fullTranslation": "整句中文翻译",
  "words": [
    {"text": "韩文词（保留原形变化）", "pronunciation": "罗马音", "meaning": "中文释义", "partOfSpeech": "词性（动词/形容词/名词/副词/助词/感叹词/冠形词/代词/数词/词尾）", "emoji": "一个代表该词含义的emoji"}
  ],
  "grammar": [
    {"pattern": "语法句型", "title": "语法名称", "usage": "用法说明", "explanation": "详细解释", "level": "初级|中级|高级", "conjugation": "变形示例（如有，否则空字符串）", "examples": ["例句1", "例句2"]}
  ],
  "particles": [
    {"text": "助词", "explanation": "该助词在此句中的作用"}
  ]
}

逐词拆解，包括助词和词尾。语法分析识别句型模式。只返回JSON，不要markdown代码块。`,
        },
        { role: 'user', content: `分析这个韩语句子：${sentence}` },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek learn analyze error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  return JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim());
}

async function analyzeModeDeep(text: string, apiKey: string): Promise<Record<string, unknown>> {
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 45_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: `你是韩语阅读教学专家。对给定的韩文段落/文章，返回完整阅读报告JSON：

{
  "mode": "deep",
  "overview": "文章概览（2-3句中文，说清楚这段文字在讲什么）",
  "difficulty": "初级|中级|高级",
  "difficultyReason": "一句话说明难度判断依据",
  "fullTranslation": "完整中文翻译（逐句，保持段落结构）",
  "words": [
    {"text": "韩文词", "pronunciation": "罗马音", "meaning": "中文释义", "partOfSpeech": "词性", "emoji": "一个相关emoji", "example": "原文中包含该词的例句"}
  ],
  "sentences": [
    {"korean": "值得学习的原句", "chinese": "中文翻译", "structure": "句子结构简析（20字内）"}
  ],
  "grammar": [
    {"pattern": "语法结构（如 -고 있다）", "title": "语法名称", "meaning": "中文意思", "usage": "使用场景（1-2句）", "example": "原文中的用法", "simpleExample": "一个简单替换例句"}
  ],
  "suggestion": "学完建议：最值得保存的2-3个词或句型"
}

要求：
- words 挑 8-12 个重点词，不要列出全部
- sentences 挑 3-5 句最有学习价值的
- grammar 挑 2-4 个语法点
- 只返回JSON，不要markdown代码块`,
        },
        { role: 'user', content: `分析这段韩文：\n\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek deep analyze error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  return JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim());
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();

  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { sentence, mode } = await req.json();
    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json({ error: 'Missing sentence' }, { status: 400 });
    }

    const userId = auth?.userId;

    // Guest rate limit: 5 calls per day (tracked by IP)
    if (!userId) {
      const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
      const guestKey = `guest_analyze_${ip}_${new Date().toISOString().slice(0, 10)}`;
      const guestLimit = await checkAiRateLimit(guestKey, 'analyze', 5);
      if (!guestLimit.allowed) {
        return NextResponse.json(
          { error: '游客每日AI分析限5次，登录后可享受30次' },
          { status: 429 },
        );
      }
      await recordAiUsage(guestKey, 'analyze');
    } else {
      const limit = await checkAiRateLimit(userId, 'analyze');
      if (!limit.allowed) {
        return NextResponse.json(
          { error: '今日AI分析次数已达上限（30次），请明天再试' },
          { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
        );
      }
    }

    const effectiveMode = mode || 'learn';
    const isLong = sentence.replace(/\s/g, '').length >= 50;

    // Deep mode requires 50+ chars; downgrade to learn if too short
    if (effectiveMode === 'deep' && !isLong) {
      const result = await analyzeModeLearn(sentence, apiKey);
      if (userId) await recordAiUsage(userId, 'analyze');
      return NextResponse.json({ ...result, mode: 'learn', _downgraded: true });
    }

    if (effectiveMode === 'translate') {
      const result = await analyzeModeTranslate(sentence, apiKey);
      if (userId) await recordAiUsage(userId, 'analyze');
      return NextResponse.json(result);
    }

    if (effectiveMode === 'deep') {
      const result = await analyzeModeDeep(sentence, apiKey);
      if (userId) await recordAiUsage(userId, 'analyze');
      return NextResponse.json(result);
    }

    // Default: learn mode (sentence-level breakdown)
    const result = await analyzeModeLearn(sentence, apiKey);
    if (userId) await recordAiUsage(userId, 'analyze');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[ai/analyze]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
