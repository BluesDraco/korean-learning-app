import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { recordAiUsage } from '@/lib/server/rate-limit';
import { checkAiQuota } from '@/lib/server/membership';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_JUDGE_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const body = await req.json();
    const { action, word, meaning, sentence } = body;

    // 语法练习批改（仿写/续写）：独立限流 bucket，不占用词汇造句的 analyze 池。
    if (action === 'grammar-judge') {
      return handleGrammarJudge(auth.userId, apiKey, body);
    }

    if (!action || !word || !meaning) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof word !== 'string' || word.length > 50) {
      return NextResponse.json({ error: '词语过长' }, { status: 400 });
    }

    const inputCheck = filterContent(word, 'ai_input');
    if (!inputCheck.ok) {
      return NextResponse.json({ error: inputCheck.reason }, { status: 400 });
    }

    const limit = await checkAiQuota(auth.userId, 'judge');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日 AI 判定次数已达上限，请明天再试或升级会员' },
        { status: 429 },
      );
    }

    if (action === 'generate') {
      // 自证+校验+重试：AI 除了词块外还要返回一个自证句（用这些词块能拼出的正确句子）
      // 服务端硬验证：拼接词块必须能构成自证句、必须包含目标词，否则重试一次
      const buildRequest = (extraNote: string) => ({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          {
            role: 'system',
            content: `你是韩语造句练习助手。给定一个韩语词语，生成3到5个韩语词块，让学习者组合成一个自然的句子。

要求：
- 词块必须包含给定的目标词
- **词块内的助词必须与谓词的格要求严格匹配**（例如：\`필요하다\`只能用主格\`이/가\`或主题\`은/는\`，不能用宾格\`을/를\`；\`좋아하다\`需要宾格\`을/를\`；\`가다\`需要方向助词\`에/으로\`等）
- 所有词块按某个顺序拼接（用空格）必须能构成一个语法正确、自然的完整句子，不允许出现"任何拼法都错"或"必须删掉某个词块才能对"的情况
- 词块以单词或短语为单位，不要拆得太细（例如：助词和前面的名词合并为一个词块）
- 难度适合初中级韩语学习者
- blocks 数组按打乱顺序返回
- **必须同时返回 sentence 字段：把 blocks 按正确顺序用空格拼接得到的完整句子**（用于自证）

只返回JSON，格式：{"blocks":["词块1","词块2","词块3"],"sentence":"완성된 문장"}
不要markdown，不要其他文字。${extraNote}`,
          },
          {
            role: 'user',
            content: `目标词：${word}（${meaning}）`,
          },
        ],
        temperature: 0.7,
        max_tokens: 250,
      });

      const stripSpaces = (s: string) => s.replace(/\s+/g, '');
      const attemptGenerate = async (extraNote: string) => {
        const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
          timeoutMs: 20_000,
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify(buildRequest(extraNote)),
        });
        if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
        const json = await res.json();
        const content = json.choices[0].message.content.trim();
        const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        const blocks: string[] = Array.isArray(parsed.blocks) ? parsed.blocks.filter((b: unknown) => typeof b === 'string' && b.trim()) : [];
        const sentence: string = typeof parsed.sentence === 'string' ? parsed.sentence : '';
        return { blocks, sentence };
      };

      // 校验：拼接词块必须完全等于自证句（都去除空格后比较），且必须包含目标词
      const validate = (blocks: string[], sentence: string) => {
        if (blocks.length < 2 || blocks.length > 6) return false;
        if (!sentence) return false;
        const joined = stripSpaces(blocks.join(''));
        const target = stripSpaces(sentence);
        if (joined !== target) return false;
        if (!sentence.includes(word)) return false;
        return true;
      };

      let attempt = await attemptGenerate('');
      if (!validate(attempt.blocks, attempt.sentence)) {
        attempt = await attemptGenerate('上一次生成的词块无法拼出你给的 sentence，或没有包含目标词，请严格保证 blocks 拼接后（去空格）等于 sentence（去空格），并包含目标词。');
      }

      await recordAiUsage(auth.userId, 'judge');

      if (!validate(attempt.blocks, attempt.sentence)) {
        // 两次都不合格，拒绝返回错题（前端已有 blocks<2 的 fallback UI）
        return NextResponse.json({ blocks: [], error: 'validation_failed' });
      }

      return NextResponse.json({ blocks: attempt.blocks });
    }

    if (action === 'judge') {
      if (!sentence || typeof sentence !== 'string' || !sentence.trim()) {
        return NextResponse.json({ error: 'Missing sentence' }, { status: 400 });
      }
      if (sentence.length > 200) {
        return NextResponse.json({ error: '句子过长' }, { status: 400 });
      }

      const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
        timeoutMs: 20_000,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          thinking: { type: 'disabled' },
          messages: [
            {
              role: 'system',
              content: `你是韩语造句评判助手。用户给出一个词语和他用词块排列组成的句子，判断句子是否语法正确、含义自然。

评判规则：
- 不要求与标准答案完全一致，允许多种正确写法
- 忽略用户输入中的标点差异（包括缺句号、多逗号、全角/半角标点混用等），仅评判语义与语法
- score 1-5分：1-2分=有明显错误，3分=基本正确但不够自然，4-5分=自然流畅
- isCorrect：score >= 3 时为 true
- wrongPart：必须是用户原句中的连续子串（含标点也照抄），指出错误部分；无错误返回 ""
- correctPart：wrongPart 对应的正确写法；无错误返回 ""
- explanation：中文简短解释（1-2句），说明哪里不自然或哪里做得好
- betterWay：更地道的整句写法（即使正确也给出最自然的表达）
- userTranslation：用户句子的中文翻译（简洁自然）
- betterTranslation：betterWay 对应的中文翻译
- improvement：一个简短的短语标签（3-8字），说明地道说法相比用户句子的核心改进点，例如"语气更礼貌"、"词序更自然"、"用更常见的表达"、"更符合口语习惯"；如果用户句子已经很地道则返回"表达已很自然"

只返回JSON，格式：
{"isCorrect":true,"score":4,"wrongPart":"","correctPart":"","explanation":"解释","betterWay":"更地道写法","userTranslation":"用户句子中译","betterTranslation":"地道说法中译","improvement":"改进点标签"}
不要markdown，不要其他文字。`,
            },
            {
              role: 'user',
              content: `目标词：${word}（${meaning}）\n用户造句：${sentence.trim()}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 300,
        }),
      });

      if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
      const json = await res.json();
      const content = json.choices[0].message.content.trim();
      const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(cleanJson);

      // Safety defaults
      result.isCorrect = result.isCorrect ?? false;
      result.score = typeof result.score === 'number' ? result.score : 1;
      result.wrongPart = result.wrongPart ?? '';
      result.correctPart = result.correctPart ?? '';
      result.explanation = result.explanation ?? '';
      result.betterWay = result.betterWay ?? '';
      result.userTranslation = result.userTranslation ?? '';
      result.betterTranslation = result.betterTranslation ?? '';
      result.improvement = result.improvement ?? '';
      // 若 AI 返回的 wrongPart 不是原句子串（例如归一化了标点），直接置空，避免前端定位失败
      if (result.wrongPart && !sentence.includes(result.wrongPart)) {
        result.wrongPart = '';
        result.correctPart = '';
      }

      await recordAiUsage(auth.userId, 'judge');
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    console.error('[ai/sentence-judge]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}

// 语法练习批改：判用户自己写的句子。除句子正确性外，额外判定是否真的用了目标语法点；
// 续写模式（有 precedingSentence）再判是否承接上文。独立 grammar_judge 限流池。
async function handleGrammarJudge(
  userId: string,
  apiKey: string,
  body: { grammarPoint?: unknown; whatItDoes?: unknown; sentence?: unknown; precedingSentence?: unknown },
) {
  const grammarPoint = typeof body.grammarPoint === 'string' ? body.grammarPoint : '';
  const whatItDoes = typeof body.whatItDoes === 'string' ? body.whatItDoes : '';
  const sentence = typeof body.sentence === 'string' ? body.sentence.trim() : '';
  const preceding = typeof body.precedingSentence === 'string' ? body.precedingSentence.trim() : '';

  if (!grammarPoint || !sentence) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (grammarPoint.length > 100 || sentence.length > 200) {
    return NextResponse.json({ error: '内容过长' }, { status: 400 });
  }
  const inputCheck = filterContent(sentence, 'ai_input');
  if (!inputCheck.ok) {
    return NextResponse.json({ error: inputCheck.reason }, { status: 400 });
  }

  const limit = await checkAiQuota(userId, 'judge');
  if (!limit.allowed) {
    return NextResponse.json({ error: limit.limit === 0 ? '当前会员档位不含此功能，请升级后使用' : '今日语法批改次数已用完，请明天再试或升级会员' }, { status: 429 });
  }

  const isContinue = !!preceding;
  const isQuestion = /[?？]\s*$/.test(preceding);
  const contextFields = isContinue
    ? (isQuestion
        ? '- followsContext：句子是否正面回答了给定的「开头问句」（答非所问则为 false）\n'
        : '- followsContext：句子是否自然承接给定的「上文」（续写题必须承接上文，否则为 false）\n')
    : '';
  const userContent = isContinue
    ? `目标语法：${grammarPoint}${whatItDoes ? `（${whatItDoes}）` : ''}\n${isQuestion ? '开头问句' : '上文'}：${preceding}\n用户${isQuestion ? '回答' : '续写'}：${sentence}`
    : `目标语法：${grammarPoint}${whatItDoes ? `（${whatItDoes}）` : ''}\n用户造句：${sentence}`;

  const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
    timeoutMs: 20_000,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      thinking: { type: 'disabled' },
      messages: [
        {
          role: 'system',
          content: `你是韩语语法练习评判助手。用户在练习一个指定的语法点，写了一个句子${isContinue ? '来承接给定的上文' : ''}。你要判断：句子是否语法正确自然，以及**是否真的用到了目标语法点**。

评判规则：
- 忽略标点差异（缺句号、多逗号、全半角混用等），只评语义和语法
- **usedGrammar：句子是否真正使用了目标语法点。若没用到，无论句子本身是否正确，isCorrect 都必须为 false**
${contextFields}- score 1-5分：1-2分=有明显错误或没用到目标语法，3分=基本正确且用到语法，4-5分=自然流畅且语法运用地道
- isCorrect：句子正确自然 且 usedGrammar 为 true${isContinue ? ' 且 followsContext 为 true' : ''} 时才为 true
- wrongPart：必须是用户原句中的连续子串（含标点照抄），指出错误部分；无错误返回 ""
- correctPart：wrongPart 对应的正确写法；无错误返回 ""
- explanation：中文简短解释（1-2句）。若没用到目标语法或没承接上文，要明确指出
- betterWay：一个用到目标语法、更地道的整句写法
- userTranslation：用户句子的中文翻译
- betterTranslation：betterWay 的中文翻译
- improvement：一个简短短语标签（3-8字），说明核心改进点；已很好则返回"表达已很自然"

只返回JSON，格式：
{"isCorrect":true,"usedGrammar":true,${isContinue ? '"followsContext":true,' : ''}"score":4,"wrongPart":"","correctPart":"","explanation":"解释","betterWay":"更地道写法","userTranslation":"用户句中译","betterTranslation":"地道说法中译","improvement":"改进点标签"}
不要markdown，不要其他文字。`,
        },
        { role: 'user', content: userContent },
      ],
      temperature: 0.3,
      max_tokens: 320,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
  const json = await res.json();
  const content = json.choices[0].message.content.trim();
  const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const result = JSON.parse(cleanJson);

  result.usedGrammar = result.usedGrammar ?? false;
  if (isContinue) result.followsContext = result.followsContext ?? false;
  // 没用到目标语法（或续写没承接）则强制判错，防止"写对但跑题也通过"
  const baseCorrect = result.isCorrect ?? false;
  result.isCorrect = baseCorrect && result.usedGrammar && (isContinue ? result.followsContext : true);
  result.score = typeof result.score === 'number' ? result.score : 1;
  result.wrongPart = result.wrongPart ?? '';
  result.correctPart = result.correctPart ?? '';
  result.explanation = result.explanation ?? '';
  result.betterWay = result.betterWay ?? '';
  result.userTranslation = result.userTranslation ?? '';
  result.betterTranslation = result.betterTranslation ?? '';
  result.improvement = result.improvement ?? '';
  if (result.wrongPart && !sentence.includes(result.wrongPart)) {
    result.wrongPart = '';
    result.correctPart = '';
  }

  await recordAiUsage(userId, 'judge');
  return NextResponse.json(result);
}
