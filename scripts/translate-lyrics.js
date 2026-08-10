// Translate Korean lyrics to Chinese using DeepSeek API
const fs = require('fs');
const path = require('path');

const KPOP_FILE = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const CACHE_FILE = path.join(__dirname, 'translations_cache.json');

const DEEPSEEK_KEY = 'sk-920ca2d19ce049e5ad68bd7e27b10070';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const BATCH_SIZE = 20;

// Read and parse all _(...) lines
const content = fs.readFileSync(KPOP_FILE, 'utf8');

// Match: _(t(...), t(...), "korean", "romanized", '')
const lineRegex = /(_\(t\(\d+,[\d.]+\)(?:,\s*t\(\d+,[\d.]+\))?),\s*"([^"]*)",\s*"([^"]*)",\s*''\)/g;

const entries = [];
let m;
while ((m = lineRegex.exec(content)) !== null) {
  const fullMatch = m[0];
  const prefix = m[1];
  const korean = m[2];
  const romanized = m[3];
  entries.push({ fullMatch, prefix, korean, romanized });
}

console.log(`Found ${entries.length} lyric lines`);

// Filter to only lines with Korean characters that need translation
const needsTranslation = entries.filter(e => /[가-힣]/.test(e.korean));
console.log(`${needsTranslation.length} lines contain Korean`);

// Count unique Korean texts
const uniqueKo = [...new Set(needsTranslation.map(e => e.korean))];
console.log(`${uniqueKo.length} unique Korean texts to translate`);

// Load cache
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  console.log(`Loaded ${Object.keys(cache).length} cached translations`);
}

// Filter to uncached
const uncached = uniqueKo.filter(k => !cache[k]);
console.log(`${uncached.length} texts need translation`);

async function translateBatch(texts) {
  const delimiter = '\n---SEP---\n';
  const combined = texts.join(delimiter);

  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      messages: [
        {
          role: 'system',
          content: `你是一个K-pop歌词韩译中助手。将以下${texts.length}句韩语歌词逐句翻译成中文。保持韵律感和歌词的意境。每句翻译用"---SEP---"分隔。不要编号，只返回翻译内容。如果某句已经是英文/拟声词等无需翻译的，原样保留。`,
        },
        { role: 'user', content: combined },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek error: ${res.status} ${err}`);
  }

  const json = await res.json();
  const result = json.choices[0].message.content.trim();
  const translations = result.split(/---SEP---/).map(s => s.trim()).filter(Boolean);

  if (translations.length !== texts.length) {
    console.warn(`  WARNING: expected ${texts.length} translations, got ${translations.length}`);
    // Pad or truncate
    while (translations.length < texts.length) translations.push('');
  }

  return translations;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  let totalTranslated = 0;

  // Process in batches
  for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
    const batch = uncached.slice(i, i + BATCH_SIZE);
    console.log(`\nBatch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(uncached.length / BATCH_SIZE)}: translating ${batch.length} texts...`);

    let translations;
    try {
      translations = await translateBatch(batch);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      // Save progress before retrying
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
      console.log('  Saved cache, retrying in 3s...');
      await sleep(3000);
      try {
        translations = await translateBatch(batch);
      } catch (err2) {
        console.error(`  RETRY FAILED: ${err2.message}`);
        continue;
      }
    }

    for (let j = 0; j < batch.length; j++) {
      const ko = batch[j];
      const zh = translations[j] || '';
      cache[ko] = zh;
      if (zh) totalTranslated++;
    }

    // Save cache incrementally
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`  Done. Cache now has ${Object.keys(cache).length} entries.`);

    // Rate limit
    if (i + BATCH_SIZE < uncached.length) {
      await sleep(500);
    }
  }

  console.log(`\nTranslation complete: ${totalTranslated} translated.`);

  // Now apply translations back to the file
  console.log('\nApplying translations to kpopSongs.ts...');
  let replaced = 0;
  let newContent = content;

  for (const entry of entries) {
    const zh = cache[entry.korean];
    if (zh && zh.trim()) {
      const escapedZh = zh.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const oldStr = entry.fullMatch;
      const newStr = `${entry.prefix}, "${entry.korean}", "${entry.romanized}", '${escapedZh}')`;
      if (oldStr !== newStr) {
        newContent = newContent.replace(oldStr, newStr);
        replaced++;
      }
    }
  }

  fs.writeFileSync(KPOP_FILE, newContent, 'utf8');
  console.log(`Replaced ${replaced} lines with Chinese translations.`);
  console.log('Done!');
}

main().catch(console.error);
