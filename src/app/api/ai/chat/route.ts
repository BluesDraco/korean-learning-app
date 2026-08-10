import { NextResponse } from 'next/server';
import { chatResponseDeepSeek } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { filterContent } from '@/lib/contentFilter';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await assertActiveUser(auth.userId))) return NextResponse.json({ error: '账号状态异常' }, { status: 403 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { scenario, context, userMessage, currentTask, rephraseOf } = await req.json();
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Missing userMessage' }, { status: 400 });
    }
    if (userMessage.length > 200) {
      return NextResponse.json({ error: '输入不能超过200个字符' }, { status: 400 });
    }
    const chatCheck = filterContent(userMessage, 'ai_input');
    if (!chatCheck.ok) {
      return NextResponse.json({ error: chatCheck.reason }, { status: 400 });
    }

    // Prompt injection 二次防护：context 里的 user 消息也过一遍
    // （客户端可能被篡改把越权指令塞进历史）
    if (Array.isArray(context)) {
      for (const msg of context) {
        if (msg?.role === 'user' && typeof msg.content === 'string') {
          const check = filterContent(msg.content, 'ai_input');
          if (!check.ok) {
            return NextResponse.json({ error: '对话历史包含违规内容' }, { status: 400 });
          }
        }
      }
    }
    if (typeof rephraseOf === 'string' && rephraseOf.length > 500) {
      return NextResponse.json({ error: 'rephraseOf too long' }, { status: 400 });
    }

    const limit = await checkAiQuota(auth.userId, 'chat');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日对话次数已达上限，请明天再试或升级会员' },
        { status: 429, headers: { 'X-RateLimit-Limit': String(limit.limit), 'Retry-After': '86400' } },
      );
    }

    const result = await chatResponseDeepSeek(
      { scenario, context, userMessage, currentTask, rephraseOf },
      apiKey
    );
    await recordAiUsage(auth.userId, 'chat');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[ai/chat]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
