import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';
import { getAuthFromCookie } from '@/lib/server/auth';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

/**
 * 勇气胡萝卜 AI 助手
 * 兔莉的"温柔学姐"语气，专门为日记学习场景设计
 */

interface CarrotMessage {
  role: 'user' | 'tori';
  text: string;
}

const TORI_SYSTEM_PROMPT = `你是「兔莉」（토리/Tori），一只在首尔留学的兔子，是用户的韩语学习小伙伴和精神支柱。

人设：
- 18 岁中国女生，正在首尔동물도시的한빛语言学校留学
- 妈妈塞给你一根写着「용기」（勇气）的胡萝卜
- 性格：温柔、害羞、努力、爱追星
- 自称「兔莉」或「토리」，从不自称"我"以外的称呼
- 把用户当作"和自己一起学习的同学"

回答规则（必须 100% 遵守）：
1. 用温柔学姐的语气，鼓励但不夸张
2. 每次只点拨一步，不一次性讲完
3. 总字数控制在 80 字以内
4. 韩语必须带中文翻译
5. 不说教，不说"加油"等空话
6. 偶尔可以提到胡萝卜、首尔、언어학교等剧情元素
7. 用户的问题如果离学习太远，温柔拉回："我们先学完这一段，好吗？"
8. 韩语示例必须 100% 自然，0 机翻味
9. 不用 emoji（除非语境强烈需要 🥕）
10. 不要 markdown 格式（用纯文本）`;

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY || process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  let userMessage: string;
  let history: CarrotMessage[] = [];
  let context: { day?: number; module?: string; dayTitle?: string } = {};

  try {
    const body = await req.json();
    userMessage = String(body.userMessage || '').trim();
    history = Array.isArray(body.history) ? body.history.slice(-10) : [];
    context = body.context || {};
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  if (!userMessage) return NextResponse.json({ error: '请输入问题' }, { status: 400 });
  if (userMessage.length > 300) {
    return NextResponse.json({ error: '问题不能超过 300 字' }, { status: 400 });
  }

  const check = filterContent(userMessage, 'ai_input');
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });

  // 上下文注入
  const contextLine = context.day
    ? `当前用户正在学习第 ${context.day} 天「${context.dayTitle ?? ''}」的「${context.module ?? ''}」模块。`
    : '';

  const messages = [
    { role: 'system', content: TORI_SYSTEM_PROMPT + (contextLine ? `\n\n上下文：${contextLine}` : '') },
    ...history.map((m) => ({ role: m.role === 'tori' ? 'assistant' : 'user', content: m.text })),
    { role: 'user', content: userMessage },
  ];

  try {
    const resp = await fetchWithTimeout(
      DEEPSEEK_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 200,
        }),
        timeoutMs: 15000,
      }
    );

    if (!resp.ok) {
      return NextResponse.json({ error: '助手开小差了' }, { status: 502 });
    }

    const data = await resp.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? '让我再想想…';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[carrot] error', err);
    return NextResponse.json({ error: '网络问题，等下再问？' }, { status: 504 });
  }
}
