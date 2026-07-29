import { NextResponse } from 'next/server';
import { readingArticles } from '@/data/reading-new';
import type { SidebarArticle } from '@/app/reading/_components/LibrarySidebar';

// 侧栏只需这几个字段做计数/分类/难度分布。走 API 让 client 页不必 import
// 27k 行文章全库。静态数据，长缓存 + stale-while-revalidate。
const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

export async function GET() {
  const articles: SidebarArticle[] = readingArticles.map((a) => ({
    id: a.id, title: a.title, level: a.level, topic: a.topic, hidden: a.hidden,
  }));
  return NextResponse.json({ articles }, { headers: { 'Cache-Control': CACHE } });
}
