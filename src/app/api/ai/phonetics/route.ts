import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiQuota } from '@/lib/server/membership';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { getDb } from '@/lib/server/db';

// 含鉴权/用户数据：必须 force-dynamic
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 天

type Mode = 'letter' | 'examples' | 'confused' | 'mistake';

interface Payload {
  mode: Mode;
  key: string;
  // 各模式所需上下文
  letter?: string;           // 'ㅓ'
  letterName?: string;       // '어'
  letterRoman?: string;      // 'eo'
  letterType?: string;       // '基本元音' / '辅音' / '收音'
  ruleTitle?: string;        // '连音化'
  ruleExplanation?: string;
  pairLabel?: string;        // 'ㅓ vs ㅗ'
  pairLetters?: string[];    // ['ㅓ', 'ㅗ']
  correctLetter?: string;    // 答错时
  wrongLetter?: string;
  questionPrompt?: string;
}

function buildPrompt(p: Payload): string {
  switch (p.mode) {
    case 'letter':
      return `你是面向中国学生的韩语发音教练。请用通俗易懂的中文为零基础学习者讲解韩文字母「${p.letter}」（名字 ${p.letterName ?? ''}，罗马音 ${p.letterRoman ?? ''}，类型 ${p.letterType ?? ''}）。
要点：
1. 嘴型/舌位（一句话）
2. 用一个中文字或英文单词的发音做近似对比（标明"不完全相同"）
3. 中国学生最常踩的坑（一句话）
4. 30 秒就能记住的小窍门
共 4 段，每段不超过 40 个中文字，开头加 emoji。直接输出文本，不要 JSON。`;

    case 'examples':
      return `你是韩语发音教师。请为「${p.ruleTitle ?? ''}」这个变音规则再举 3 个生活中常见的例子。
规则说明：${p.ruleExplanation ?? ''}
要求：
- 每个例子写成一行：「原写法 → 实际读音 · 中文意思」
- 必须是初学者真能用上的高频词
- 不要重复用户已经看到的例子
直接输出 3 行，不要前言后语，不要编号。`;

    case 'confused':
      return `你是韩语发音教练。请详细对比讲解「${p.pairLabel ?? ''}」这两个韩文字母对中国学生最容易混的点。
要求：
1. 嘴型差异（一句话）
2. 舌位差异（一句话）
3. 中文里最接近的近似音（明确指出"不完全相同"）
4. 一个能让人立刻区分的口诀
共 4 段，每段不超过 40 个中文字，开头加 emoji。直接输出文本，不要 JSON。`;

    case 'mistake':
      return `你是韩语发音教练。学生在练习题「${p.questionPrompt ?? ''}」中错答成了「${p.wrongLetter ?? ''}」，正确答案是「${p.correctLetter ?? ''}」。
请用温和但直接的口吻：
1. 一句话告诉学生「${p.wrongLetter}」和「${p.correctLetter}」的关键差别在哪
2. 推测学生可能因为什么搞混（一句话）
3. 给一个 5 秒内能掌握的辨听技巧
共 3 段，每段不超过 35 个中文字，开头加 emoji。直接输出文本，不要 JSON。`;
  }
}

async function readCache(mode: Mode, key: string): Promise<string | null> {
  try {
    const db = await getDb();
    const cached = await db.exec(
      'SELECT result FROM phonetics_ai_cache WHERE mode = ? AND key = ? AND created_at > ?',
      [mode, key, Date.now() - CACHE_TTL_MS]
    );
    const row = cached[0]?.values?.[0]?.[0];
    return row ? String(row) : null;
  } catch {
    return null;
  }
}

async function writeCache(mode: Mode, key: string, result: string): Promise<void> {
  try {
    const db = await getDb();
    await db.exec(
      'INSERT OR REPLACE INTO phonetics_ai_cache (id, mode, key, result, created_at) VALUES (?, ?, ?, ?, ?)',
      [crypto.randomUUID(), mode, key, result, Date.now()]
    );
  } catch { /* 缓存写失败不影响响应 */ }
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  const payload = await req.json().catch(() => null) as Payload | null;
  if (!payload || !payload.mode || !payload.key) {
    return NextResponse.json({ error: 'missing mode or key' }, { status: 400 });
  }

  // 1. 读缓存（命中不消耗额度）
  const cached = await readCache(payload.mode, payload.key);
  if (cached) return NextResponse.json({ text: cached, cached: true });

  // 2. 额度门控（仅缓存 miss、真调 DeepSeek 前才扣，归 analyze 池）
  const quota = await checkAiQuota(auth.userId, 'analyze');
  if (!quota.allowed) {
    return NextResponse.json(
      { error: quota.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 次数已达上限，请明天再试或升级会员' },
      { status: 429, headers: { 'X-RateLimit-Limit': String(quota.limit), 'Retry-After': '86400' } },
    );
  }

  // 3. 调 DeepSeek
  const prompt = buildPrompt(payload);
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      thinking: { type: 'disabled' },
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 400,
    }),
    timeoutMs: 12000,
  });

  if (!res.ok) return NextResponse.json({ error: 'AI error' }, { status: 502 });

  const data = await res.json();
  const text = (data?.choices?.[0]?.message?.content ?? '').trim();
  if (!text) return NextResponse.json({ error: 'empty response' }, { status: 502 });

  // 4. 写缓存 + 记一次额度消耗（只有真打了 DeepSeek 才计）
  await writeCache(payload.mode, payload.key, text);
  await recordAiUsage(auth.userId, 'analyze');

  return NextResponse.json({ text, cached: false });
}
