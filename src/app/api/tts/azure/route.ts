import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';

const AZURE_KEY = process.env.AZURE_TTS_KEY;
const AZURE_REGION = process.env.AZURE_TTS_REGION || 'eastus';

const VOICES: Record<string, string> = {
  sunhi: 'ko-KR-SunHiNeural',
  injoon: 'ko-KR-InJoonNeural',
  jimin: 'ko-KR-JiMinNeural',
  seohyeon: 'ko-KR-SeoHyeonNeural',
  yujin: 'ko-KR-YuJinNeural',
  bongjin: 'ko-KR-BongJinNeural',
};

function escXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!AZURE_KEY) {
    return NextResponse.json({ error: 'Azure TTS not configured' }, { status: 500 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const text: string = body.text || '';
    const rate: string = body.rate || '0%';
    const voiceKey: string = body.voice || 'sunhi';

    if (!text || text.length > 2000) {
      return NextResponse.json({ error: 'Text required (max 2000 chars)' }, { status: 400 });
    }

    const voiceName = VOICES[voiceKey] || VOICES.sunhi;

    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
  <voice name="${voiceName}">
    <prosody rate="${rate}" pitch="0%">
      ${escXml(text)}
    </prosody>
  </voice>
</speak>`;

    const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const res = await fetchWithTimeout(url, {
      timeoutMs: 15_000,
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      },
      body: ssml,
    });

    if (!res.ok) {
      const err = await res.text().catch(() => 'unknown');
      return NextResponse.json({ error: `Azure TTS error: ${res.status}`, detail: err }, { status: 502 });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e: any) {
    if (e.name === 'AbortError' || e.name === 'FetchTimeoutError') {
      return NextResponse.json({ error: 'Azure TTS timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
