/**
 * DeepSeek API client — called from server-side API routes.
 * Client code calls the Next.js API routes, which proxy to DeepSeek.
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash'; // 便宜快速，$0.14/M输入

export interface DeepSeekConfig {
  apiKey: string;
  model?: string;
}

/**
 * Translate Korean text to Chinese using DeepSeek.
 * Used from API route (server-side) to keep API key secure.
 */
export async function translateKoToZhDeepSeek(text: string, apiKey: string): Promise<string> {
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
          content: '你是一个韩语翻译助手。将用户输入的韩语翻译成中文。只返回中文翻译，不要任何解释。如果输入是单行多句，保持换行。',
        },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek translate error: ${res.status} ${err}`);
  }

  const json = await res.json();
  return json.choices[0].message.content.trim();
}

/**
 * Look up a Korean word via DeepSeek — returns structured word info.
 */
export async function lookupWordDeepSeek(
  word: string,
  apiKey: string
): Promise<{
  dictionaryForm: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  example: { text: string; translation: string };
}> {
  const res = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一个韩语词典。对给定的韩语单词，返回JSON格式：

{
  "dictionaryForm": "词典原形（基本形）",
  "pronunciation": "罗马音",
  "meaning": "中文释义",
  "partOfSpeech": "词性（动词/形容词/名词/副词/助词/感叹词/冠形词/代词/数词）",
  "example": {
    "text": "一句自然的韩语例句",
    "translation": "例句中文翻译"
  }
}

只返回JSON，不要markdown代码块，不要任何其他文字。确保输出是合法JSON。`,
        },
        { role: 'user', content: `查询单词：${word}` },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    throw new Error(`DeepSeek lookup error: ${res.status}`);
  }

  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  // Handle possible markdown code block
  const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Analyze a Korean sentence — returns full translation, word breakdown, grammar, particles.
 * Used by /api/ai/analyze.
 */
export async function analyzeSentenceDeepSeek(
  sentence: string,
  apiKey: string
): Promise<{
  fullTranslation: string;
  words: { text: string; pronunciation: string; meaning: string; partOfSpeech: string }[];
  grammar: { pattern: string; title: string; usage: string; explanation: string }[];
  particles: { text: string; explanation: string }[];
}> {
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
          content: `你是韩语教学专家。对给定的韩语句子，返回以下JSON格式：

{
  "fullTranslation": "整句中文翻译",
  "words": [
    {"text": "韩文词（保留原形变化）", "pronunciation": "罗马音", "meaning": "中文释义", "partOfSpeech": "词性（动词/形容词/名词/副词/助词/感叹词/冠形词/代词/数词/词尾）"}
  ],
  "grammar": [
    {"pattern": "语法句型", "title": "语法名称", "usage": "用法说明", "explanation": "详细解释"}
  ],
  "particles": [
    {"text": "助词", "explanation": "该助词在此句中的作用"}
  ]
}

逐词拆解，包括助词和词尾。语法分析识别句型模式。只返回JSON，不要markdown代码块。`,
        },
        { role: 'user', content: `分析这个韩语句子：${sentence}` },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek analyze error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Chat response for scenario-based conversation practice.
 * Used by /api/ai/chat.
 */
export async function chatResponseDeepSeek(
  params: {
    scenario: { nameZh: string; nameKo: string; level: string };
    context: { role: string; content: string }[];
    userMessage: string;
  },
  apiKey: string
): Promise<{
  aiResponse: { ko: string; zh: string };
  feedback: { natural: string; grammarError: string; betterWay: string };
}> {
  const scenarioDesc = `场景：${params.scenario.nameZh}（${params.scenario.nameKo}），难度：${params.scenario.level}`;
  const history = params.context
    .map((m) => `${m.role === 'ai' ? '店员/AI' : '用户'}: ${m.content}`)
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
          content: `你是韩语情景对话的AI对手（店员/路人等角色）。${scenarioDesc}

规则：
1. 用韩语回复用户，保持角色一致
2. 回复后提供3项中文反馈：表达自然度评价、语法错误提示、更地道的说法
3. 返回JSON格式：
{
  "aiResponse": {"ko": "韩语回复", "zh": "中文翻译"},
  "feedback": {"natural": "表达自然度评价", "grammarError": "语法错误或'无语法错误'", "betterWay": "更地道的说法"}
}
只返回JSON，不要markdown代码块。`,
        },
        { role: 'user', content: `对话历史：\n${history}\n\n用户最新消息：${params.userMessage}\n\n请以角色身份回复。` },
      ],
      temperature: 0.7,
      max_tokens: 800,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek chat error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Generate a personalized study plan based on user stats.
 * Used by /api/ai/plan.
 */
export async function generateStudyPlanDeepSeek(
  params: {
    targetLevel: string;
    xp: number;
    streak: number;
    wordStats: {
      total: number;
      mastered: number;
      learning: number;
      reviewing: number;
      newCount: number;
      weakWords: string[];
      categoryStrength: Record<string, { total: number; mastered: number }>;
    };
  },
  apiKey: string
): Promise<{
  dailyTips: string[];
  focusArea: string;
  motivation: string;
  nextWeekGoal: string;
}> {
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
          content: `你是韩语学习规划师。根据用户学习数据给出建议。返回JSON：
{
  "dailyTips": ["3-5条今日学习建议"],
  "focusArea": "当前最应专注的领域",
  "motivation": "一句鼓励的话",
  "nextWeekGoal": "下周学习目标建议"
}
只返回JSON。`,
        },
        {
          role: 'user',
          content: `目标等级：${params.targetLevel}，XP：${params.xp}，连续学习：${params.streak}天
词汇：总计${params.wordStats.total}，已掌握${params.wordStats.mastered}，学习中${params.wordStats.learning}，待复习${params.wordStats.reviewing}
薄弱词：${params.wordStats.weakWords.join(', ') || '无'}
词类分布：${JSON.stringify(params.wordStats.categoryStrength)}
请给出学习建议。`,
        },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek plan error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Translate an array of Korean sentences in bulk.
 */
export async function translateBatchDeepSeek(
  sentences: string[],
  apiKey: string
): Promise<string[]> {
  const delimiter = '\n---\n';
  const combined = sentences.join(delimiter);

  const res = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一个韩语翻译助手。请将以下${sentences.length}句韩语逐句翻译成中文。每句翻译之间用"---"分隔。只返回翻译内容，不要编号，不要解释。`,
        },
        { role: 'user', content: combined },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek batch translate error: ${res.status}`);

  const json = await res.json();
  const translations = json.choices[0].message.content
    .trim()
    .split(/---+|\n---+|\n---/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return translations;
}
