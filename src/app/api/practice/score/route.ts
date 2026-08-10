import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';

export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

interface ScoredResult {
  [k: string]: unknown;
  natural: number;
  grammar: number;
  politeness: number;
  task: number;
  overall: number;
  tips: string[];
  highlight: string | null;
}

function clampScore(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return 60;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function sanitize(raw: Record<string, unknown>): ScoredResult {
  const natural = clampScore(raw.natural);
  const grammar = clampScore(raw.grammar);
  const politeness = clampScore(raw.politeness);
  const task = clampScore(raw.task);
  const overallRaw = raw.overall;
  const overall = overallRaw == null
    ? Math.round((natural + grammar + politeness + task) / 4)
    : clampScore(overallRaw);
  const tips = Array.isArray(raw.tips)
    ? (raw.tips as unknown[]).filter((t): t is string => typeof t === 'string' && t.length > 0).slice(0, 3)
    : [];
  const highlight = typeof raw.highlight === 'string' && raw.highlight.length > 0
    ? raw.highlight.slice(0, 40)
    : null;
  return { natural, grammar, politeness, task, overall, tips, highlight };
}

const SYSTEM_PROMPT = `你是韩语口语教练。基于用户与 NPC 的完整对话，从 4 个维度打分 0-100 并给出建议：
- natural：口语自然度（用词自然度、语气助词、连接语流畅度）
- grammar：语法正确度（助词、终结语尾、时制、连接语尾）
- politeness：礼貌阶恰当性（합쇼체/해요체/반말 是否匹配场景与 NPC 关系）
- task：任务完成度（是否达成 tasks 里指定的目标）

只评估 user 角色的消息；npc 消息作为语境理解。overall = 4 项算术平均四舍五入。
tips：最多 3 条中文短句（每条 ≤ 30 字），指出最值得改的一处，格式"[原话] → [建议] · [原因]"。
highlight：一句 ≤ 20 字的中文正向点评。

只返回 JSON，不要 markdown 代码块：
{"natural":0-100,"grammar":0-100,"politeness":0-100,"task":0-100,"overall":0-100,"tips":["...","..."],"highlight":"..."}`;

interface IncomingMessage {
  [k: string]: unknown;
  role: 'npc' | 'user' | 'divider';
  ko?: string;
}

interface IncomingTask {
  [k: string]: unknown;
  label: string;
  hint?: string;
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth?.userId) {
    return NextResponse.json({ error: '登录后可查看评分' }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_SCORE_KEY || process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: '评分服务未配置' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const {
      sceneCn = '',
      stars = 0,
      chatTasks = [],
      tasksDoneCount = 0,
      messages = [],
    } = body as {
      sceneSlug?: string;
      sceneCn?: string;
      stars?: number;
      chatTasks?: IncomingTask[];
      tasksDoneCount?: number;
      messages?: IncomingMessage[];
    };

    const userMsgs = (Array.isArray(messages) ? messages : []).filter(
      (m) => m && (m.role === 'user' || m.role === 'npc') && typeof m.ko === 'string' && m.ko.trim(),
    );
    if (userMsgs.filter((m) => m.role === 'user').length < 2) {
      return NextResponse.json({ error: '对话太短，无法打分' }, { status: 400 });
    }

    const combined = userMsgs.map((m) => m.ko).join(' ');
    const check = filterContent(combined.slice(0, 2000), 'ai_input');
    if (!check.ok) {
      return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日评分次数已用完，请明天再试或升级会员' },
        { status: 429, headers: { 'Retry-After': '86400' } },
      );
    }

    const recent = userMsgs.slice(-40); // 最近 20 轮（每轮 npc+user）
    const dialogueBlock = recent
      .map((m) => `[${m.role === 'user' ? 'USER' : 'NPC'}] ${m.ko}`)
      .join('\n');

    const tasksLine = Array.isArray(chatTasks) && chatTasks.length > 0
      ? `${chatTasks.map((t) => t.label).join('、')} · 完成 ${tasksDoneCount}/${chatTasks.length}`
      : '无指定任务（自由聊）';

    const userContent = `场景：${sceneCn} (${stars}星)
任务：${tasksLine}

对话：
${dialogueBlock}`;

    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
      timeoutMs: 25000,
    });

    if (!res.ok) {
      return NextResponse.json({ error: '评分服务异常' }, { status: 502 });
    }
    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content?.trim() || '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {};
    }

    const result = sanitize(parsed);
    await recordAiUsage(auth.userId, 'judge');

    return NextResponse.json(result);
  } catch (err) {
    console.error('[practice/score]', err);
    return NextResponse.json({ error: '评分服务异常，请稍后重试' }, { status: 500 });
  }
}
