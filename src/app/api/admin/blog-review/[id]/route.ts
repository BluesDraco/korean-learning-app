import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { featureBlogPost } from '@/lib/server/blog';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

// PATCH — 二审动作：入选榜单（改写正文 + 设日期名次）或撤销入选。
// body: { moderatedText, featureDate: 'YYYY-MM-DD'|'', featureRank: 0-3 }
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;

  let body: { moderatedText?: unknown; featureDate?: unknown; featureRank?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const moderatedText = typeof body.moderatedText === 'string' ? body.moderatedText.trim() : '';
  const featureDate = typeof body.featureDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.featureDate)
    ? body.featureDate
    : '';
  const featureRank = Number.isInteger(body.featureRank) ? Math.max(0, Math.min(3, body.featureRank as number)) : 0;

  // 入选时必须有改写后的正文 + 日期 + 名次
  if (featureRank > 0 && (!moderatedText || !featureDate)) {
    return NextResponse.json({ error: '入选需填写改写正文、发布日期和名次' }, { status: 400 });
  }

  await featureBlogPost({
    postId: id,
    moderatedText,
    featureDate: featureRank > 0 ? featureDate : '',
    featureRank,
    adminName: adminCheck.username,
  });

  return NextResponse.json({ id, moderatedText, featureDate, featureRank });
}
