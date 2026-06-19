import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fetchWithTimeout } from '@/lib/fetch';

const execFileAsync = promisify(execFile);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';
const BATCH_SIZE = 8;

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.trim().match(p);
    if (m) return m[1];
  }
  return null;
}

interface RawSegment { text: string; start: number; duration: number; }

function mergeSegments(raw: RawSegment[]): { korean: string; startMs: number; endMs: number }[] {
  const merged: { korean: string; startMs: number; endMs: number }[] = [];
  let buf: RawSegment[] = [];

  const flush = () => {
    if (!buf.length) return;
    const text = buf.map(s => s.text.replace(/\n/g, ' ')).join(' ').trim();
    const startMs = Math.round(buf[0].start * 1000);
    const endMs = Math.round((buf[buf.length - 1].start + buf[buf.length - 1].duration) * 1000);
    if (text) merged.push({ korean: text, startMs, endMs });
    buf = [];
  };

  for (const seg of raw) {
    buf.push(seg);
    const totalDur = (buf[buf.length - 1].start + buf[buf.length - 1].duration) - buf[0].start;
    const endsWithPunct = /[.!?。！？…]$/.test(seg.text.trim());
    if (totalDur >= 2.5 || endsWithPunct || totalDur >= 8) {
      flush();
    }
  }
  flush();
  return merged;
}

async function processWithDeepSeek(
  sentences: { korean: string; startMs: number; endMs: number }[],
  apiKey: string
): Promise<{ chinese: string; tokens: { surface: string; meaning: string; partOfSpeech: string }[] }[]> {
  const results: { chinese: string; tokens: { surface: string; meaning: string; partOfSpeech: string }[] }[] = [];

  for (let i = 0; i < sentences.length; i += BATCH_SIZE) {
    const batch = sentences.slice(i, i + BATCH_SIZE);
    const numbered = batch.map((s, idx) => `${idx + 1}. ${s.korean}`).join('\n');

    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 60_000,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: `你是韩语字幕处理助手。对每句韩语字幕，输出 JSON 数组，每个元素包含：
- chinese: 自然流畅的中文翻译
- tokens: 数组，每个词元包含 surface（韩文原词）、meaning（中文词义，2-4字）、partOfSpeech（词性：名词/动词/形容词/副词/助词/感叹词/代词/数词）

只输出 JSON 数组，不要任何解释，不要 markdown 代码块。数组长度必须与输入句子数量一致。`,
          },
          {
            role: 'user',
            content: `处理以下 ${batch.length} 句韩语字幕，按顺序输出 JSON 数组：\n${numbered}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
    const json = await res.json();
    const content = json.choices[0].message.content.trim()
      .replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed: { chinese: string; tokens: { surface: string; meaning: string; partOfSpeech: string }[] }[];
    try {
      parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) throw new Error('not array');
    } catch {
      // fallback: create empty tokens, use raw text as chinese
      parsed = batch.map(s => ({ chinese: s.korean, tokens: [] }));
    }

    // ensure length matches
    while (parsed.length < batch.length) parsed.push({ chinese: '', tokens: [] });
    results.push(...parsed.slice(0, batch.length));
  }

  return results;
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { url } = body;
    if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 });

    const videoId = extractVideoId(url);
    if (!videoId) return NextResponse.json({ error: '无法识别 YouTube 链接，请检查格式' }, { status: 400 });

    const db = await getDb();

    // check cache
    const existing = await db.exec(
      `SELECT id FROM shadowing_clips WHERE youtube_id = ? AND is_published = 1 LIMIT 1`,
      [videoId]
    );
    const existingCols = existing[0]?.columns ?? [];
    const existingRows = existing[0]?.values ?? [];
    if (existingRows.length > 0) {
      const idIdx = existingCols.indexOf('id');
      const clipId = idIdx >= 0 ? existingRows[0][idIdx] as string : null;
      if (clipId) {
        const segCount = await db.exec(
          `SELECT COUNT(*) as cnt FROM shadowing_segments WHERE clip_id = ?`, [clipId]
        );
        const cntCols = segCount[0]?.columns ?? [];
        const cnt = (segCount[0]?.values?.[0]?.[cntCols.indexOf('cnt')] as number) ?? 0;
        return NextResponse.json({ clipId, cached: true, segmentCount: cnt });
      }
    }

    // fetch metadata via oEmbed
    let title = videoId;
    let coverUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    try {
      const oembedRes = await fetchWithTimeout(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        { timeoutMs: 8000 }
      );
      if (oembedRes.ok) {
        const meta = await oembedRes.json();
        if (meta.title) title = meta.title;
        if (meta.thumbnail_url) coverUrl = meta.thumbnail_url;
      }
    } catch {}

    // run python script to get transcript
    const scriptPath = path.join(process.cwd(), 'scripts', 'get_transcript.py');
    let rawSegments: RawSegment[];
    try {
      const { stdout } = await execFileAsync('python3', [scriptPath, videoId], { timeout: 30_000 });
      const parsed = JSON.parse(stdout.trim());
      if (parsed.error) {
        if (parsed.error === 'no_korean_transcript') {
          return NextResponse.json({ error: '该视频没有韩语字幕，请选择有韩语CC字幕的视频' }, { status: 422 });
        }
        if (parsed.error === 'transcripts_disabled') {
          return NextResponse.json({ error: '该视频已禁用字幕功能' }, { status: 422 });
        }
        return NextResponse.json({ error: '字幕提取失败：' + parsed.error }, { status: 422 });
      }
      rawSegments = parsed;
    } catch (e: unknown) {
      // try python as fallback
      try {
        const { stdout } = await execFileAsync('python', [scriptPath, videoId], { timeout: 30_000 });
        const parsed = JSON.parse(stdout.trim());
        if (parsed.error) return NextResponse.json({ error: '字幕提取失败，请确认视频有韩语CC字幕' }, { status: 422 });
        rawSegments = parsed;
      } catch {
        console.error('[extract] python error:', e);
        return NextResponse.json({ error: '字幕提取失败，请确认服务器已安装 youtube-transcript-api' }, { status: 500 });
      }
    }

    if (!rawSegments.length) {
      return NextResponse.json({ error: '未能提取到字幕内容' }, { status: 422 });
    }

    // merge short segments into sentences
    const sentences = mergeSegments(rawSegments);

    // process with DeepSeek
    const apiKey = process.env.DEEPSEEK_TRANSLATE_KEY ?? '';
    if (!apiKey) return NextResponse.json({ error: 'DeepSeek API key not configured' }, { status: 500 });

    const processed = await processWithDeepSeek(sentences, apiKey);

    // calculate duration
    const durationMs = sentences.length > 0 ? sentences[sentences.length - 1].endMs : 0;

    // write clip to db
    const clipId = `clip-${videoId}-${Date.now()}`;
    const now = Date.now();
    await db.run(
      `INSERT INTO shadowing_clips (id, title, speaker, description, source_type, youtube_id, cover_url, duration_ms, difficulty, tags, is_premium, is_published, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [clipId, title, '', '', 'youtube', videoId, coverUrl, durationMs, 'A2', '[]', 0, 1, 0, now, now]
    );

    // write segments in batch
    const statements = sentences.map((seg, i) => ({
      sql: `INSERT INTO shadowing_segments (id, clip_id, seg_index, start_ms, end_ms, korean, chinese, tokens, shadowing_tip, vocab_pills, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        crypto.randomUUID(),
        clipId,
        i + 1,
        seg.startMs,
        seg.endMs,
        seg.korean,
        processed[i]?.chinese ?? '',
        JSON.stringify(processed[i]?.tokens ?? []),
        '',
        '[]',
        now,
      ],
    }));
    await db.batch(statements);

    return NextResponse.json({ clipId, title, segmentCount: sentences.length, cached: false });
  } catch (e) {
    console.error('[shadowing/extract POST]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
