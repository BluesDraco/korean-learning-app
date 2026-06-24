import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import crypto from 'crypto';

const APPKEY = process.env.ALIYUN_NLS_APPKEY;
const ACCESS_KEY_ID = process.env.ALIYUN_ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ALIYUN_ACCESS_KEY_SECRET;
const TTS_URL = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';

// 只允许收音示范词，防止滥用
const WHITELIST = new Set(['박', '산', '옷', '말', '밤', '밥', '강']);

let cachedToken: { token: string; expiresAt: number } | null = null;

function percentEncode(s: string): string {
  return encodeURIComponent(s)
    .replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
    .replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

async function getNlsToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt) return cachedToken.token;

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

  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys.map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`).join('&');
  const stringToSign = `GET&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = crypto.createHmac('sha1', `${ACCESS_KEY_SECRET}&`).update(stringToSign).digest('base64');
  const url = `https://nls-meta.cn-shanghai.aliyuncs.com/?${canonicalQuery}&Signature=${percentEncode(signature)}`;

  const res = await fetchWithTimeout(url, { timeoutMs: 10_000, cache: 'no-store' });
  if (!res.ok) throw new Error(`NLS token ${res.status}`);

  const data = await res.json();
  const token: string = data?.Token?.Id;
  if (!token) throw new Error('NLS token missing');

  const expireTime: number = data?.Token?.ExpireTime ? data.Token.ExpireTime * 1000 : Date.now() + 10 * 60 * 60 * 1000;
  cachedToken = { token, expiresAt: expireTime - 30 * 60 * 1000 };
  return token;
}

export async function GET(req: Request) {
  if (!APPKEY || !ACCESS_KEY_ID || !ACCESS_KEY_SECRET) {
    return NextResponse.json({ error: 'NLS not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text') ?? '';

  if (!WHITELIST.has(text)) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  }

  try {
    const token = await getNlsToken();

    const ttsRes = await fetchWithTimeout(TTS_URL, {
      timeoutMs: 15_000,
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', 'X-NLS-Token': token },
      body: JSON.stringify({
        appkey: APPKEY,
        text: text + '.',
        token,
        format: 'mp3',
        sample_rate: 24000,
        voice: 'Kyong',
        volume: 60,
        speech_rate: -50,
        pitch_rate: 0,
      }),
    });

    if (!ttsRes.ok) return NextResponse.json({ error: 'NLS failed' }, { status: 502 });
    const contentType = ttsRes.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) return NextResponse.json({ error: 'NLS error' }, { status: 502 });

    const buf = await ttsRes.arrayBuffer();
    if (buf.byteLength < 1000) {
      cachedToken = null;
      return NextResponse.json({ error: 'NLS silent' }, { status: 502 });
    }

    return new NextResponse(buf, {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400' },
    });
  } catch {
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}
