import { NextResponse } from 'next/server';
import { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit } from '@/lib/server/rate-limit';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_VOICE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { context, userMessage } = await req.json();
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Missing userMessage' }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'voice');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
      );
    }

    const history = (context || [])
      .map((m: { role: string; content: string }) =>
        m.role === 'ai' ? `토리: ${m.content}` : `用户: ${m.content}`
      )
      .join('\n');

    const res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: `你是 토리(Tori)，一只可爱的兔子，也是用户的韩语口语练习伙伴。用户是正在学习韩语的中国学生。

规则：
1. 用韩语回复用户，保持友好、自然的对话风格，像朋友聊天一样
2. 使用 해요체 (요体) 语体，这是韩语口语中最常用的礼貌体
3. 回复要简短（1-3句话），因为这是语音对话，太长用户听不完
4. 如果用户说了不自然的韩语，用温和的方式示范正确的说法
5. 如果用户卡住了，用韩语提一个简单的问题引导对话
6. 可以聊日常生活、韩国文化、学习心得等话题

返回JSON格式：
{
  "ko": "你的韩语回复（1-3句话）",
  "zh": "中文翻译",
  "correction": "如果用户有语法/用词错误，给出正确说法和简短解释（用中文）。没有错误则填null"
}

只返回JSON，不要markdown代码块。`,
          },
          {
            role: 'user',
            content: `对话历史：\n${history || '(这是对话的开始)'}\n\n用户刚说：${userMessage}\n\n请以 토리 身份用韩语回复。`,
          },
        ],
        temperature: 0.8,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Voice API error:', res.status, errText.slice(0, 500));
      return NextResponse.json({ error: `Voice API error: ${res.status}` }, { status: 502 });
    }

    const json = await res.json();
    const content = json.choices[0].message.content.trim();
    const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json({
      ko: data.ko || '',
      zh: data.zh || '',
      correction: data.correction || null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
