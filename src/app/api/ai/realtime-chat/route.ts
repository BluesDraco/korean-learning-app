import { NextResponse } from 'next/server';
import { getAuthFromCookie, assertActiveUser } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { getUserTier, getBenefitMatrix, canUseVoice } from '@/lib/server/membership';
import { BETA_UNLOCK } from '@/lib/membership-benefits';
import { filterContent } from '@/lib/contentFilter';

// 含鉴权/用户数据，禁缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';
// 月度语音额度：100 轮/天（与会员页展示一致）；年度/永久无限
const MONTHLY_VOICE_ROUNDS = 100;

interface TurnMsg { role: 'ai' | 'user'; content: string }

// 实时语音对话：一次 LLM 流式输出，先纯口语韩语（供逐句 TTS），再用 ⟪META⟫ 分隔附一行元数据 JSON（纠错/新词/任务）。
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await assertActiveUser(auth.userId))) return NextResponse.json({ error: '账号状态异常' }, { status: 403 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  let systemHint: string;
  let context: TurnMsg[];
  let userMessage: string;
  try {
    const body = await req.json();
    systemHint = typeof body.systemHint === 'string' ? body.systemHint.slice(0, 2000) : '';
    context = Array.isArray(body.context) ? body.context.slice(-12) : [];
    userMessage = body.userMessage;
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!userMessage || typeof userMessage !== 'string') {
    return NextResponse.json({ error: 'Missing userMessage' }, { status: 400 });
  }
  if (userMessage.length > 200) {
    return NextResponse.json({ error: '输入不能超过200个字符' }, { status: 400 });
  }
  const check = filterContent(userMessage, 'ai_input');
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
  // 历史里的 user 消息二次过滤（防客户端篡改注入）
  for (const m of context) {
    if (m?.role === 'user' && typeof m.content === 'string') {
      const c = filterContent(m.content, 'ai_input');
      if (!c.ok) return NextResponse.json({ error: '对话历史包含违规内容' }, { status: 400 });
    }
  }

  // 语音门：免费档无语音；月度限量（100 轮/天）；年度/永久无限
  const [tier, matrix] = await Promise.all([getUserTier(auth.userId), getBenefitMatrix()]);
  if (!canUseVoice(matrix, tier)) {
    return NextResponse.json(
      { error: '语音对话是会员专属功能，升级后即可畅聊' },
      { status: 403 },
    );
  }
  // 月度档限量；免费体验期(BETA_UNLOCK)对免费用户也按月度档限量——语音成本最高，
  // 不能因内容全放开就让最贵的功能敞开无限（与 aiQuotaOf 的 monthly 限量对齐）。
  // 真实 yearly/lifetime 仍无限（不误伤付费高档），故 BETA 分支只限 free。
  if (tier === 'monthly' || (BETA_UNLOCK && tier === 'free')) {
    const limit = await checkAiRateLimit(auth.userId, 'realtime_chat', MONTHLY_VOICE_ROUNDS);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '今日语音对话额度已用完，升级年度会员可无限畅聊' },
        { status: 429, headers: { 'X-RateLimit-Limit': String(MONTHLY_VOICE_ROUNDS), 'Retry-After': '86400' } },
      );
    }
  }

  // 只吐纯口语韩语（供逐句 TTS 低延迟播出）。纠错/新词/任务由前端并行调 /api/ai/chat 拿，不在此端点。
  const systemPrompt = `你是韩语口语陪练的对话对象。${systemHint}

规则：
- 只用**自然口语化的韩语**回复，像真人聊天，一次1-2句，不要长篇。
- 韩语必须正确分词（띄어쓰기）：词与词之间空格，名词后助词不空格。
- 顺着话题自然往下聊，可适当反问，让对话持续。
- 用户母语是中文，但你必须用韩语回应。若用户说了中文/英文，用简单韩语温柔引导他用韩语并给一句可模仿示范。
- 直接输出韩语回复本身，不要中文翻译、不要引号包裹、不要任何解释或标注。`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...context.map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
    { role: 'user', content: userMessage },
  ];

  let upstream: Response;
  try {
    upstream = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages,
        temperature: 0.7,
        max_tokens: 300,
        stream: true,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return NextResponse.json({ error: 'AI服务连接失败，请重试' }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'AI服务异常，请重试' }, { status: 502 });
  }

  await recordAiUsage(auth.userId, 'realtime_chat');

  // 直接透传上游 SSE，前端解析 delta.content
  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
