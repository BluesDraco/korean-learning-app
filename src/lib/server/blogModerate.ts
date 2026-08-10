import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export type AiModerationResult = { status: 'passed' | 'blocked'; reason: string };

interface RawModeration {
  [k: string]: unknown;
  safe: boolean;
  reason: string;
}

// UGC 一审：先过本地关键词过滤（政治红线/广告/隐私），再过 DeepSeek 语义审核
// （脏话、人身攻击、反社会、反政府、违法违禁）。~10s 内出结果，通过才对作者可见。
// 失败/超时按「拦截」处理（宁可拦错不可放过，合规优先），作者可改后重发。
export async function aiModerate(text: string): Promise<AiModerationResult> {
  // 1) 本地硬过滤（政治关键词等），命中直接拦截
  const local = filterContent(text, 'user_content');
  if (!local.ok) {
    return { status: 'blocked', reason: local.reason };
  }

  // 2) DeepSeek 语义审核
  const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    // 无 AI 能力时不能默认放行 UGC（合规），保守拦截交人工
    return { status: 'blocked', reason: 'moderation.pending_review' };
  }

  const systemPrompt = `你是一个内容安全审核员，审核用户在韩语学习社区发布的短文（可能是韩语、中文或混合）。
判断内容是否包含以下任一违规，只要命中一条就判定不安全：
1. 脏话、辱骂、人身攻击、仇恨言论、歧视
2. 反社会、暴力、恐怖、自残、教唆犯罪
3. 反政府、颠覆国家、危害国家安全、涉政敏感
4. 色情、低俗、性暗示
5. 广告、引流、诈骗、违法交易（如代购、博彩、毒品）
6. 泄露他人隐私（真实姓名+联系方式等）
学习者写错韩语、语法不通、内容平淡都不算违规。只审内容安全，不审语言质量。
只输出严格 JSON，不要解释、不要 markdown：
{"safe": true/false, "reason": "不安全时给出简短中文原因（≤20字），安全时留空"}`;

  try {
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 10_000,
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `待审核内容：\n${text}` },
        ],
        temperature: 0,
        max_tokens: 100,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) return { status: 'blocked', reason: 'moderation.pending_review' };

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content?.trim() ?? '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const raw = JSON.parse(cleaned) as Partial<RawModeration>;

    if (raw.safe === true) return { status: 'passed', reason: '' };
    return { status: 'blocked', reason: (raw.reason || 'moderation.non_compliant').slice(0, 40) };
  } catch {
    // 超时/解析失败 → 保守拦截
    return { status: 'blocked', reason: 'moderation.pending_review' };
  }
}
