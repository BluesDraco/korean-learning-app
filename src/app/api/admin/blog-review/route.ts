import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getAdminReviewPosts } from '@/lib/server/blog';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

// GET — 待二审的 UGC 帖（一审通过 + 用户勾选参赛），附综合分 + 真实点赞/评论。
export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const posts = await getAdminReviewPosts();
  return NextResponse.json({ posts });
}
