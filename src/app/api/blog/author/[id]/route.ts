import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogPostsByAuthor, getBlogFollowerCount, getBlogFollows } from '@/lib/server/blog';
import { BLOG_CAST_BY_ID } from '@/data/blogCast';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 动物作者主页数据：作者档案 + 该动物已解锁帖分页 + 粉丝数 + 当前用户是否已关注
// ?page=1 → { author, posts, page, hasMore, totalPages, followerCount, following }
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = BLOG_CAST_BY_ID[id];
  if (!author) return NextResponse.json({ error: 'Unknown author' }, { status: 404, headers: NO_STORE });

  const auth = await getAuthFromCookie();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;

  const [postPage, followerCount, follows] = await Promise.all([
    getBlogPostsByAuthor(id, auth?.userId, page),
    getBlogFollowerCount(id),
    auth ? getBlogFollows(auth.userId) : Promise.resolve([]),
  ]);

  return NextResponse.json(
    { author, ...postPage, followerCount, following: follows.includes(id) },
    { headers: NO_STORE }
  );
}
