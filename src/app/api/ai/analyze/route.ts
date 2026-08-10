import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';
import { getDb } from '@/lib/server/db';
import { filterContent } from '@/lib/contentFilter';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

// In-memory guest rate limit: key = "ip:date", value = call count
const guestAnalyzeCount = new Map<string, number>();

// Prune yesterday's entries once per day
let lastPruneDate = '';
function pruneGuestCount() {
  const today = new Date().toISOString().slice(0, 10);
  if (today === lastPruneDate) return;
  lastPruneDate = today;
  for (const key of guestAnalyzeCount.keys()) {
    if (!key.endsWith(today)) guestAnalyzeCount.delete(key);
  }
}

/**
 * 矫正 AI 返回的 schema —— DeepSeek 偶尔会把数组返回成字符串、对象或 null。
 * 前端直接 .map / .filter 会 TypeError 白屏。这里把所有数组字段强制成数组。
 */
function sanitizeAnalyzeResult(result: Record<string, unknown>): Record<string, unknown> {
  const r: Record<string, unknown> = { ...result };
  const arrayFields = ['words', 'particles', 'grammar', 'sentences', 'structure', 'cultureNotes', 'quiz', 'alternativeTranslations'];
  for (const f of arrayFields) {
    if (!Array.isArray(r[f])) {
      r[f] = [];
    }
  }
  // quiz 硬校验：任何一条不合规就丢弃，避免给用户展示错题。
  // 规则：options 必须是 4 个非空字符串且互不相同（去空格/大小写归一化后仍互不相同）；
  //       correctIndex 必须是 0-3 的整数；question 与 explanation 都要有内容。
  if (Array.isArray(r.quiz)) {
    r.quiz = (r.quiz as unknown[]).filter((q): q is Record<string, unknown> => {
      if (!q || typeof q !== 'object') return false;
      const item = q as Record<string, unknown>;
      if (!Array.isArray(item.options) || item.options.length !== 4) return false;
      const opts = item.options as unknown[];
      const normalized: string[] = [];
      for (const o of opts) {
        if (typeof o !== 'string') return false;
        const trimmed = o.trim();
        if (!trimmed) return false;
        normalized.push(trimmed.toLowerCase().replace(/\s+/g, ''));
      }
      if (new Set(normalized).size !== 4) return false; // 有重复/歧义选项，丢弃
      const idx = item.correctIndex;
      if (typeof idx !== 'number' || !Number.isInteger(idx) || idx < 0 || idx > 3) return false;
      if (typeof item.question !== 'string' || !item.question.trim()) return false;
      if (typeof item.explanation !== 'string' || !item.explanation.trim()) return false;
      return true;
    });
  }
  // alternativeTranslations 每项必须有 ko + context
  if (Array.isArray(r.alternativeTranslations)) {
    r.alternativeTranslations = (r.alternativeTranslations as unknown[])
      .filter((a): a is Record<string, unknown> => {
        if (!a || typeof a !== 'object') return false;
        const item = a as Record<string, unknown>;
        return typeof item.ko === 'string' && item.ko.length > 0;
      });
  }
  return r;
}

// 语言检测：韩文字符占比 > 30% 视为韩文输入
function detectIsKoreanInput(text: string): boolean {
  const koreanChars = (text.match(/[가-힣]/g) || []).length;
  const totalNonSpace = text.replace(/\s/g, '').length;
  if (totalNonSpace === 0) return true; // 空文本默认按韩文处理
  return koreanChars / totalNonSpace > 0.3;
}

async function analyzeModeLearn(sentence: string, apiKey: string): Promise<Record<string, unknown>> {
  const isKoreanInput = detectIsKoreanInput(sentence);

  const koPrompt = `你是韩语教学专家。对给定的韩语句子，进行紧凑教学拆解，返回以下JSON格式：

{
  "mode": "learn",
  "direction": "ko-zh",
  "romanization": "整句罗马音（必填）",
  "fullTranslation": "自然中文翻译",
  "literalTranslation": "逐字直译（保留韩文语序，体现助词作用）",
  "structure": [
    {"role": "主语|谓语|宾语|修饰", "text": "韩文片段（含助词）", "meaning": "中文对应"}
  ],
  "words": [
    {"text": "韩文词（原形）", "romanization": "罗马音", "partOfSpeech": "动词|形容词|名词|副词|代词|数词|冠形词|感叹词", "meaning": "中文释义", "emoji": "代表emoji", "examples": [{"ko": "另造韩文例句1", "zh": "中文翻译1"}, {"ko": "另造韩文例句2", "zh": "中文翻译2"}]}
  ],
  "grammar": [
    {
      "pattern": "语法句型（如 ~은/는、~아/어 보다）",
      "title": "语法名称",
      "level": "初级|中级|高级",
      "meaning": "核心意思（一句话）",
      "usage": "使用场景说明",
      "conjugation": [
        {"form": "活用规则（如：辅音收尾 + 은）", "example": "韩文示例"}
      ],
      "contrast": "与近似语法的对比（如：vs ~이/가：...）。没有就留空字符串",
      "mistake": "学习者常见错误（一句话）。没有就留空字符串",
      "examples": [{"ko": "韩文例句1", "zh": "中文翻译1"}, {"ko": "韩文例句2", "zh": "中文翻译2"}]
    }
  ],
  "particles": [
    {"text": "助词", "explanation": "在此句中的作用"}
  ]
}

要求：
- structure 数组按句子词序，缺少的角色不要硬填
- words 挑 3-5 个关键词（助词单独入 particles），每个词至少 1 条例句（韩+中双语）
- grammar 挑 1-2 个核心句型，conjugation 至少 2 行（如：元音收尾/辅音收尾）
- 罗马音用国家标准罗马字（如 안녕 → annyeong）
- 所有例句必须是 { ko, zh } 对象，不允许纯字符串
- 只返回JSON，不要markdown代码块`;

  const zhPrompt = `你是韩语教学专家。用户输入了中文，你要把它翻译成自然的韩语，并给出学习韩语所需的拆解。返回以下JSON格式：

{
  "mode": "learn",
  "direction": "zh-ko",
  "originalChinese": "用户输入的原中文",
  "fullTranslation": "自然的韩语翻译（这是学习者要学会说的韩语）",
  "alternativeTranslations": [
    {"ko": "另一种韩语说法（敬语）", "context": "正式场合"},
    {"ko": "另一种韩语说法（半语）", "context": "朋友之间"}
  ],
  "romanization": "韩语翻译的整句罗马音",
  "literalTranslation": "韩语翻译逐字对应中文（帮助理解韩语语序）",
  "structure": [
    {"role": "主语|谓语|宾语|修饰", "text": "韩文片段（含助词）", "meaning": "中文对应"}
  ],
  "words": [
    {"text": "韩语单词（原形，来自 fullTranslation）", "romanization": "罗马音", "partOfSpeech": "动词|形容词|名词|副词|代词|数词|冠形词|感叹词", "meaning": "中文释义", "emoji": "代表emoji", "examples": [{"ko": "另造韩文例句1", "zh": "中文翻译1"}, {"ko": "另造韩文例句2", "zh": "中文翻译2"}]}
  ],
  "grammar": [
    {
      "pattern": "语法句型",
      "title": "语法名称",
      "level": "初级|中级|高级",
      "meaning": "核心意思（一句话）",
      "usage": "使用场景说明",
      "conjugation": [{"form": "活用规则", "example": "韩文示例"}],
      "contrast": "与近似语法的对比。没有就留空字符串",
      "mistake": "学习者常见错误。没有就留空字符串",
      "examples": [{"ko": "韩文例句1", "zh": "中文翻译1"}, {"ko": "韩文例句2", "zh": "中文翻译2"}]
    }
  ],
  "particles": [
    {"text": "助词", "explanation": "在此句中的作用"}
  ]
}

要求：
- fullTranslation 必须是纯韩语（含韩文字符），符合自然口语习惯
- alternativeTranslations 至少包含 2 种不同场景/语气的韩语说法（如敬语 vs 半语、正式 vs 随意），每种标注 context 场景
- structure / words / particles 全部来自 fullTranslation（韩语翻译），而不是原中文
- words 挑 3-5 个韩语关键词，每个词至少 1 条例句（韩+中双语）
- grammar 挑 1-2 个能表达该中文含义的核心韩语句型
- 所有例句必须是 { ko, zh } 对象
- 罗马音用国家标准罗马字
- 只返回JSON，不要markdown代码块`;

  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 30_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      thinking: { type: 'disabled' },
      messages: [
        { role: 'system', content: isKoreanInput ? koPrompt : zhPrompt },
        {
          role: 'user',
          content: isKoreanInput
            ? `分析这个韩语句子：${sentence}`
            : `把这句中文翻译成韩语并拆解学习点：${sentence}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2500,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek learn analyze error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  return JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim());
}

async function analyzeModeDeep(text: string, apiKey: string): Promise<Record<string, unknown>> {
  const isKoreanInput = detectIsKoreanInput(text);

  const koDeepPrompt = `你是韩语阅读教学专家。对给定的韩文段落/文章，做篇章级深度解析，返回完整阅读报告JSON：

{
  "mode": "deep",
  "direction": "ko-zh",
  "overview": {
    "topic": "一句话主题（10-20字）",
    "tone": "语气（如：随意口语 / 正式书面 / 抒情）",
    "scenario": "场景（如：朋友对话 / 新闻报道 / 个人日记）"
  },
  "difficulty": "初级|中级|高级",
  "difficultyReason": "判断依据（1-2句，提到关键语法点或词汇TOPIK级别）",
  "fullTranslation": "完整中文翻译（逐句翻译，保持段落结构）",
  "sentences": [
    {"korean": "原句", "chinese": "中文翻译", "structure": "句子结构简析（如：主+谓+宾 / 复句：原因+结果）"}
  ],
  "words": [
    {
      "text": "韩文词（原形）",
      "romanization": "罗马音",
      "partOfSpeech": "词性",
      "meaning": "中文释义",
      "importance": "核心|常用|进阶",
      "examples": [{"ko": "韩文例句1", "zh": "中文翻译1"}, {"ko": "韩文例句2", "zh": "中文翻译2"}],
      "synonyms": ["近义词1", "近义词2"]
    }
  ],
  "grammar": [
    {
      "pattern": "语法句型",
      "title": "名称",
      "level": "初级|中级|高级",
      "meaning": "核心意思",
      "usage": "使用场景",
      "conjugation": [{"form": "活用规则", "example": "示例"}],
      "examples": [{"ko": "原文中的用法", "zh": "中文翻译"}, {"ko": "教学例句1", "zh": "中文翻译1"}, {"ko": "教学例句2", "zh": "中文翻译2"}],
      "mistake": "常见错误（没有就空字符串）",
      "contrast": "与近似语法的对比（没有就空字符串）"
    }
  ],
  "cultureNotes": [
    {"anchor": "原文表达", "explanation": "文化/惯用背景说明（为什么这么说）"}
  ],
  "quiz": [
    {
      "type": "meaning|cloze|translate|grammar",
      "question": "题目（中文出题）",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctIndex": 0,
      "explanation": "为什么对/错（一句话）",
      "wordHint": "若 type=meaning 或 cloze，关联的韩文词或句型"
    }
  ],
  "suggestion": "学完最值得保存的 2-3 个词或句型（中文，简短）"
}`;

  const zhDeepPrompt = `你是韩语教学专家。用户输入了中文段落/文章，你要把它翻译成自然的韩语，并做篇章级深度解析，返回完整学习报告JSON：

{
  "mode": "deep",
  "direction": "zh-ko",
  "originalChinese": "用户输入的原中文",
  "overview": {
    "topic": "一句话主题（10-20字）",
    "tone": "语气（如：随意口语 / 正式书面 / 抒情）",
    "scenario": "场景（如：朋友对话 / 新闻报道 / 个人日记）"
  },
  "difficulty": "初级|中级|高级",
  "difficultyReason": "判断依据（1-2句，提到关键语法点或词汇TOPIK级别）",
  "fullTranslation": "完整韩语翻译（逐句翻译，保持段落结构）",
  "sentences": [
    {"korean": "韩语翻译句", "chinese": "原中文对应句", "structure": "句子结构简析（如：主+谓+宾 / 复句：原因+结果）"}
  ],
  "words": [
    {
      "text": "韩语单词（原形，来自 fullTranslation）",
      "romanization": "罗马音",
      "partOfSpeech": "词性",
      "meaning": "中文释义",
      "importance": "核心|常用|进阶",
      "examples": [{"ko": "韩文例句1", "zh": "中文翻译1"}, {"ko": "韩文例句2", "zh": "中文翻译2"}],
      "synonyms": ["近义词1", "近义词2"]
    }
  ],
  "grammar": [
    {
      "pattern": "语法句型",
      "title": "名称",
      "level": "初级|中级|高级",
      "meaning": "核心意思",
      "usage": "使用场景",
      "conjugation": [{"form": "活用规则", "example": "示例"}],
      "examples": [{"ko": "韩文例句1", "zh": "中文翻译1"}, {"ko": "韩文例句2", "zh": "中文翻译2"}],
      "mistake": "常见错误（没有就空字符串）",
      "contrast": "与近似语法的对比（没有就空字符串）"
    }
  ],
  "cultureNotes": [
    {"anchor": "关键表达", "explanation": "文化/惯用背景说明（为什么这么说）"}
  ],
  "quiz": [
    {
      "type": "meaning|cloze|translate|grammar",
      "question": "题目（中文出题，考查韩语学习）",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctIndex": 0,
      "explanation": "为什么对/错（一句话）",
      "wordHint": "若 type=meaning 或 cloze，关联的韩文词或句型"
    }
  ],
  "suggestion": "学完最值得保存的 2-3 个词或句型（中文，简短）"
}`;

  const userContent = isKoreanInput
    ? `分析这段韩文：\n\n${text}`
    : `把这句中文翻译成韩语并拆解学习点：${text}`;

  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 45_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      thinking: { type: 'disabled' },
      messages: [
        {
          role: 'system',
          content: `你是韩语${isKoreanInput ? '阅读' : ''}教学专家。以下要求严格遵守，返回完整阅读报告JSON：\n\n${isKoreanInput ? koDeepPrompt : zhDeepPrompt}

要求：
- sentences ${isKoreanInput ? '5-15 句（按原文断句）' : '按原文断句（每句中文对应一句韩语翻译）'}
- words 10-20 个，按 importance 排序（核心在前）：核心=理解全文必备、常用=日常高频、进阶=可选扩展
- grammar 2-4 个，conjugation 至少 2 行
- cultureNotes 仅在确实有文化/惯用背景时返回（0-3 个）。不确定就返回空数组，绝对不要瞎编
- quiz 出 5 道题，4 种题型尽量分布：
  · meaning：选词义（给韩文词，4 个中文释义选 1）
  · cloze：完形填空（句子挖一个词，4 选 1 韩文）
  · translate：翻译选择（给原文一句，4 个${isKoreanInput ? '中译' : '韩译'}选 1）
  · grammar：找语法（给原文一句，4 选 1 语法点）
  options 每题都是 4 个，correctIndex 是 0-3 的索引
  **出题硬性要求（违反会被拦截丢弃）：**
  1. options 4 个必须互不相同（不能有重复选项、也不能改标点大小写伪装成不同）
  2. correctIndex 对应的选项必须**唯一正确**，其他 3 个必须**明确错误可辨别**，不允许"两个都对"或"都能勉强讲通"的歧义题
  3. 干扰项要有教学意义（比如近义词混淆、易错语法点、常见错译），不能塞明显不搭的选项凑数
  4. explanation 必填：一句话讲清楚为什么 correctIndex 对、其他为什么错
  5. 出题前自查：把 correctIndex 换成其他任一个索引，句子/含义是否明显错误？如果换了也能说通，说明题目歧义，需重出
- 罗马音用国家标准罗马字
- **所有例句必须是 { ko, zh } 对象，不允许纯字符串**
- 只返回JSON，不要markdown代码块`,
        },
        { role: 'user', content: userContent },
      ],
      temperature: 0.3,
      max_tokens: 6000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek deep analyze error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  return JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim());
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { sentence, mode } = await req.json();
    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json({ error: 'Missing sentence' }, { status: 400 });
    }
    if (sentence.length > 500) {
      return NextResponse.json({ error: '输入不能超过500个字符' }, { status: 400 });
    }
    const analyzeCheck = filterContent(sentence, 'ai_input');
    if (!analyzeCheck.ok) {
      return NextResponse.json({ error: analyzeCheck.reason }, { status: 400 });
    }

    const userId = auth.userId;

    // Guest rate limit: 10 calls per day tracked by IP in memory
    if (!userId) {
      pruneGuestCount();
      const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
      const today = new Date().toISOString().slice(0, 10);
      const key = `${ip}:${today}`;
      const count = guestAnalyzeCount.get(key) ?? 0;
      if (count >= 10) {
        return NextResponse.json(
          { error: '今日免费次数已用完（10次），请登录后继续使用' },
          { status: 429, headers: { 'Retry-After': '86400' } },
        );
      }
      guestAnalyzeCount.set(key, count + 1);
    } else {
      const limit = await checkAiRateLimit(userId, 'analyze');
      if (!limit.allowed) {
        return NextResponse.json(
          { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 拆解次数已达上限，请明天再试或升级会员' },
          { status: 429, headers: { 'X-RateLimit-Limit': String(limit.limit), 'Retry-After': '86400' } },
        );
      }
    }

    const effectiveMode = mode || 'learn';
    const isLong = sentence.replace(/\s/g, '').length >= 50;
    const resolvedMode = (effectiveMode === 'deep' && !isLong) ? 'learn' : effectiveMode;
    const TTL_MS = 30 * 24 * 60 * 60 * 1000;

    // Check analyze cache
    try {
      const db = await getDb();
      const cached = await db.exec(
        'SELECT result FROM analyze_cache WHERE text = ? AND mode = ? AND created_at > ?',
        [sentence.trim(), resolvedMode, Date.now() - TTL_MS]
      );
      const row = cached[0]?.values?.[0]?.[0];
      if (row) {
        if (userId) await recordAiUsage(userId, 'analyze');
        const parsed = JSON.parse(row as string);
        return NextResponse.json(resolvedMode !== effectiveMode ? { ...parsed, _downgraded: true } : parsed);
      }
    } catch { /* cache read failed, continue */ }

    let result: Record<string, unknown>;

    // Deep mode requires 50+ chars; downgrade to learn if too short
    if (resolvedMode === 'learn' && effectiveMode === 'deep') {
      result = await analyzeModeLearn(sentence, apiKey);
    } else if (resolvedMode === 'translate') {
      result = await analyzeModeTranslate(sentence, apiKey);
    } else if (resolvedMode === 'deep') {
      result = await analyzeModeDeep(sentence, apiKey);
    } else {
      result = await analyzeModeLearn(sentence, apiKey);
    }

    if (userId) await recordAiUsage(userId, 'analyze');

    // Write to cache (fire and forget)
    getDb().then(db => db.run(
      'INSERT OR REPLACE INTO analyze_cache (id, text, mode, result, created_at) VALUES (?, ?, ?, ?, ?)',
      [crypto.randomUUID(), sentence.trim(), resolvedMode, JSON.stringify(result), Date.now()]
    )).catch(() => {});

    return NextResponse.json(resolvedMode !== effectiveMode ? { ...result, _downgraded: true } : result);
  } catch (err: any) {
    console.error('[ai/analyze]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
