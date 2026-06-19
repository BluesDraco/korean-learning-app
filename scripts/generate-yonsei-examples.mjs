import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

const DEEPSEEK_API_KEY = 'sk-84dfabf2472447a197b43f15731f29fb';
const API_URL = 'https://api.deepseek.com/chat/completions';
const BATCH_SIZE = 10;
const CONCURRENCY = 3;
const DELAY_MS = 500;

const filePath = new URL('../src/data/yonsei-books.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

async function generateExamples(words) {
  const wordList = words.map((w, i) => `${i + 1}. ${w.word}（${w.meaning}）`).join('\n');
  const prompt = `你是韩语教学专家。请为以下每个韩语词汇生成2个例句，例句要符合初级水平（延世韩国语1册难度），自然地道，包含该词汇的原形或常见活用形。

词汇列表：
${wordList}

要求：
- 每个例句不超过15个韩语词
- 例句需体现该词汇的典型用法
- 中文翻译要准确自然
- 严格按JSON格式返回，不要有任何其他文字

返回格式：
[
  {
    "word": "词汇原形",
    "examples": [
      {"text": "韩语例句1", "translation": "中文翻译1"},
      {"text": "韩语例句2", "translation": "中文翻译2"}
    ]
  },
  ...
]`;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const text = data.choices[0].message.content.trim();

  // Extract JSON from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found in response: ' + text.slice(0, 200));

  return JSON.parse(jsonMatch[0]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBatch(batch, batchIndex, total) {
  const results = await generateExamples(batch);
  const map = {};
  for (const r of results) {
    map[r.word] = r.examples;
  }
  console.log(`  Batch ${batchIndex + 1}/${total}: got examples for ${Object.keys(map).length}/${batch.length} words`);
  return map;
}

async function main() {
  let content = readFileSync(filePath, 'utf-8');

  // Extract all words
  const wordRegex = /\{ word: "([^"]+)", pronunciation: "[^"]+", meaning: "([^"]+)", partOfSpeech: '[^']*' , examples: \[\] \}/g;
  const allWords = [];
  let m;
  while ((m = wordRegex.exec(content)) !== null) {
    allWords.push({ word: m[1], meaning: m[2] });
  }

  console.log(`Found ${allWords.length} words to process`);

  // Split into batches
  const batches = [];
  for (let i = 0; i < allWords.length; i += BATCH_SIZE) {
    batches.push(allWords.slice(i, i + BATCH_SIZE));
  }
  console.log(`${batches.length} batches of ${BATCH_SIZE}`);

  const allExamples = {};
  let processed = 0;

  // Process with concurrency limit
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map((batch, j) => processBatch(batch, i + j, batches.length))
    );
    for (const map of results) {
      Object.assign(allExamples, map);
    }
    processed += chunk.length;
    console.log(`Progress: ${Math.min(processed * BATCH_SIZE, allWords.length)}/${allWords.length} words`);
    if (i + CONCURRENCY < batches.length) await sleep(DELAY_MS);
  }

  console.log(`\nGenerated examples for ${Object.keys(allExamples).length} words. Writing to file...`);

  // Replace examples: [] with actual examples in file
  let updated = content;
  for (const [word, examples] of Object.entries(allExamples)) {
    if (!examples || examples.length === 0) continue;
    const exStr = JSON.stringify(examples);
    // Escape word for regex
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
      `(\\{ word: "${escaped}", pronunciation: "[^"]+", meaning: "[^"]+", partOfSpeech: '[^']*' , examples: )\\[\\]( \\})`,
      'g'
    );
    updated = updated.replace(pattern, `$1${exStr}$2`);
  }

  writeFileSync(filePath, updated, 'utf-8');
  console.log('Done! File updated.');

  // Report missing
  const missing = allWords.filter(w => !allExamples[w.word] || allExamples[w.word].length === 0);
  if (missing.length > 0) {
    console.log(`\nMissing examples for ${missing.length} words:`);
    missing.forEach(w => console.log(`  - ${w.word}`));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
