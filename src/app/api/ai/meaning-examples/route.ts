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
const CONFIDENCE_THRESHOLD = 0.85;
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface Body {
  [k: string]: unknown;
  word: string;
  baseForm?: string;
  meaningChinese: string;
  meaningPartOfSpeech?: string;
  allMeanings?: string[];      // 该词所有义项（含 meaningChinese），让 verify 在闭集里选
}

interface ExamplePair {
  [k: string]: unknown;
  korean: string;
  chinese: string;
}

function normalizeForCompare(s: string): string {
  return s.trim().toLowerCase().replace(/[\s，。、；;,/]/g, '');
}

// 比对 AI 自报义项 与 请求义项 是否实质一致
// 短义项（≤2 字）必须严格相等，避免"梨" 误等 "梨木"；
// 长义项允许子串包含（"梨子" ↔ "梨"），但只允许在 a 或 b 之一是 ≤4 字时
function meaningMatches(asked: string, actual: string): boolean {
  const a = normalizeForCompare(asked);
  const b = normalizeForCompare(actual);
  if (!a || !b) return false;
  if (a === b) return true;
  // 短词必须严格相等
  if (a.length <= 2 || b.length <= 2) return false;
  // 子串匹配仅在一方较短（≤4 字）时允许，且要求是"核心义项词"层级的相似，而不是包含关系
  // 例：a="梨子" b="梨" → 短的那一方为 a/b 的子串 + 短者 ≤4 字
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;
  if (shorter.length <= 4 && longer.includes(shorter)) return true;
  return false;
}

async function chatJson<T>(apiKey: string, system: string, user: string, maxTokens: number): Promise<T> {
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 20_000,
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      thinking: { type: 'disabled' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      max_tokens: maxTokens,
    }),
  });
  if (!res.ok) throw new Error(`upstream_${res.status}`);
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content?.trim() ?? '';
  const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as T;
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const word = (body.word || '').trim();
  const baseForm = (body.baseForm || word).trim();
  const meaningChinese = (body.meaningChinese || '').trim();
  const pos = (body.meaningPartOfSpeech || '').trim();
  const allMeanings = Array.isArray(body.allMeanings)
    ? body.allMeanings.map((s) => String(s).trim()).filter((s) => s.length > 0 && s.length <= 30).slice(0, 8)
    : [];

  if (!word || !meaningChinese) {
    return NextResponse.json({ error: '参数缺失' }, { status: 400 });
  }
  if (word.length > 50 || meaningChinese.length > 30) {
    return NextResponse.json({ error: '参数超长' }, { status: 400 });
  }
  const c1 = filterContent(word, 'ai_input');
  if (!c1.ok) return NextResponse.json({ error: c1.reason }, { status: 400 });
  const c2 = filterContent(meaningChinese, 'ai_input');
  if (!c2.ok) return NextResponse.json({ error: c2.reason }, { status: 400 });

  // 缓存 key：义项指纹 + 候选集摘要（避免不同候选集复用错缓存）
  // 候选集兜底加上 meaningChinese 本身，与 Step 2 verify 闭集保持一致
  const candidatesForKey = Array.from(new Set([meaningChinese, ...allMeanings]));
  const candidatesHash = candidatesForKey.slice().sort().join('|');
  const cacheKey = `${baseForm}::${meaningChinese}::${pos}::${candidatesHash}`;

  // 缓存命中（带 TTL 校验）
  try {
    const db = await getDb();
    const cached = await db.exec(
      'SELECT result, created_at FROM meaning_example_cache WHERE key = ?',
      [cacheKey]
    );
    const row = cached[0]?.values?.[0];
    if (row) {
      const result = row[0] as string;
      const createdAt = Number(row[1]);
      if (Date.now() - createdAt < CACHE_TTL_MS) {
        return NextResponse.json(JSON.parse(result));
      }
    }
  } catch { /* fall through */ }

  // 额度门控（仅缓存 miss、真调 DeepSeek 前才扣，归 analyze 池）。
  // 本请求可能连调多次 DeepSeek，但只记一次额度消耗。
  const quota = await checkAiQuota(auth.userId, 'analyze');
  if (!quota.allowed) {
    return NextResponse.json(
      { error: quota.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 次数已达上限，请明天再试或升级会员' },
      { status: 429, headers: { 'X-RateLimit-Limit': String(quota.limit), 'Retry-After': '86400' } },
    );
  }
  await recordAiUsage(auth.userId, 'analyze');

  // ── Step 1：生成 + 自评 confidence ──
  const genSystem = `你是韩语词典助手，专门为多义词的特定义项造例句。

任务：为韩语词「${word}」在「${meaningChinese}」这一义项下，生成 2 句自然、地道的例句。

严格要求：
1. 句中的「${word}」必须确切表达「${meaningChinese}」这个意思，不能是该词的其它义项。
2. 例句必须自然、符合现代韩语母语者的真实用法，不要造作。
3. 如果该义项太冷门、太抽象、或与「${word}」实际用法不匹配，宁可返回空数组（不要硬造）。
4. 每个例句给一个 confidence 0~1，表示你对"该句确实在使用此义项"的把握。0.85 以下视为不可靠。

只返回 JSON，不要任何多余内容、不要 markdown 代码块：
{"examples":[{"korean":"...","chinese":"...","confidence":0.95},{"korean":"...","chinese":"...","confidence":0.92}]}

若该义项不适合造句：
{"examples":[],"reason":"too_abstract" 或 "too_rare" 或 "ambiguous"}`;

  const genUser = `词：${word}\n义项：${meaningChinese}${pos ? `（${pos}）` : ''}`;

  type GenResult = {
    examples?: Array<{ korean?: string; chinese?: string; confidence?: number }>;
    reason?: string;
  };

  let gen: GenResult;
  try {
    gen = await chatJson<GenResult>(apiKey, genSystem, genUser, 600);
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.startsWith('upstream_')) {
      return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 502 });
    }
    return NextResponse.json({ examples: [], reason: 'ai_parse_failed' });
  }

  const rawExamples = Array.isArray(gen.examples) ? gen.examples : [];
  const passed: ExamplePair[] = [];
  for (const ex of rawExamples) {
    const k = (ex.korean || '').trim();
    const z = (ex.chinese || '').trim();
    const conf = typeof ex.confidence === 'number' ? ex.confidence : 0;
    if (!k || !z) continue;
    if (conf < CONFIDENCE_THRESHOLD) continue;
    // 确保例句确实包含目标词（或其原型/变形）
    if (!k.includes(word) && !k.includes(baseForm.replace(/다$/, ''))) continue;
    passed.push({ korean: k, chinese: z });
  }

  if (passed.length === 0) {
    const empty = { examples: [] as ExamplePair[], reason: gen.reason || 'low_confidence' };
    // 空结果也缓存，避免反复消耗
    try {
      const db = await getDb();
      await db.run(
        'INSERT OR REPLACE INTO meaning_example_cache (key, result, created_at) VALUES (?, ?, ?)',
        [cacheKey, JSON.stringify(empty), Date.now()]
      );
    } catch { /* not critical */ }
    return NextResponse.json(empty);
  }

  // ── Step 2：交叉验证 — 让 AI 反过来说每句用的是什么意思 ──
  // 候选集服务端兜底：始终把 meaningChinese 加入，避免前端漏传时 prompt 闭集错位
  const fullCandidates = Array.from(new Set([meaningChinese, ...allMeanings]));
  const candidatesNote = fullCandidates.length > 1
    ? `\n3. 该词的所有候选义项是：${fullCandidates.map((m) => `「${m}」`).join('、')}。请只在这些候选中选一个；如果哪一句无法清楚归到任何候选，请返回 "meaning": "unclear"。`
    : '';
  const verifySystem = `你是韩语词典助手。下面给你若干韩语例句，每句都包含「${word}」这个词。请只判断"该词在这句话里用的是什么意思"。

回答严格要求：
1. 只返回义项的中文核心释义，2-6 字简短，例如"梨"、"船"、"肚子"，不带词性、不写解释。
2. 严格按例句的实际用法判断，不要被预设义项影响。${candidatesNote}

只返回 JSON：[{"i":0,"meaning":"..."},{"i":1,"meaning":"..."}]`;

  const verifyUser = passed.map((p, i) => `${i}. ${p.korean}`).join('\n');

  type VerifyResult = Array<{ i?: number; meaning?: string }>;
  let verify: VerifyResult = [];
  try {
    verify = await chatJson<VerifyResult>(apiKey, verifySystem, verifyUser, 200);
  } catch {
    // 验证调用失败 → 保守拒绝（短缓存 1 小时，给上游恢复机会）
    const empty = { examples: [] as ExamplePair[], reason: 'verify_failed' };
    try {
      const db = await getDb();
      // 故意把 created_at 写成"1 小时前 + TTL"差值，让缓存只活 1 小时
      // 实现：写 created_at = now - (TTL - 1h)，剩余存活 1h
      const shortLifeStart = Date.now() - (CACHE_TTL_MS - 60 * 60 * 1000);
      await db.run(
        'INSERT OR REPLACE INTO meaning_example_cache (key, result, created_at) VALUES (?, ?, ?)',
        [cacheKey, JSON.stringify(empty), shortLifeStart]
      );
    } catch { /* not critical */ }
    return NextResponse.json(empty);
  }

  const verifiedExamples: ExamplePair[] = [];
  const unmatched: { passedIdx: number; actual: string }[] = [];
  for (let i = 0; i < passed.length; i++) {
    const v = verify.find((x) => x.i === i);
    const actual = (v?.meaning || '').trim();
    if (!actual) continue;
    if (meaningMatches(meaningChinese, actual)) {
      verifiedExamples.push(passed[i]);
    } else {
      unmatched.push({ passedIdx: i, actual });
    }
  }

  // Step 2.5：字符串不严格匹配时，追加 AI 同义判定救回近义反答
  // 例："什么地方"↔AI 反答"哪里"、"梨子"↔"梨" — 字符串匹配拒但语义相同
  if (unmatched.length > 0) {
    const synSystem = `你是中文语义判定助手。给你若干对中文简短义项，判定每一对是否指同一个概念。

规则：
- 同义或高度重合（如"哪里"↔"什么地方"、"梨"↔"梨子"、"某处"↔"某个地方"）→ true
- 仅"相关"或"上下位"（如"水果"↔"梨"、"动物"↔"猫"）→ false
- 义项完全不同（如"梨"↔"船"）→ false

只返回 JSON 数组，不要 markdown：[{"i":0,"same":true},{"i":1,"same":false}]`;
    const synUser = unmatched.map((u, idx) => `${idx}. 「${meaningChinese}」 vs 「${u.actual}」`).join('\n');
    type SynResult = Array<{ i?: number; same?: boolean }>;
    try {
      const syn = await chatJson<SynResult>(apiKey, synSystem, synUser, 300);
      for (let idx = 0; idx < unmatched.length; idx++) {
        const s = syn.find((x) => x.i === idx);
        if (s?.same === true) {
          verifiedExamples.push(passed[unmatched[idx].passedIdx]);
        }
      }
    } catch { /* 同义判定失败则 unmatched 保持被拒 */ }
  }

  // 严格门槛：任何一句失败都视作整组不可靠
  const finalExamples = verifiedExamples.length === passed.length ? verifiedExamples : [];
  const resultObj = finalExamples.length > 0
    ? { examples: finalExamples }
    : { examples: [] as ExamplePair[], reason: 'verify_mismatch' };

  // 写缓存
  try {
    const db = await getDb();
    await db.run(
      'INSERT OR REPLACE INTO meaning_example_cache (key, result, created_at) VALUES (?, ?, ?)',
      [cacheKey, JSON.stringify(resultObj), Date.now()]
    );
  } catch { /* not critical */ }

  return NextResponse.json(resultObj);
}
