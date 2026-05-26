import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { ResolveFeedbackBody, FeedbackItem } from '@/types/admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const body: ResolveFeedbackBody = await request.json();

  if (!body.status || !['resolved', 'ignored'].includes(body.status)) {
    return NextResponse.json({ error: 'status 必须是 resolved 或 ignored' }, { status: 400 });
  }

  // In production, update the feedbacks table
  // For now, return updated mock item
  const updated: FeedbackItem & { note?: string } = {
    id,
    userId: 'user-1',
    username: 'mock',
    type: 'word_error',
    content: 'mock feedback',
    status: body.status,
    createdAt: Date.now() - 86400000,
    resolvedAt: Date.now(),
    resolvedBy: adminCheck.username,
    ...(body.note ? { note: body.note } : {}),
  };

  return NextResponse.json(updated);
}
