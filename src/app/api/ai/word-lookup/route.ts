import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getDb } from '@/lib/server/db';
import { filterContent } from '@/lib/contentFilter';
import { getAuthFromCookie } from '@/lib/server/auth';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

function isKorean(text: string): boolean {
  return /[가-힣ᄀ-ᇿ㄰-㆏]/.test(text);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  let input: string;
  try {
    const body = await req.json();
    input = (body.input || '').trim();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  if (!input) {
    return NextResponse.json({ error: '请输入单词' }, { status: 400 });
  }
  if (input.length > 50) {
    return NextResponse.json({ error: '单词不能超过50个字符' }, { status: 400 });
  }
  const wordCheck = filterContent(input, 'ai_input');
  if (!wordCheck.ok) {
    return NextResponse.json({ error: wordCheck.reason }, { status: 400 });
  }

  // Check cache first（v6 前缀：meanings 数组格式，与 v5 不兼容）
  const cacheKey = `v6:${input}`;
  try {
    const db = await getDb();
    const cached = await db.exec(
      'SELECT result FROM word_lookup_cache WHERE word = ?',
      [cacheKey]
    );
    const row = cached[0]?.values?.[0]?.[0];
    if (row) {
      return NextResponse.json(JSON.parse(row as string));
    }
  } catch {
    // Cache read failed — proceed to DeepSeek
  }

  const inputLang = isKorean(input) ? 'korean' : 'chinese';

  const systemPrompt = `你是韩语词典助手。用户输入一个${inputLang === 'korean' ? '韩文' : '中文'}单词或短语，请返回该词/短语的完整词典信息。

只返回如下结构的JSON对象，不要任何多余内容，不要markdown代码块：
{"korean":"...","romanization":"...","meanings":[{"chinese":"...","partOfSpeech":"..."}],"baseForm":"...","inflectionNote":"...","examples":[{"korean":"...","chinese":"..."},{"korean":"...","chinese":"..."}]}

字段说明：
- korean: 用户输入的完整韩文写法（若输入是短语则保留完整短语，不要截断）
- romanization: 原型词的修正罗马字转写（Revised Romanization）
- meanings: 中文释义数组。这个词不管有几个义项、不管生僻还是常用，**全部列出，一个都不能少**。每项 chinese ≤15字，partOfSpeech 从【名词、动词、形容词、副词、感叹词、助词、短语】中选。比如 배 必须有 梨、船、肚子、倍（四倍/十倍）、胚胎（배아）至少5个义项。
**绝对不能瞎编不存在的义项或含义**。如果你不确定某个义项是否真的存在，宁可少列也不要凭空捏造。
- baseForm: 词典原型（동사/형용사以다结尾的基本形）。若输入本身已是原型，则与korean相同
- inflectionNote: 简短说明变形规则（15字以内），例如"하다动词 + -아/어요，现在时敬语"、"으불규칙 + -아서，原因"。若输入已是原型则留空字符串
- examples: 2个包含该词/短语的自然例句，每个含korean（韩文句子）和chinese（中文翻译）`;

  const userMsg = inputLang === 'korean'
    ? `请给出"${input}"的词典信息`
    : `请给出"${input}"对应的韩文单词及词典信息`;

  try {
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 20_000,
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
        max_tokens: 1000,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 502 });
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content?.trim() ?? '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleaned);

    if (!result.korean) {
      return NextResponse.json({ error: '未能识别该单词，请检查输入' }, { status: 422 });
    }

    // 标准化 meanings：优先用 AI 返回的数组，回落到旧 meaning 字段
    type RawMeaning = { chinese?: string; partOfSpeech?: string };
    let meanings: { chinese: string; partOfSpeech: string }[] = [];
    if (Array.isArray(result.meanings)) {
      meanings = (result.meanings as RawMeaning[])
        .filter((m): m is RawMeaning => !!m && typeof m.chinese === 'string' && m.chinese.trim().length > 0)
        .map((m) => ({ chinese: String(m.chinese).trim(), partOfSpeech: String(m.partOfSpeech || '').trim() }));
    }
    if (meanings.length === 0 && typeof result.meaning === 'string' && result.meaning.trim()) {
      meanings = [{ chinese: result.meaning.trim(), partOfSpeech: String(result.partOfSpeech || '').trim() }];
    }
    if (meanings.length === 0) {
      return NextResponse.json({ error: '未能识别该单词，请检查输入' }, { status: 422 });
    }

    const meaningJoined = meanings.map((m) => m.chinese).join('；');
    const primaryPos = meanings[0].partOfSpeech || String(result.partOfSpeech || '');

    // AI 偶尔把韩文塞到 romanization —— 只保留纯拉丁/空格/连字符/撇号，含韩文即丢弃
    const rawRoman = String(result.romanization || '');
    const isValidRoman = rawRoman.length > 0 && !/[가-힣ᄀ-ᇿ㄰-㆏]/.test(rawRoman);

    const resultObj = {
      korean: String(result.korean),
      romanization: isValidRoman ? rawRoman : '',
      meaning: meaningJoined,           // 兜底单行
      meanings,                          // 多义数组
      partOfSpeech: primaryPos,
      baseForm: String(result.baseForm || result.korean || ''),
      inflectionNote: String(result.inflectionNote || ''),
      // 例句语言方向校验：korean 必须含韩文，chinese 必须含中文；否则整条例句丢弃
      examples: Array.isArray(result.examples)
        ? result.examples
            .filter((ex: any) => ex && typeof ex.korean === 'string' && typeof ex.chinese === 'string'
              && /[가-힣]/.test(ex.korean) && /[一-龥]/.test(ex.chinese))
            .slice(0, 2)
        : [],
    };

    // Write to cache (fire and forget)
    try {
      const db = await getDb();
      await db.run(
        'INSERT OR IGNORE INTO word_lookup_cache (word, result, created_at) VALUES (?, ?, ?)',
        [cacheKey, JSON.stringify(resultObj), Date.now()]
      );
    } catch {
      // Cache write failed — not critical
    }

    return NextResponse.json(resultObj);
  } catch (err: any) {
    if (err?.name === 'SyntaxError') {
      return NextResponse.json({ error: 'AI返回格式异常，请重试' }, { status: 502 });
    }
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
