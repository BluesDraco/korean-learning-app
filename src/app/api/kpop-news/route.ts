import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEEPSEEK_MODEL } from '@/lib/deepseek';

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const CACHE_FILE = path.join(process.cwd(), 'data', 'kpop-daily.json');
const CACHE_TTL = 8 * 60 * 60 * 1000; // 8 hours

interface BilibiliVideo {
  bvid: string;
  title: string;
  author: string;
  description: string;
  play: number;
  pic: string;
}

interface WeiboPost {
  title: string;
  url: string;
  hot: number;
}

interface NewsPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  source: 'bilibili' | 'weibo';
  sourceUrl: string;
  bvid?: string;       // Bilibili video ID for embed
  pic?: string;         // thumbnail
  author?: string;
  vocab: { ko: string; zh: string }[];
}

interface Cache {
  date: string;
  updatedAt: number;
  posts: NewsPost[];
}

function readCache(): Cache | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
  } catch {}
  return null;
}

function writeCache(posts: NewsPost[]) {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ date: new Date().toISOString().slice(0, 10), updatedAt: Date.now(), posts }, null, 2), 'utf-8');
}

// Fetch real Bilibili KPOP videos
async function fetchBilibiliVideos(): Promise<BilibiliVideo[]> {
  try {
    const res = await fetch(
      'https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=KPOP&order=pubdate&page=1&page_size=10',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.bilibili.com' } }
    );
    if (!res.ok) return [];
    const data: any = await res.json();
    const results = data?.data?.result || [];
    return results.map((v: any) => ({
      bvid: v.bvid,
      title: v.title?.replace(/<[^>]+>/g, '') || '',
      author: v.author || '',
      description: v.description?.replace(/<[^>]+>/g, '').slice(0, 200) || '',
      play: v.play || 0,
      pic: v.pic || '',
    }));
  } catch {
    return [];
  }
}

// Fetch Weibo KPOP hot search
async function fetchWeiboTrends(): Promise<WeiboPost[]> {
  try {
    const res = await fetch(
      'https://weibo.com/ajax/side/hotSearch',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://weibo.com' } }
    );
    if (!res.ok) return [];
    const data: any = await res.json();
    const items = data?.data?.realtime || [];
    return items
      .filter((i: any) => {
        const kw = (i.word || '').toLowerCase();
        return /kpop|k-pop|韩|bts|blackpink|aespa|ive|newjeans|gidle|seventeen|stray|twice|exo|nct|txt|enhypen|iu|bigbang|ikon|winner|mamamoo|red.?velvet|itzy|le.?sserafim|trot|mnet|mama|sbs|kbs|mbc|(?:g)i-dle|音乐银行|人气歌谣/.test(kw);
      })
      .slice(0, 6)
      .map((i: any) => ({
        title: i.word || '',
        url: i.scheme || `https://s.weibo.com/weibo?q=${encodeURIComponent(i.word || '')}`,
        hot: i.num || 0,
      }));
  } catch {
    return [];
  }
}

const AI_SYSTEM_PROMPT = `你是KPOP内容编辑，精通韩语和中文。我会给你一批B站视频和微博热点的真实数据。请为每一条生成一个帖子。

要求：
1. 每条返回：id(英文)、title(吸引眼球的标题，可优化原标题)、summary(2-4句中文概述视频/话题内容)、tag(回归/新歌/演唱会/OST/颁奖/趋势/粉丝/综艺/直拍)、source(bilibili或weibo)、sourceUrl(原始链接)、bvid(仅B站视频需要)、pic(仅B站视频需要)、author(仅B站视频需要)、vocab(3-5个韩语关键词汇)
2. B站和微博各取4-5条最热的内容
3. 词汇选和内容相关的核心韩语词
4. 保持数据完整性——bvid和sourceUrl不要丢失

返回纯JSON数组，不要任何markdown格式。`;

async function fetchFromAI(): Promise<NewsPost[]> {
  const apiKey = process.env.DEEPSEEK_NEWS_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_NEWS_KEY not configured');

  // Fetch real data from platforms
  const [biliVideos, weiboTrends] = await Promise.all([
    fetchBilibiliVideos(),
    fetchWeiboTrends(),
  ]);

  // Build context for AI
  let context = `当前日期：${new Date().toISOString().slice(0, 10)}\n\n`;

  if (biliVideos.length > 0) {
    context += '【B站最新KPOP视频】\n';
    biliVideos.forEach((v, i) => {
      context += `${i + 1}. [bvid:${v.bvid}] ${v.title}\n   作者:${v.author} | 播放:${v.play} | 简介:${v.description}\n   封面:${v.pic}\n   链接:https://www.bilibili.com/video/${v.bvid}\n\n`;
    });
  }

  if (weiboTrends.length > 0) {
    context += '【微博KPOP热搜】\n';
    weiboTrends.forEach((w, i) => {
      context += `${i + 1}. ${w.title} | 热度:${w.hot}\n   链接:${w.url}\n\n`;
    });
  }

  if (!biliVideos.length && !weiboTrends.length) {
    context += '请根据最新KPOP动态生成今日热门帖子。';
  }

  const dsRes = await fetch(DEEPSEEK_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: AI_SYSTEM_PROMPT },
        { role: 'user', content: context },
      ],
      temperature: 0.7,
      max_tokens: 6000,
    }),
  });

  if (!dsRes.ok) {
    const err = await dsRes.text();
    throw new Error(`DeepSeek API error (${dsRes.status}): ${err.slice(0, 300)}`);
  }

  const dsData = await dsRes.json();
  const content = dsData.choices?.[0]?.message?.content || '';
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse: ' + content.slice(0, 300));
  return JSON.parse(jsonMatch[0]);
}

export async function GET() {
  const cached = readCache();
  const isStale = !cached || (Date.now() - cached.updatedAt) > CACHE_TTL;

  if (!isStale && cached) {
    return NextResponse.json({ ...cached, stale: false });
  }

  try {
    const posts = await fetchFromAI();
    writeCache(posts);
    return NextResponse.json({ date: new Date().toISOString().slice(0, 10), updatedAt: Date.now(), posts, stale: false });
  } catch (e: any) {
    if (cached) {
      return NextResponse.json({ ...cached, stale: true, error: e.message });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const posts = await fetchFromAI();
    writeCache(posts);
    return NextResponse.json({ ok: true, count: posts.length, posts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
