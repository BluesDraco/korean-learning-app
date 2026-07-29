import { NextResponse } from 'next/server';
import { checkGuestAiRateLimit } from '@/lib/server/rate-limit';

// 本机 edge-tts 服务；海外站可跨境指向上海（TTS_UPSTREAM=http://<上海IP>:8800/tts）
const TTS_API = process.env.TTS_UPSTREAM || 'http://localhost:8800/tts';

// 公开发音接口的每 IP 日限：阈值定高，只挡脚本刷带宽，正常用户一天点不到这么多。
// 前端 tts.ts 对非 2xx 会回落浏览器语音，429 不会让用户听不到音。
const TTS_DAILY_PER_IP = 3000;

// 进程内音频缓存：key = voice:rate:text，value = 合成后 MP3 字节。
// CDN 关闭后，同一句话此前靠 CDN 跨用户复用，现在每人每次都打本机 8800 合成；
// 加内存缓存让高频内容（教材例句/固定台词）跨用户直接命中，不再重复合成。重启清空。
const audioCache = new Map<string, Buffer>();
const CACHE_MAX = 500;

function cacheGet(key: string): Buffer | undefined {
  const hit = audioCache.get(key);
  if (hit) {
    // LRU：命中后移到末尾
    audioCache.delete(key);
    audioCache.set(key, hit);
  }
  return hit;
}

function cacheSet(key: string, val: Buffer): void {
  if (audioCache.size >= CACHE_MAX) {
    const first = audioCache.keys().next().value;
    if (first) audioCache.delete(first);
  }
  audioCache.set(key, val);
}

function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || 'sunhi';
  const rate = searchParams.get('rate') || '+0%';

  if (!text) {
    return NextResponse.json({ error: 'text parameter required' }, { status: 400 });
  }

  // 缓存命中：跳过限流与上游合成，直接返回
  const cacheKey = `${voice}:${rate}:${text}`;
  const cached = cacheGet(cacheKey);
  if (cached) {
    return new NextResponse(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=2592000, immutable',
        'X-Cache': 'HIT',
      },
    });
  }

  const limit = await checkGuestAiRateLimit(getClientIp(req), 'tts-edge', TTS_DAILY_PER_IP);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  }

  const url = `${TTS_API}?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&rate=${encodeURIComponent(rate)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      return NextResponse.json({ error: 'TTS upstream failed' }, { status: 502 });
    }
    const buf = await res.arrayBuffer();
    // 288B 是 Aliyun NLS token 过期时返回的静音 MP3，500 是留裕度阈值
    if (buf.byteLength < 500) {
      return NextResponse.json({ error: 'TTS upstream returned silent audio' }, { status: 502 });
    }
    const bytes = Buffer.from(buf);
    cacheSet(cacheKey, bytes);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=2592000, immutable',
        'X-Cache': 'MISS',
      },
    });
  } catch {
    return NextResponse.json({ error: 'TTS upstream unreachable' }, { status: 502 });
  }
}
