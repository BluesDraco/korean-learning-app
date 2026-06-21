import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_JUDGE_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const body = await req.json();
    const { action, word, meaning, sentence } = body;

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

    const limit = await checkAiRateLimit(auth.userId, 'analyze');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '每日AI调用次数已达上限（30次），请明天再试' },
        { status: 429 },
      );
    }

    if (action === 'generate') {
      const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
        timeoutMs: 20_000,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          messages: [
            {
              role: 'system',
              content: `你是韩语造句练习助手。给定一个韩语词语，生成3到5个韩语词块，让学习者可以将这些词块组合成一个自然的句子。

要求：
- 词块必须包含给定的目标词
- 词块组合后应能构成语法正确、含义自然的句子（允许多种组合方式）
- 词块以单词或短语为单位，不要拆得太细（例如：助词和前面的名词可合并为一个词块）
- 难度适合初中级韩语学习者
- 返回打乱顺序的词块数组

只返回JSON，格式：{"blocks":["词块1","词块2","词块3"]}
不要markdown，不要其他文字。`,
            },
            {
              role: 'user',
              content: `目标词：${word}（${meaning}）`,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
      const json = await res.json();
      const content = json.choices[0].message.content.trim();
      const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(cleanJson);

      await recordAiUsage(auth.userId, 'analyze');
      return NextResponse.json(result);
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
          messages: [
            {
              role: 'system',
              content: `你是韩语造句评判助手。用户给出一个词语和他用词块排列组成的句子，判断句子是否语法正确、含义自然。

评判规则：
- 不要求与标准答案完全一致，允许多种正确写法
- score 1-5分：1-2分=有明显错误，3分=基本正确但不够自然，4-5分=自然流畅
- isCorrect：score >= 3 时为 true
- wrongPart：必须是用户原句中的子串，指出错误部分；无错误返回 ""
- correctPart：wrongPart 对应的正确写法；无错误返回 ""
- explanation：中文简短解释（1-2句），说明哪里不自然或哪里做得好
- betterWay：更地道的整句写法（即使正确也给出最自然的表达）

只返回JSON，格式：
{"isCorrect":true,"score":4,"wrongPart":"","correctPart":"","explanation":"解释","betterWay":"更地道写法"}
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
      result.betterWay = result.betterWay ?? sentence.trim();

      await recordAiUsage(auth.userId, 'analyze');
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    console.error('[ai/sentence-judge]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
