import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getDb } from '@/lib/server/db';
import type { LocalLyricLine } from '@/types/kpop';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_ANALYZE_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  let songName: string;
  let artistName: string;
  let estimatedDurationSec: number;

  try {
    const body = await req.json();
    songName = (body.songName || '').trim();
    artistName = (body.artistName || '').trim();
    estimatedDurationSec = Number(body.estimatedDurationSec) || 240;
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  if (!songName) {
    return NextResponse.json({ error: '请输入歌曲名称' }, { status: 400 });
  }
  if (songName.length > 100) {
    return NextResponse.json({ error: '歌曲名称过长' }, { status: 400 });
  }

  const songKey = `${songName}__${artistName}`.toLowerCase();

  // Check cache
  try {
    const db = await getDb();
    const cached = await db.exec(
      'SELECT lyrics FROM kpop_songs_cache WHERE song_key = ?',
      [songKey]
    );
    const row = cached[0]?.values?.[0]?.[0];
    if (row) {
      return NextResponse.json({
        lyrics: JSON.parse(row as string) as LocalLyricLine[],
        fromCache: true,
      });
    }
  } catch {
    // Cache read failed — proceed to DeepSeek
  }

  const systemPrompt = `你是一个专业的KPOP歌词学习内容生成助手。
用户提供歌曲名和歌手名，你需要生成该歌曲的完整歌词学习内容。

严格按照以下JSON数组格式返回，不要任何markdown代码块，不要任何多余文字，只返回JSON数组：
[
  {
    "korean": "韩文歌词原文",
    "romanization": "罗马音转写（Revised Romanization）",
    "chinese": "中文翻译",
    "startMs": 15000,
    "endMs": 19000,
    "keywords": [
      {"korean": "关键词", "meaning": "中文释义"}
    ]
  }
]

时间轴规则：
- 总时长约为 ${estimatedDurationSec} 秒（${estimatedDurationSec * 1000} 毫秒）
- 前奏通常 10-20 秒，第一句歌词从约 15000ms 开始
- 每句歌词时长根据字数估算，通常 3000-6000ms
- 段落之间留 1000-2000ms 间隔
- 副歌部分节奏更紧密

keywords 规则：
- 每句提取 1-3 个有学习价值的词汇
- 只选韩文词汇（不选英文单词）
- meaning 用中文，15字以内

如果不知道该歌曲的真实歌词，请根据歌曲名和歌手风格生成合理的示例歌词内容，并在第一句的 chinese 字段末尾加注"（示例内容）"。`;

  const userMsg = artistName
    ? `请生成歌曲《${songName}》（${artistName}）的完整歌词学习内容`
    : `请生成歌曲《${songName}》的完整歌词学习内容`;

  try {
    const res = await fetchWithTimeout(DEEPSEEK_API_URL, {
      timeoutMs: 30_000,
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 502 });
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content?.trim() ?? '';
    const cleaned = content.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();

    let lyrics: LocalLyricLine[];
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return NextResponse.json({ error: 'AI返回格式异常，请重试' }, { status: 502 });
      }
      lyrics = parsed.map((item: any) => ({
        korean: String(item.korean || ''),
        romanization: String(item.romanization || ''),
        chinese: String(item.chinese || ''),
        startMs: Number(item.startMs) || 0,
        endMs: Number(item.endMs) || 0,
        keywords: Array.isArray(item.keywords)
          ? item.keywords.slice(0, 3).map((k: any) => ({
              korean: String(k.korean || ''),
              meaning: String(k.meaning || ''),
            }))
          : [],
      }));
    } catch {
      return NextResponse.json({ error: 'AI返回格式异常，请重试' }, { status: 502 });
    }

    // Write to cache (fire and forget)
    try {
      const db = await getDb();
      await db.run(
        `INSERT OR IGNORE INTO kpop_songs_cache (id, song_key, song_name, artist_name, lyrics, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          songKey,
          songName,
          artistName,
          JSON.stringify(lyrics),
          Date.now(),
        ]
      );
    } catch {
      // Cache write failed — not critical
    }

    return NextResponse.json({ lyrics, fromCache: false });
  } catch (err: any) {
    if (err?.name === 'SyntaxError') {
      return NextResponse.json({ error: 'AI返回格式异常，请重试' }, { status: 502 });
    }
    if (err?.message?.includes('timeout')) {
      return NextResponse.json({ error: '生成超时，请重试' }, { status: 504 });
    }
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
