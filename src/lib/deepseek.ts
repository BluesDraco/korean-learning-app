/**
 * DeepSeek API client — called from server-side API routes.
 * Client code calls the Next.js API routes, which proxy to DeepSeek.
 */

import { fetchWithTimeout } from './fetch';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
export const DEEPSEEK_MODEL = 'deepseek-chat';
const AI_TIMEOUT = 30_000; // 30 seconds for AI requests

export interface DeepSeekConfig {
  apiKey: string;
  model?: string;
}

interface CallOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

/** Core API call — handles HTTP boilerplate shared by all 5 AI functions. */
async function callDeepSeek(
  messages: { role: string; content: string }[],
  apiKey: string,
  options: CallOptions = {}
): Promise<string> {
  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: options.timeoutMs ?? AI_TIMEOUT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 1000,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`DeepSeek error ${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  const content: string = json.choices[0].message.content ?? '';
  return content.trim();
}

/** Strip markdown code fences, parse JSON. */
function parseJsonResponse(content: string): unknown {
  const clean = content.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(clean);
}

/**
 * Translate Korean text to Chinese using DeepSeek.
 * Used from API route (server-side) to keep API key secure.
 */
export async function translateKoToZhDeepSeek(text: string, apiKey: string): Promise<string> {
  return callDeepSeek(
    [
      { role: 'system', content: '你是一个韩语翻译助手。将用户输入的韩语翻译成中文。只返回中文翻译，不要任何解释。如果输入是单行多句，保持换行。' },
      { role: 'user', content: text },
    ],
    apiKey,
    { maxTokens: 1000 }
  );
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
  const content = await callDeepSeek(
    [
      { role: 'system', content: `你是一个韩语词典。对给定的韩语单词，返回JSON格式：

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

只返回JSON，不要markdown代码块，不要任何其他文字。确保输出是合法JSON。` },
      { role: 'user', content: `查询单词：${word}` },
    ],
    apiKey,
    { maxTokens: 500 }
  );
  return parseJsonResponse(content) as Awaited<ReturnType<typeof lookupWordDeepSeek>>;
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
  const content = await callDeepSeek(
    [
      { role: 'system', content: `你是韩语教学专家。对给定的韩语句子，返回以下JSON格式：

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

逐词拆解，包括助词和词尾。语法分析识别句型模式。只返回JSON，不要markdown代码块。` },
      { role: 'user', content: `分析这个韩语句子：${sentence}` },
    ],
    apiKey,
    { maxTokens: 1500 }
  );
  return parseJsonResponse(content) as Awaited<ReturnType<typeof analyzeSentenceDeepSeek>>;
}

/**
 * Chat response for scenario-based conversation practice.
 * Used by /api/ai/chat.
 */
export async function chatResponseDeepSeek(
  params: {
    scenario: { nameZh: string; nameKo: string; level: string; systemHint?: string };
    context: { role: string; content: string }[];
    userMessage: string;
  },
  apiKey: string
): Promise<{
  aiResponse: { ko: string; zh: string };
  feedback: { natural: string; grammarError: string; betterWay: string; wrongPart: string; correctPart: string };
  newWords: { ko: string; zh: string; partOfSpeech: string }[];
}> {
  const scenarioDesc = `场景：${params.scenario.nameZh}（${params.scenario.nameKo}），难度：${params.scenario.level}`;
  const extraHint = params.scenario.systemHint ? `\n角色补充说明：${params.scenario.systemHint}` : '';
  const history = params.context
    .map((m) => `${m.role === 'ai' ? '店员/AI' : '用户'}: ${m.content}`)
    .join('\n');

  const content = await callDeepSeek(
    [
      { role: 'system', content: `你是韩语情景对话的AI对手（店员/路人等角色）。${scenarioDesc}${extraHint}

规则：
1. 用韩语回复用户，保持角色一致，语气自然口语化
2. 回复后提供中文反馈和新词，返回以下JSON格式：
{
  "aiResponse": {"ko": "韩语回复", "zh": "中文翻译"},
  "feedback": {
    "natural": "对用户表达自然度的一句评价",
    "grammarError": "若有语法错误简要说明，无则返回空字符串",
    "betterWay": "更地道的说法，无则返回空字符串",
    "wrongPart": "用户原句中错误的精确子串，无错误返回空字符串",
    "correctPart": "对应正确写法，无错误返回空字符串"
  },
  "newWords": [{"ko": "단어", "zh": "中文义", "partOfSpeech": "名词/动词/形容词/副词"}]
}
newWords 填写本轮AI回复中对中级以下学习者可能陌生的词，1-3个，无则返回空数组。
wrongPart 必须是用户原句的精确子串，不能改写。
只返回JSON，不要markdown代码块，不要任何其他文字。` },
      { role: 'user', content: `对话历史：\n${history}\n\n用户最新消息：${params.userMessage}\n\n请以角色身份回复。` },
    ],
    apiKey,
    { temperature: 0.7, maxTokens: 1000 }
  );

  const parsed = parseJsonResponse(content) as Awaited<ReturnType<typeof chatResponseDeepSeek>>;
  if (!parsed.newWords) parsed.newWords = [];
  if (!parsed.feedback.wrongPart) parsed.feedback.wrongPart = '';
  if (!parsed.feedback.correctPart) parsed.feedback.correctPart = '';
  return parsed;
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

  const content = await callDeepSeek(
    [
      { role: 'system', content: `你是一个韩语翻译助手。请将以下${sentences.length}句韩语逐句翻译成中文。每句翻译之间用"---"分隔。只返回翻译内容，不要编号，不要解释。` },
      { role: 'user', content: combined },
    ],
    apiKey,
    { maxTokens: 2000 }
  );

  return content
    .split(/---+|\n---+|\n---/)
    .map((s: string) => s.trim())
    .filter(Boolean);
}
