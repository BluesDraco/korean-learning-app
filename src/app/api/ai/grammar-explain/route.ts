import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getDb } from '@/lib/server/db';
import { filterContent } from '@/lib/contentFilter';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiQuota } from '@/lib/server/membership';
import { recordAiUsage } from '@/lib/server/rate-limit';

export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

interface GrammarParticle {
  [k: string]: unknown;
  text: string;
  role: string;
}
interface GrammarEnding {
  [k: string]: unknown;
  text: string;
  base: string;
  meaning: string;
}
interface GrammarExplain {
  [k: string]: unknown;
  skeleton: { subject: string; predicate: string; object: string };
  translation: string;
  particles: GrammarParticle[];
  endings: GrammarEnding[];
  pitfalls: string[];
}

function normalizeKey(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[.。?？!！]+\s*$/g, '')
    .trim();
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  let sentence = '';
  let translation = '';
  try {
    const body = await req.json();
    sentence = normalizeKey(String(body.sentence || ''));
    translation = String(body.translation || '').trim();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  if (!sentence) return NextResponse.json({ error: '缺少句子' }, { status: 400 });
  if (sentence.length > 120) return NextResponse.json({ error: '句子过长（≤120字）' }, { status: 400 });
  if (!/[가-힣]/.test(sentence)) return NextResponse.json({ error: '请输入韩文句子' }, { status: 400 });

  const check = filterContent(sentence, 'ai_input');
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });

  try {
    const db = await getDb();
    const cached = await db.exec(
      'SELECT result FROM grammar_explain_cache WHERE sentence = ?',
      [sentence]
    );
    const row = cached[0]?.values?.[0]?.[0];
    if (row) return NextResponse.json(JSON.parse(row as string));
  } catch {
    /* cache miss */
  }

  // 额度门控（仅缓存 miss、真调 DeepSeek 前才扣，归 analyze 池）
  const quota = await checkAiQuota(auth.userId, 'analyze');
  if (!quota.allowed) {
    return NextResponse.json(
      { error: quota.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 次数已达上限，请明天再试或升级会员' },
      { status: 429, headers: { 'X-RateLimit-Limit': String(quota.limit), 'Retry-After': '86400' } },
    );
  }

  const systemPrompt = `你是面向中文母语者的韩语语法老师。给定一个韩语句子（可选附中文翻译），返回严格 JSON 的语法剖析。不要任何解释文字、不要 markdown 代码块。

JSON 格式：
{"skeleton":{"subject":"...","predicate":"...","object":"..."},"translation":"...","particles":[{"text":"은","role":"主题助词，标记话题"}],"endings":[{"text":"해요","base":"하다","meaning":"现在时敬语 -아/어요"}],"pitfalls":["..."]}

字段要求：
- skeleton.subject 主语韩文（无主语写空字符串），predicate 谓语韩文（含变化），object 宾语韩文（没有写空字符串）
- translation：自然中文翻译，≤25字。若用户已传入翻译，使用它
- particles：句中出现的助词（은/는/이/가/을/를/에/에서/도/만/와/과/하고/이랑/처럼/께/한테/부터/까지 等）。每项 text=韩文助词原样，role=作用 ≤15字。无助词时返回空数组
- endings：动词/形容词词尾变化，最多 3 个。text=屈折后的形式（如 했어요），base=原型（如 하다），meaning=语法点 ≤20字
- pitfalls：中文母语者易错点 1-2 条，每条 ≤30字。无明显易错点返回空数组

关键约束：
1. particles 里的 text 必须真实在句子里出现过
2. endings.base 必须是真实韩语原型，以 다 结尾
3. translation 准确不臆造
4. 全部返回中文解释，韩文部分保留韩文`;

  const userMsg = translation
    ? `句子：${sentence}\n参考翻译：${translation}`
    : `句子：${sentence}`;

  try {
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 25_000,
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg },
        ],
        temperature: 0.1,
        max_tokens: 700,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 502 });
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content?.trim() ?? '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: 'AI返回格式异常，请重试' }, { status: 502 });
    }

    const p = parsed as Partial<GrammarExplain>;
    if (!p.skeleton || typeof p.skeleton !== 'object' || typeof p.translation !== 'string') {
      return NextResponse.json({ error: 'AI返回字段缺失，请重试' }, { status: 502 });
    }

    const particles = Array.isArray(p.particles)
      ? p.particles
          .filter((x): x is GrammarParticle => !!x && typeof x.text === 'string' && typeof x.role === 'string')
          .filter((x) => sentence.includes(x.text))
          .slice(0, 8)
      : [];

    const endings = Array.isArray(p.endings)
      ? p.endings
          .filter((x): x is GrammarEnding => !!x && typeof x.text === 'string' && typeof x.base === 'string' && typeof x.meaning === 'string')
          .filter((x) => x.base.endsWith('다'))
          .slice(0, 3)
      : [];

    const pitfalls = Array.isArray(p.pitfalls)
      ? p.pitfalls.filter((x): x is string => typeof x === 'string' && x.length > 0 && x.length <= 60).slice(0, 3)
      : [];

    const result: GrammarExplain = {
      skeleton: {
        subject: String(p.skeleton.subject ?? ''),
        predicate: String(p.skeleton.predicate ?? ''),
        object: String(p.skeleton.object ?? ''),
      },
      translation: String(p.translation).slice(0, 80),
      particles,
      endings,
      pitfalls,
    };

    try {
      const db = await getDb();
      await db.run(
        'INSERT OR IGNORE INTO grammar_explain_cache (sentence, result, created_at) VALUES (?, ?, ?)',
        [sentence, JSON.stringify(result), Date.now()]
      );
    } catch {
      /* cache write fail not critical */
    }

    await recordAiUsage(auth.userId, 'analyze');
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
