import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogPosts } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

// 每帖含当前用户的 liked/saved，绝不能被 CDN/代理跨用户缓存（同 6-26 串号事故门类）
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 博客文章列表（分页；公开，登录用户附带自己的点赞/收藏状态）
// ?page=1&limit=20 → { posts, page, hasMore, totalPages }
export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const filter = searchParams.get('filter');
  const savedOnly = filter === 'saved';
  const followingOnly = filter === 'following';
  const mineOnly = filter === 'mine';
  const refreshKey = Number(searchParams.get('r')) || 0;
  const result = await getBlogPosts(auth?.userId, page, limit, savedOnly, refreshKey, followingOnly, mineOnly);
  return NextResponse.json(result, { headers: NO_STORE });
}
