/**
 * DeepSeek API client — called from server-side API routes.
 * Client code calls the Next.js API routes, which proxy to DeepSeek.
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

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
      model: 'deepseek-chat',
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
