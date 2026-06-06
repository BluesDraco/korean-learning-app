// enrich-hot-posts.mjs — DeepSeek 富化 → 韩娱热点阅读
// 用法: node scripts/enrich-hot-posts.mjs
// 1. 读取 data/hot-posts.json（爬虫输出）
// 2. DeepSeek: 翻译标题/正文、提取关键词、逐句拆解(token+语法)
// 3. 输出 data/hot-posts-enriched.json + src/data/kpopHotPosts.ts

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const INPUT_FILE = resolve(ROOT, 'data/hot-posts.json');
const OUTPUT_JSON = resolve(ROOT, 'data/hot-posts-enriched.json');
const OUTPUT_TS = resolve(ROOT, 'src/data/kpopHotPosts.ts');

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

// ── Load API key ──────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(ROOT, '.env.local');
  if (!existsSync(envPath)) throw new Error('.env.local not found');
  const content = readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.+)/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

// ── DeepSeek API ──────────────────────────────────────────────────
async function callDeepSeek(systemPrompt, userContent, apiKey, maxTokens = 1500) {
  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  return json.choices[0].message.content.trim();
}

function cleanJson(text) {
  return text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
}

// ── 1. Translate title ────────────────────────────────────────────
async function translateTitle(titleKo, apiKey) {
  const result = await callDeepSeek(
    '你是韩语翻译助手。将韩语标题翻译成简洁中文，15字以内。只返回中文。',
    titleKo,
    apiKey,
    200
  );
  return result.trim();
}

// ── 2. Extract keywords ──────────────────────────────────────────
async function extractKeywords(titleKo, bodyFirst500, apiKey) {
  const prompt = `标题：${titleKo}\n正文摘录：${bodyFirst500}`;
  const result = await callDeepSeek(
    `从韩娱新闻中提取5-8个韩语关键词。返回纯JSON数组，不要markdown代码块，不要任何其他文字。只选KPOP/娱乐相关的词（团名、艺人名、专辑、活动、粉丝反应等），不要选政治/商业/法律类词。格式示例：["아이브","컴백","신곡"]`,
    prompt,
    apiKey,
    500
  );
  const cleaned = cleanJson(result);
  try {
    const arr = JSON.parse(cleaned);
    if (Array.isArray(arr)) return arr.filter(k => typeof k === 'string').slice(0, 8);
  } catch {
    // Try to extract from text if JSON parse fails
    const matches = cleaned.match(/"[^"]+"/g);
    if (matches) return matches.map(m => m.replace(/"/g, '')).slice(0, 8);
  }
  return [];
}

// ── 3. Translate full body ───────────────────────────────────────
async function translateBody(bodyKo, apiKey) {
  const result = await callDeepSeek(
    '你是韩语翻译助手。将以下韩语新闻正文翻译成流畅中文。保留段落结构。只返回中文翻译。',
    bodyKo,
    apiKey,
    3000
  );
  return result.trim();
}

// ── 4. Split body into paragraphs ────────────────────────────────
function splitParagraphs(bodyKo, bodyZh, crawledSentences) {
  // Use the crawler's sentence extraction to form paragraphs
  // Group sentences into paragraphs (3-5 sentences per paragraph)
  const paragraphs = [];
  const sentencesPerParagraph = 4;

  for (let i = 0; i < crawledSentences.length; i += sentencesPerParagraph) {
    const chunk = crawledSentences.slice(i, i + sentencesPerParagraph);
    const koText = chunk.map(s => s.korean).join(' ');
    // Rough Chinese paragraph: take corresponding sentences from bodyZh
    // (bodyZh is a full translation, not per-sentence — we'll refine below)
    paragraphs.push({
      korean: koText,
      chinese: '', // filled by per-sentence translation
      sentenceData: chunk,
    });
  }

  return paragraphs;
}

// ── 5. Analyze one sentence → tokens + grammar ───────────────────
async function analyzeSentence(korean, apiKey) {
  const result = await callDeepSeek(
    `你是韩语教学专家。分析以下韩语句子，必须返回有效JSON：

{
  "chinese": "整句中文翻译",
  "tokens": [
    {"surface": "句子中的原形", "baseForm": "词典原形(动词必须用-다形)", "meaning": "中文释义", "partOfSpeech": "词性(명사/동사/형용사/부사/조사/어미 중 하나)", "note": "用法说明(可选)"}
  ],
  "grammarNotes": [
    {"pattern": "语法模式(如-고 있다, -면, -기 때문에)", "meaning": "语法含义(中文)", "explanation": "详细解释(50字以内)", "exampleInSentence": "本句中包含该语法的片段"}
  ]
}

重要规则：
1. surface必须是句子中真实出现的词，最多6个韩文字，一定要细拆
2. baseForm必须是标准词典原形，不能空，不能等于surface（除非已经是原形）
3. 专有名词(人名/团名/地名)不拆，但助词和语尾要单独拆
4. 必须至少拆解3个词，最多拆8个
5. grammarNotes必须至少返回1条！每个韩语句子一定有语法点。
   - 动词/形容词的词尾变化(어미)是最重要的语法点
   - 助词(조사)的使用也是语法点
   - 句型的整体结构也可以分析
6. 只返回纯JSON，不要markdown代码块，不要任何其他文字`,
    korean,
    apiKey,
    2500
  );

  try {
    const parsed = JSON.parse(cleanJson(result));
    return {
      chinese: parsed.chinese || '',
      tokens: (parsed.tokens || [])
        .filter(t => t.meaning && t.meaning.trim())
        .map(t => ({
          surface: t.surface || '',
          baseForm: t.baseForm || t.surface || '',
          meaning: t.meaning || '',
          partOfSpeech: t.partOfSpeech || undefined,
          note: t.note || undefined,
        })),
      grammarNotes: (parsed.grammarNotes || []).map(g => ({
        pattern: g.pattern || '',
        meaning: g.meaning || '',
        explanation: g.explanation || '',
        exampleInSentence: g.exampleInSentence || '',
      })),
    };
  } catch {
    return { chinese: '', tokens: [], grammarNotes: [] };
  }
}

// ── 6. Enrich one article ────────────────────────────────────────
async function enrichArticle(post, apiKey) {
  const titleKo = post.titleZh; // crawler stores Korean in titleZh
  const bodyKo = post.summaryZh; // crawler stores Korean body in summaryZh
  const bodyFirst500 = bodyKo.slice(0, 500);

  const status = {
    sourceReady: true, // already crawled
    translationReady: false,
    tokenReady: false,
    grammarReady: false,
    imageReady: !!post.imageUrl,
    readingReady: false,
  };

  // Step 1: Title translation
  console.log('  翻译标题...');
  const titleZh = await translateTitle(titleKo, apiKey);
  status.translationReady = true;

  // Step 2: Keywords
  console.log('  提取关键词...');
  const keywords = await extractKeywords(titleKo, bodyFirst500, apiKey);

  // Step 3: Full body translation
  console.log('  翻译正文...');
  const bodyZh = await translateBody(bodyKo, apiKey);

  // Step 4: Split into paragraphs, process each sentence
  const paragraphGroups = splitParagraphs(bodyKo, bodyZh, post.sentences);
  const paragraphs = [];

  for (let pi = 0; pi < paragraphGroups.length; pi++) {
    const pg = paragraphGroups[pi];
    const sentences = [];

    for (let si = 0; si < pg.sentenceData.length; si++) {
      const s = pg.sentenceData[si];
      console.log(`  拆解 P${pi + 1}S${si + 1}/${pg.sentenceData.length}...`);

      const analyzed = await analyzeSentence(s.korean, apiKey);

      sentences.push({
        id: `${post.id}-p${pi}-s${si}`,
        korean: s.korean,
        chinese: analyzed.chinese || '',
        tokens: analyzed.tokens,
        grammarNotes: analyzed.grammarNotes,
      });

      if (analyzed.tokens.length === 0) { /* some sentences may not tokenize */ }
      if (analyzed.grammarNotes.length === 0) { /* some sentences may not have grammar */ }

      // Delay between sentences
      if (si < pg.sentenceData.length - 1 || pi < paragraphGroups.length - 1) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    paragraphs.push({
      id: `${post.id}-p${pi}`,
      korean: pg.korean,
      chinese: sentences.map(s => s.chinese).filter(Boolean).join(''),
      sentences,
    });
  }

  // More forgiving thresholds: >=30% sentences with tokens, >=1 with grammar
  const sentencesWithTokens = paragraphs.reduce((sum, p) => sum + p.sentences.filter(s => s.tokens.length > 0).length, 0);
  const sentencesWithGrammar = paragraphs.reduce((sum, p) => sum + p.sentences.filter(s => s.grammarNotes.length > 0).length, 0);
  const totalS = paragraphs.reduce((sum, p) => sum + p.sentences.length, 0);
  status.tokenReady = totalS > 0 && sentencesWithTokens / totalS >= 0.3;
  status.grammarReady = sentencesWithGrammar >= 1;
  status.translationReady = !!(titleZh && titleZh.trim()) || !!(bodyZh && bodyZh.trim());
  status.readingReady = status.sourceReady && status.translationReady;

  const totalTokens = paragraphs.reduce((sum, p) =>
    sum + p.sentences.reduce((s, sen) => s + sen.tokens.length, 0), 0);
  const totalGrammar = paragraphs.reduce((sum, p) =>
    sum + p.sentences.reduce((s, sen) => s + sen.grammarNotes.length, 0), 0);

  return {
    id: post.id,
    sourceName: post.sourceName || 'Naver News',
    sourceUrl: post.sourceUrl,
    originalPublishedAt: post.publishedAt || Date.now(),
    fetchedAt: Date.now(),
    imageUrl: post.imageUrl || '',
    originalTitleKo: titleKo,
    titleZh,
    keywords,
    originalBodyKo: bodyKo,
    bodyZh,
    paragraphs,
    totalSentences: paragraphs.reduce((s, p) => s + p.sentences.length, 0),
    totalTokens,
    totalGrammar,
    readingStatus: status,
    publishStatus: 'draft',
  };
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log('=== 韩娱热点阅读 富化 (DeepSeek) ===\n');

  const env = loadEnv();
  const apiKey = env.DEEPSEEK_NEWS_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_NEWS_KEY not found in .env.local');

  if (!existsSync(INPUT_FILE)) {
    console.error('未找到 data/hot-posts.json');
    process.exit(1);
  }
  const posts = JSON.parse(readFileSync(INPUT_FILE, 'utf-8'));
  console.log(`读取到 ${posts.length} 篇文章\n`);

  const readings = [];
  let successCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`[${i + 1}/${posts.length}] ${post.titleZh?.slice(0, 60)}`);

    try {
      const reading = await enrichArticle(post, apiKey);
      readings.push(reading);
      successCount++;
      console.log(`  ✅ 完成 | ${reading.totalSentences}句 | ${reading.totalTokens}词 | ${reading.totalGrammar}语法\n`);
    } catch (e) {
      console.error(`  ❌ 失败: ${e.message}\n`);
    }

    // Delay between articles
    if (i < posts.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // ── Write JSON ──
  writeFileSync(OUTPUT_JSON, JSON.stringify(readings, null, 2), 'utf-8');
  console.log(`✅ 富化数据 -> ${OUTPUT_JSON}`);

  // ── Write TypeScript ──
  const tsContent = `// 韩娱热点阅读 — DeepSeek 翻译 + 逐词拆解 + 语法解析
// 更新于 ${new Date().toISOString().slice(0, 19).replace('T', ' ')}
// 数据源: Naver News → crawl-hot-posts.mjs → enrich-hot-posts.mjs
// 发布规则: readingStatus.readingReady + publishStatus='published' 才展示

import type { KoreanHotReading } from '@/types';

export const kpopHotReadings: KoreanHotReading[] = ${JSON.stringify(readings, null, 2)};
`;

  writeFileSync(OUTPUT_TS, tsContent, 'utf-8');
  console.log(`✅ TypeScript -> ${OUTPUT_TS}`);

  // Summary
  const readyCount = readings.filter(r => r.readingStatus.readingReady).length;
  console.log(`\n📊 ${successCount}/${posts.length} 篇富化成功`);
  console.log(`   readingReady: ${readyCount}/${readings.length}`);
  console.log(`   发布状态: 全部 draft（需人工审核 → published）`);
  console.log(`\n部署前检查:`);
  console.log(`  1. 审核内容质量`);
  console.log(`  2. 修改 publishStatus 为 'published'`);
  console.log(`  3. npm run build && 部署`);
}

main().catch((e) => {
  console.error('富化失败:', e);
  process.exit(1);
});
