import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { normalizeKoreanPronunciation } from '@/lib/audio/koreanPronunciation';
import crypto from 'crypto';

const APPKEY = process.env.ALIYUN_NLS_APPKEY;
const ACCESS_KEY_ID = process.env.ALIYUN_ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ALIYUN_ACCESS_KEY_SECRET;
const TTS_URL = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';

// Cache token in memory (valid ~12h, refresh at 10h)
let cachedToken: { token: string; expiresAt: number } | null = null;

function percentEncode(s: string): string {
  return encodeURIComponent(s)
    .replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
    .replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

async function getNlsToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  // Aliyun RPC signature v1 — query string style
  const params: Record<string, string> = {
    AccessKeyId: ACCESS_KEY_ID!,
    Action: 'CreateToken',
    Format: 'JSON',
    RegionId: 'cn-shanghai',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: crypto.randomUUID().replace(/-/g, ''),
    SignatureVersion: '1.0',
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    Version: '2019-02-28',
  };

  // Sort keys alphabetically and build canonical query string
  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join('&');

  const stringToSign = `GET&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;

  const signature = crypto
    .createHmac('sha1', `${ACCESS_KEY_SECRET}&`)
    .update(stringToSign)
    .digest('base64');

  const url = `https://nls-meta.cn-shanghai.aliyuncs.com/?${canonicalQuery}&Signature=${percentEncode(signature)}`;

  const res = await fetchWithTimeout(url, { timeoutMs: 10_000, cache: 'no-store' });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`NLS token error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const token: string = data?.Token?.Id;
  if (!token) {
    throw new Error(`NLS token missing in response: ${JSON.stringify(data)}`);
  }

  const expireTime: number = data?.Token?.ExpireTime
    ? data.Token.ExpireTime * 1000
    : now + 10 * 60 * 60 * 1000;

  cachedToken = { token, expiresAt: expireTime - 30 * 60 * 1000 }; // refresh 30min before expiry
  return token;
}

async function doTTS(ttsText: string, voice: string, useSSML = false): Promise<ArrayBuffer | null> {
  const token = await getNlsToken();

  const syllables = Array.from(ttsText.replace(/\s/g, '')).filter((ch) => {
    const c = ch.charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3;
  }).length;
  const speechRate = syllables <= 2 ? 0 : syllables <= 5 ? -20 : syllables <= 10 ? -50 : -100;
  // Single/double syllable words: append period to hint TTS engine for clean ending
  const finalText = syllables <= 2 && !/[.。!?！？]$/.test(ttsText) ? ttsText + '.' : ttsText;

  const ttsRes = await fetchWithTimeout(TTS_URL, {
    timeoutMs: 15_000,
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-NLS-Token': token,
    },
    body: JSON.stringify({
      appkey: APPKEY,
      text: finalText,
      token,
      format: 'mp3',
      sample_rate: 24000,
      voice,
      volume: 60,
      speech_rate: speechRate,
      pitch_rate: 0,
      ...(useSSML ? { text_type: 'ssml' } : {}),
    }),
  });

  if (!ttsRes.ok) return null;

  const contentType = ttsRes.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) return null;

  const buf = await ttsRes.arrayBuffer();
  if (buf.byteLength < 1000) {
    cachedToken = null; // stale token — force refresh on retry
    return null;
  }
  return buf;
}

export async function POST(req: Request) {
  if (!APPKEY || !ACCESS_KEY_ID || !ACCESS_KEY_SECRET) {
    return NextResponse.json({ error: 'Aliyun NLS not configured' }, { status: 500 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const text: string = body.text || '';
    const voice: string = body.voice || 'Kyong';

    if (!text || text.length > 300) {
      return NextResponse.json({ error: 'Text required (max 300 chars)' }, { status: 400 });
    }

    const chineseVoices = ['zhichu', 'zhiqian', 'zhiyue', 'xiaoyun', 'xiaogang', 'ruoxi'];
    const isChineseVoice = chineseVoices.includes(voice);
    const ttsText = text; // client already normalized via sanitizeTTSText

    // Try once, retry once if silent (stale token)
    let audioBuffer = await doTTS(ttsText, voice, false);
    if (!audioBuffer) {
      audioBuffer = await doTTS(ttsText, voice, false);
    }
    if (!audioBuffer) {
      return NextResponse.json({ error: 'NLS TTS failed after retry' }, { status: 502 });
    }

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e: any) {
    if (e.name === 'AbortError' || e.name === 'FetchTimeoutError') {
      return NextResponse.json({ error: 'NLS TTS timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Warm up NLS token on server start to avoid first-request latency
if (APPKEY && ACCESS_KEY_ID && ACCESS_KEY_SECRET) {
  getNlsToken().catch(() => {});
}
