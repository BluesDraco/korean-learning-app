import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { fetchWithTimeout } from '@/lib/fetch';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { image, expectedCount } = await req.json();
    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
    }
    if (image.length > 2_000_000) { // ~1.5MB raw image
      return NextResponse.json({ error: 'Image too large' }, { status: 413 });
    }
    const n = typeof expectedCount === 'number' && expectedCount > 0 && expectedCount < 20
      ? Math.floor(expectedCount) : 0;
    // 手写单字/单字母是 OCR 模型的弱项（无上下文、笔迹不规整）；用通用视觉模型 qwen-vl-max
    // 推理字形结构，对手写的容错远高于 qwen-vl-ocr。prompt 明确「可能是单个字母(자모)」，
    // 避免模型硬凑成完整音节块。
    const prompt = n === 1
      ? '这是一张白底黑字的韩文手写图，图中是一个手写的韩文字符——可能是一个完整音节块（如 한、가），也可能是单个字母（자모，如 ㄱ、ㅏ、ㅎ）。请根据笔画结构判断它最像哪个韩文字符，只输出这一个字符本身，不要输出空格、标点、罗马音或任何解释。完全看不出是韩文才回空。'
      : n > 1
      ? `这是一张白底黑字的韩文手写图，图中应有 ${n} 个韩文字符（音节块或字母）。请按左到右、上到下顺序输出全部 ${n} 个。只回字符本身，不要空格标点罗马音，不要解释。没有韩文就回空。`
      : '识别图中手写的韩文字符（可能是音节块或单个字母 자모）。只回字符本身。没有韩文就回空。不要加标点，不要解释，不要罗马音。';

    // 手写识别（qwen-vl-ocr）单次成本极低，免费开放；仅保留每日防刷上限
    const limit = await checkAiRateLimit(auth.userId, 'handwriting');
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '今日 AI 识别次数已达上限，请明天再试' },
        { status: 429, headers: { 'X-RateLimit-Limit': String(limit.limit), 'Retry-After': '86400' } },
      );
    }

    const res = await fetchWithTimeout('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      timeoutMs: 15_000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-vl-plus',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: image } },
              { type: 'text', text: prompt },
            ],
          },
        ],
        temperature: 0,
        // 识别结果最多几个字符，压低上限减少生成耗时（多字场景 n 个字也够）
        max_tokens: 32,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[ai/handwriting] upstream error:', res.status, errText.slice(0, 500));
      return NextResponse.json({ text: '', error: `API error: ${res.status}` }, { status: 502 });
    }

    const json = await res.json();
    const raw: string = json.choices?.[0]?.message?.content?.trim() ?? '';
    // 只保留韩文字（하-힣、ㄱ-ㅎ、ㅏ-ㅣ），去掉标点罗马音等
    const text = raw.replace(/[^가-힣ᄀ-ᇿ㄰-㆏]/g, '');
    console.log('[ai/handwriting] imgBytes=', image.length, 'raw=', JSON.stringify(raw), 'text=', JSON.stringify(text));
    await recordAiUsage(auth.userId, 'handwriting');
    return NextResponse.json({ text, raw });
  } catch (err) {
    console.error('[ai/handwriting]', err);
    return NextResponse.json({ text: '', error: '识别失败，请重试' }, { status: 200 });
  }
}
