import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';

// 含鉴权，禁缓存
export const dynamic = 'force-dynamic';
export const maxDuration = 20;

const API_KEY = process.env.MINIMAX_API_KEY;
const GROUP_ID = process.env.MINIMAX_GROUP_ID;
const MODEL = 'speech-02-turbo';

// 白名单：只允许这两个韩语音色，防前端传任意 voice_id 刷账户
const VOICES: Record<string, string> = {
  female: 'Korean_SweetGirl',
  male: 'Korean_CheerfulBoyfriend',
};
const DEFAULT_VOICE = 'female';

// 博客动物卡司音色（与 scripts/blog-narrate.mjs / memory blog-voice-roster 一致）。
// 评论区动态动物回复走这里，按 animalId 取角色真声；同样服务端硬编码防刷。
const ANIMAL_VOICES: Record<string, string> = {
  tori: 'ttv-voice-2026072418124226-IqYdeGs2',
  minji: 'ttv-voice-2026071820165926-CWE1Lxma',
  haru: 'ttv-voice-2026071820110926-BaiXIoqU',
  nabi: 'ttv-voice-2026071820210626-iTgw6kmg',
  junho: 'ttv-voice-2026071820245526-ZPK3zbvn',
  choco: 'ttv-voice-2026071820310926-1fuuwrOc',
  koal: 'ttv-voice-2026071820275126-YOC6tHI9',
  darami: 'Korean_bright_announcer_vv1',
  news: 'Korean_PlayboyCharmer',
  gomdori: 'ttv-voice-2026071717173426-dYRoOH37',
  yowoo: 'Korean_SweetGirl',
};

// 每句一调、频率高，不做功能性限流：整体额度由 /api/ai/realtime-chat 的 realtime_chat 把关。
// 这里只设宽松上限防脚本单独刷本端点（正常用户碰不到）。
const ABUSE_LIMIT = 600;

// 内存缓存：key = rate:text，value = 解码后 MP3 Buffer。重启清空。
const cache = new Map<string, Buffer>();
const CACHE_MAX = 200;

function rateToSpeed(rate?: number): number {
  // 前端 rate 是倍速(0.75~1.x)，MiniMax speed 同为倍速，范围 0.5~2
  if (typeof rate !== 'number' || !isFinite(rate)) return 1;
  return Math.min(2, Math.max(0.5, rate));
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!API_KEY || !GROUP_ID) {
    return NextResponse.json({ error: 'MiniMax not configured' }, { status: 503 });
  }

  let text: string;
  let speed: number;
  let voiceKey: string;
  let animalId: string;
  try {
    const body = await req.json();
    text = typeof body.text === 'string' ? body.text.trim() : '';
    speed = rateToSpeed(body.rate);
    voiceKey = body.voice === 'male' ? 'male' : DEFAULT_VOICE;
    animalId = typeof body.animalId === 'string' ? body.animalId : '';
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  if (!text) return NextResponse.json({ error: 'empty text' }, { status: 400 });
  if (text.length > 500) return NextResponse.json({ error: 'text too long' }, { status: 400 });

  // animalId 命中卡司则用角色音色，否则回落 female/male（voiceKey）
  const voiceId = ANIMAL_VOICES[animalId] ?? VOICES[voiceKey];
  const cacheKey = `${animalId || voiceKey}:${speed}:${text}`;
  const hit = cache.get(cacheKey);
  if (hit) {
    return new NextResponse(new Uint8Array(hit), {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
    });
  }

  const limit = await checkAiRateLimit(auth.userId, 'tts_minimax', ABUSE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '语音合成调用过于频繁，请稍后再试' },
      { status: 429, headers: { 'Retry-After': '86400' } },
    );
  }

  let data: { data?: { audio?: string }; base_resp?: { status_code?: number; status_msg?: string } };
  try {
    const res = await fetch(`https://api.minimaxi.com/v1/t2a_v2?GroupId=${GROUP_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        text,
        stream: false,
        voice_setting: { voice_id: voiceId, speed, vol: 1.0, pitch: 0 },
        audio_setting: { sample_rate: 32000, bitrate: 128000, format: 'mp3' },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    data = await res.json();
  } catch {
    return NextResponse.json({ error: 'TTS 服务连接失败' }, { status: 502 });
  }

  if (data.base_resp?.status_code !== 0 || !data.data?.audio) {
    console.error('[tts/minimax]', data.base_resp);
    return NextResponse.json({ error: 'TTS 合成失败' }, { status: 502 });
  }

  const buf = Buffer.from(data.data.audio, 'hex');
  await recordAiUsage(auth.userId, 'tts_minimax', MODEL);

  if (cache.size >= CACHE_MAX) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
  cache.set(cacheKey, buf);

  return new NextResponse(new Uint8Array(buf), {
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
  });
}
