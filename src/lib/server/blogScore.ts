import { fetchWithTimeout } from '@/lib/fetch';
import { BLOG_REPLY_POOL, type BlogReplyCategory } from '@/data/blogReplyPool';
import { BLOG_CAST } from '@/data/blogCast';
import type { BlogPostScore, BlogComment, BlogVocab, BlogQuizItem } from '@/types';
import { t, type Lang } from '@/lib/i18n';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

// DeepSeek 只输出中文评分 + 一个"回应类型"，绝不生成韩语。
// 韩语回应由代码从安全短句池按类型选，杜绝喂错韩语。
// vocab/quiz 里的韩语来自用户原文（提取，非生成），所以允许带韩语。
interface RawScore {
  grammar: number;
  vocabulary: number;
  expression: number;
  usedTargetGrammar: boolean;
  comment: string;
  replyCategory: BlogReplyCategory;
  vocab?: { word?: unknown; reading?: unknown; meaning?: unknown }[];
  quiz?: { question?: unknown; options?: unknown; answerIndex?: unknown; explanation?: unknown };
  translations?: unknown; // 逐句中文翻译，按原文换行顺序一一对应
}

// 从 DeepSeek 原始输出里提炼 vocab（至多 3 条，字段齐才要，词必须在原文里）
function parseVocab(raw: RawScore['vocab'], sourceText: string): BlogVocab[] {
  if (!Array.isArray(raw)) return [];
  const out: BlogVocab[] = [];
  for (const v of raw) {
    const word = typeof v?.word === 'string' ? v.word.trim() : '';
    const meaning = typeof v?.meaning === 'string' ? v.meaning.trim() : '';
    if (!word || !meaning || !sourceText.includes(word)) continue;
    out.push({ word, reading: typeof v?.reading === 'string' ? v.reading : '', meaning });
    if (out.length >= 3) break;
  }
  return out;
}

// 从 DeepSeek 原始输出里提炼 1 道选择题（选项≥2、答案下标合法才要）
function parseQuiz(raw: RawScore['quiz']): BlogQuizItem[] {
  if (!raw || typeof raw !== 'object') return [];
  const question = typeof raw.question === 'string' ? raw.question.trim() : '';
  const options = Array.isArray(raw.options) ? raw.options.filter((o): o is string => typeof o === 'string' && !!o.trim()) : [];
  const answerIndex = Number(raw.answerIndex);
  if (!question || options.length < 2 || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) return [];
  return [{ question, options, answerIndex, explanation: typeof raw.explanation === 'string' ? raw.explanation : '' }];
}

// 逐句中文翻译：与正文的非空行一一对应。AI 返回的数组按顺序取，缺的补空串（前端空则回落 titleZh）。
function parseTranslations(raw: unknown, lineCount: number): string[] {
  const arr = Array.isArray(raw) ? raw : [];
  const out: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    const v = arr[i];
    out.push(typeof v === 'string' ? v.trim() : '');
  }
  return out;
}

const VALID_CATEGORIES: BlogReplyCategory[] = ['praise', 'encourage', 'gentleFix', 'topicReact'];

function clamp(n: unknown): number {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, Math.round(v)));
}

// 从短句池按类别选一条安全韩语回应，并随机指派一只动物来"说"，组成评论
export function pickReply(category: BlogReplyCategory): BlogComment {
  const pool = BLOG_REPLY_POOL[category] ?? BLOG_REPLY_POOL.encourage;
  const line = pool[Math.floor(Math.random() * pool.length)];
  const animal = BLOG_CAST[Math.floor(Math.random() * BLOG_CAST.length)];
  return { animalId: animal.id, ko: line.ko, zh: line.zh };
}

// 经验规则：基础分 + 用上当天句型的奖励。填空模式门槛低、自由模式鼓励更多。
function xpFor(overall: number, usedTargetGrammar: boolean, mode: 'fill' | 'free'): number {
  const base = Math.round(overall / 10);          // 0-10
  const bonus = usedTargetGrammar ? 5 : 0;
  const modeBonus = mode === 'free' ? 3 : 0;       // 自由写更难，多给一点
  return base + bonus + modeBonus;
}

interface ScoreInput {
  text: string;                  // 用户写的韩语
  mode: 'fill' | 'free';         // 填空 / 自由
  targetGrammar?: string;        // 当天该用的句型（填空模式一定有）
}

export interface ScoreResult {
  score: BlogPostScore;
  reply: BlogComment;
  vocab: BlogVocab[];
  quiz: BlogQuizItem[];
  translations: string[]; // 逐句中文翻译，与正文非空行一一对应
}

// 给一篇用户帖评分。失败时返回一个温和的兜底分，不阻塞发帖。
export async function scorePost(input: ScoreInput, lang: Lang = 'zh'): Promise<ScoreResult> {
  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return fallback(input.mode, lang);
  }

  const focus = input.mode === 'fill'
    ? `这是"填空/套用句型"练习，重点评价有没有正确套用目标句型${input.targetGrammar ? `「${input.targetGrammar}」` : ''}。`
    : `这是"自由写作"，学习者水平低，容错要宽，重点鼓励主动表达${input.targetGrammar ? `，并留意有没有主动用上「${input.targetGrammar}」` : ''}。`;

  const systemPrompt = `你是一位温柔的韩语启蒙老师，给零基础到初级的中文母语学习者的韩语短文打分。${focus}
只输出严格 JSON，不要任何解释文字、不要 markdown。
JSON 格式：
{"grammar":0-100,"vocabulary":0-100,"expression":0-100,"usedTargetGrammar":true/false,"comment":"一句中文鼓励式点评，≤30字","replyCategory":"praise|encourage|gentleFix|topicReact","vocab":[{"word":"原文中的韩语词","reading":"罗马音","meaning":"中文释义"}],"quiz":{"question":"围绕本文的一道中文选择题","options":["选项1","选项2","选项3","选项4"],"answerIndex":0,"explanation":"中文解析"},"translations":["第1句的中文翻译","第2句的中文翻译"]}

评分原则：
1. 对象是初学者，评分整体偏鼓励，不打击。哪怕有错也给出正面的 comment。
2. grammar/vocabulary/expression 三个维度各 0-100。
3. usedTargetGrammar：有没有用上目标句型（没有目标句型时按是否表达完整判断）。
4. replyCategory：根据水平选动物回应类型——写得好选 praise，刚起步/很短选 encourage，有明显不自然选 gentleFix，内容平实选 topicReact。
5. comment 必须是中文，不要夹韩语。
6. vocab：从学习者原文里挑 3 个最值得学的韩语词（word 必须是原文里出现过的词，不要自己造词），reading 是罗马音、meaning 是中文释义。若原文太短挑不出就给空数组 []。
7. quiz：基于本文内容出 1 道中文选择题（4 个选项，answerIndex 是正确项下标 0-3），考查词义或句意。出不了就给 null。
8. translations：把学习者原文逐句翻成自然中文。原文按"第N句："编号给出，translations 数组必须与句子一一对应、顺序一致、数量相同。按学习者的原意翻译（哪怕有语法错也翻出它想表达的意思），不要纠正、不要加注释。`;

  // 与 createUserPost 拆句口径一致（trim + 去空行），逐句编号发给 AI，保证翻译能一一对齐
  const lines = input.text.split('\n').map((s) => s.trim()).filter(Boolean);
  const numbered = lines.map((s, i) => `第${i + 1}句：${s}`).join('\n');

  try {
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 25_000,
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `学习者写的韩语（共 ${lines.length} 句）：\n${numbered}` },
        ],
        temperature: 0.3,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) return fallback(input.mode, lang);

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content?.trim() ?? '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const raw = JSON.parse(cleaned) as Partial<RawScore>;

    const grammar = clamp(raw.grammar);
    const vocabulary = clamp(raw.vocabulary);
    const expression = clamp(raw.expression);
    const overall = Math.round((grammar + vocabulary + expression) / 3);
    const usedTargetGrammar = raw.usedTargetGrammar === true;
    const category = VALID_CATEGORIES.includes(raw.replyCategory as BlogReplyCategory)
      ? (raw.replyCategory as BlogReplyCategory)
      : 'encourage';
    const comment = typeof raw.comment === 'string' && raw.comment ? raw.comment.slice(0, 40) : '계속 화이팅!';
    const xpEarned = xpFor(overall, usedTargetGrammar, input.mode);

    const score: BlogPostScore = {
      overall,
      dimensions: { grammar, vocabulary, expression },
      usedTargetGrammar,
      comment,
      xpEarned,
    };
    return {
      score,
      reply: pickReply(category),
      vocab: parseVocab(raw.vocab, input.text),
      quiz: parseQuiz(raw.quiz),
      translations: parseTranslations(raw.translations, lines.length),
    };
  } catch {
    return fallback(input.mode, lang);
  }
}

// AI 不可用时的兜底：给鼓励分，让发帖体验不中断（无 vocab/quiz）
function fallback(mode: 'fill' | 'free', lang: Lang = 'zh'): ScoreResult {
  const score: BlogPostScore = {
    overall: 70,
    dimensions: { grammar: 70, vocabulary: 70, expression: 70 },
    usedTargetGrammar: false,
    comment: t('score.fallback_comment', lang),
    xpEarned: xpFor(70, false, mode),
  };
  return { score, reply: pickReply('encourage'), vocab: [], quiz: [], translations: [] };
}
