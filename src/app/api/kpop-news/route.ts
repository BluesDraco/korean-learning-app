import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const CACHE_FILE = path.join(process.cwd(), 'data', 'kpop-daily.json');
const ONE_DAY = 24 * 60 * 60 * 1000;

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  source: string;
  sourceUrl: string;
  bilibiliQuery: string;
  vocab: { ko: string; zh: string }[];
}

interface Cache {
  date: string;
  updatedAt: number;
  items: NewsItem[];
}

function readCache(): Cache | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
  } catch {}
  return null;
}

function writeCache(items: NewsItem[]) {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const cache: Cache = {
    date: new Date().toISOString().slice(0, 10),
    updatedAt: Date.now(),
    items,
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
}

const SYSTEM_PROMPT = `你是KPOP新闻编辑，精通韩语和中文。根据提供的热门话题生成6条KPOP资讯。

要求：
1. 每条含：id(英文kebab)、title(中文)、summary(2-3句中文)、date(今天日期)、tag(回归/新歌/演唱会/OST/颁奖/趋势/粉丝)、source(来源平台名)、sourceUrl(原文链接，不知道就填"#")、bilibiliQuery(B站搜索词)、vocab(3-5个韩语词，含ko和zh)
2. 覆盖不同艺人，内容像真实新闻
3. 词汇选新闻中的核心韩语词

只返回JSON数组，不要其他文字。`;

async function fetchFromAI(): Promise<NewsItem[]> {
  const apiKey = process.env.DEEPSEEK_NEWS_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_NEWS_KEY not configured');

  // Collect topics from multiple platforms
  let topicsText = '';

  // Bilibili hot search
  try {
    const blRes = await fetch(
      'https://api.bilibili.com/x/web-interface/wbi/search/square?limit=50',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.bilibili.com' } }
    );
    if (blRes.ok) {
      const blData: any = await blRes.json();
      const items = blData?.data?.trending?.list || [];
      const kpopItems = items
        .filter((i: any) => {
          const kw = (i.keyword || '').toLowerCase();
          return /kpop|k-pop|韩|bts|blackpink|aespa|ive|newjeans|gidle|seventeen|stray.?kids|twice|exo|nct|txt|enhypen|iu|girls.?generation|big.?bang|ikon|winner|mamamoo|red.?velvet|itzy|le.?sserafim|trot|mnet|mama|sbs|kbs|mbc|音乐银行|人气歌谣|音乐中心|(?:g)i-dle/.test(kw);
        })
        .map((i: any) => i.keyword)
        .slice(0, 15);
      if (kpopItems.length > 0) {
        topicsText += '【B站热搜】\n' + kpopItems.map((k: string, i: number) => `${i + 1}. ${k}`).join('\n') + '\n\n';
      }
    }
  } catch {}

  // Weibo hot search
  try {
    const wbRes = await fetch(
      'https://weibo.com/ajax/side/hotSearch',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://weibo.com' } }
    );
    if (wbRes.ok) {
      const wbData: any = await wbRes.json();
      const items = wbData?.data?.realtime || [];
      const kpopItems = items
        .filter((i: any) => {
          const kw = (i.word || i.note || '').toLowerCase();
          return /kpop|k-pop|韩|bts|blackpink|aespa|ive|newjeans|gidle|seventeen|stray|twice|exo|nct|txt|enhypen|iu|bigbang|ikon|winner|mamamoo|red.?velvet|itzy|le.?sserafim|trot|mnet|mama|sbs|kbs|mbc|(?:g)i-dle/.test(kw);
        })
        .map((i: any) => i.word || i.note)
        .slice(0, 15);
      if (kpopItems.length > 0) {
        topicsText += '【微博热搜】\n' + kpopItems.map((k: string, i: number) => `${i + 1}. ${k}`).join('\n') + '\n\n';
      }
    }
  } catch {}

  if (!topicsText) {
    topicsText = '请根据最新KPOP动态生成今日资讯（当前日期：' + new Date().toISOString().slice(0, 10) + '）';
  }

  topicsText += '\n请同时为每条资讯标注来源平台和链接（B站、微博、YouTube等）。';

  const dsRes = await fetch(DEEPSEEK_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: topicsText },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!dsRes.ok) {
    const err = await dsRes.text();
    throw new Error(`DeepSeek API error: ${err}`);
  }

  const dsData = await dsRes.json();
  const content = dsData.choices?.[0]?.message?.content || '';
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse AI response: ' + content.slice(0, 200));
  return JSON.parse(jsonMatch[0]);
}

// GET: return cached news, auto-refresh if stale
export async function GET() {
  const cached = readCache();
  const isStale = !cached || (Date.now() - cached.updatedAt) > ONE_DAY;

  if (!isStale && cached) {
    return NextResponse.json({ ...cached, stale: false });
  }

  // Return stale cache immediately if we have it, refresh in background
  if (isStale) {
    try {
      const items = await fetchFromAI();
      writeCache(items);
      return NextResponse.json({ date: new Date().toISOString().slice(0, 10), updatedAt: Date.now(), items, stale: false });
    } catch (e: any) {
      if (cached) {
        return NextResponse.json({ ...cached, stale: true, error: e.message });
      }
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ...cached, stale: false });
}

// POST: force refresh
export async function POST() {
  try {
    const items = await fetchFromAI();
    writeCache(items);
    return NextResponse.json({ ok: true, count: items.length, items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
