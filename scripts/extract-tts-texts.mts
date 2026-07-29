// 全站韩语 TTS 文本抽取器 — 本地用 tsx 运行（解析 @/ 别名）
// 用法: npx tsx scripts/extract-tts-texts.mts
// 产出: scripts/tts-texts.json（去重后的纯韩语字符串数组，供服务器 gen-all-tts.mjs 合成）
//
// 策略：import 各数据源 + 深度遍历对象树，收集所有"值为韩语字符串"的字段。
// 不依赖精确字段路径 → 字段改名/新增也不漏。统一过滤：含谚文 + strip HTML + 长度上限。
import { writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'src');

// ── 数据源 import（聚合入口优先；分文件的用 import * 拿全部导出）──
import { knowledgeCategories } from '@/data/knowledge';
import { idioms } from '@/data/expressions';
import { grammarPoints } from '@/data/grammar';
import { sentencePatterns } from '@/data/grammar-new';
import { themePacks } from '@/data/vocabulary/themes';
import { dictationSentences } from '@/data/dictationSentences';
import { dictationWordPacks } from '@/data/dictationWords';
import { scenarios as aiScenarios } from '@/data/aiScenarios';
import { articleLearningMap } from '@/data/articleLearning';
import { days } from '@/data/diary';
import { allEntries } from '@/data/vocabulary/vocab-data';

// 动态 import 一个目录下匹配的所有模块（tsx 下用 readdir + import()，不用 Vite 的 import.meta.glob）
async function importDir(relDir: string, match: (f: string) => boolean): Promise<Record<string, unknown>[]> {
  const dir = join(SRC, relDir);
  const files = (await readdir(dir)).filter(match);
  const mods: Record<string, unknown>[] = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    mods.push(mod as Record<string, unknown>);
  }
  return mods;
}

// ── 清洗规则 ──
// 只要"干净、可朗读的韩语单元"：纯韩语（允许常见标点/空格），排除：
//  ① 含中文（教学讲解/剧情旁白混排，不是朗读句）
//  ② 含特殊符号 _ + → < > | = * / \ { } （填空占位、公式、HTML残留、拼接式）
//  ③ 含省略号占位 ...
//  ④ 超长（整段说明，非朗读单元）
const HANGUL = /[가-힣]/;
const CJK = /[一-鿿]/;                 // 中文（含日韩共用汉字块）
const BAD_SYMBOL = /[_+→<>|=*/\\{}]/;   // 非朗读符号
const HTML_TAG = /<[^>]+>/g;
const MAX_LEN = 120; // 朗读单元上限（超过多半是说明/剧情）

function clean(s: string): string {
  return s.replace(HTML_TAG, '').replace(/\s+/g, ' ').trim();
}

const collected = new Set<string>();

function add(v: unknown): void {
  if (typeof v !== 'string') return;
  const c = clean(v);
  if (!c || c.length > MAX_LEN) return;
  if (!HANGUL.test(c)) return;   // 必须含谚文
  if (CJK.test(c)) return;       // 排除中韩混排
  if (BAD_SYMBOL.test(c)) return;
  if (c.includes('...') || c.includes('…')) return; // 省略号占位
  collected.add(c);
}

// 深度遍历：收集对象/数组里所有韩语字符串值。跳过明显非朗读字段（罗马音/中文释义/id/url）。
const SKIP_KEYS = new Set([
  'pronunciation', 'reading', 'rom', 'romaja', 'chinese', 'meaning', 'exampleZh',
  'cn', 'zh', 'id', 'url', 'audioUrl', 'emoji', 'note', 'diff', 'hint', 'tricky',
  'grammarPoint', 'tag', 'partOfSpeech', 'explanation', 'comment',
]);

function walk(node: unknown, key?: string): void {
  if (node == null) return;
  if (typeof node === 'string') {
    if (key && SKIP_KEYS.has(key)) return;
    add(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) walk(item, key);
    return;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      walk(v, k);
    }
  }
}

// ── 逐源遍历 ──
walk(knowledgeCategories);
walk(idioms);
walk(grammarPoints);
walk(sentencePatterns);
walk(themePacks);
walk(dictationSentences);
walk(dictationWordPacks);
walk(aiScenarios);
walk(Object.values(articleLearningMap));
walk(days);
walk(allEntries); // 词汇 levels 1-6 全部词条 + 例句（与旧 vocab 脚本同源，md5 一致 → 上海已生成的复用）

// grammar-cards p1~p30
const grammarCardMods = await importDir('data', (f) => /^grammar-cards-p\d+\.ts$/.test(f));
for (const mod of grammarCardMods) for (const val of Object.values(mod)) walk(val);
// diary subquests：451 个分文件
const subquestMods = await importDir('data/diary/subquests', (f) => /^day-.*\.ts$/.test(f));
for (const mod of subquestMods) for (const val of Object.values(mod)) walk(val);
// scenePreview：36 个场景分文件（排除 index.ts）
const scenePreviewMods = await importDir('data/scenePreview', (f) => f.endsWith('.ts') && f !== 'index.ts');
for (const mod of scenePreviewMods) for (const val of Object.values(mod)) walk(val);

// ── 输出 ──
const texts = [...collected].sort();
const outPath = join(__dirname, 'tts-texts.json');
await writeFile(outPath, JSON.stringify(texts, null, 0));

console.log(`\n共抽取 ${texts.length} 条去重韩语文本 → ${outPath}`);
console.log('（如条数明显偏低，检查某源是否 import 失败）');
