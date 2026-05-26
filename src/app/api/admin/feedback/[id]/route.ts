import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { ResolveFeedbackBody } from '@/types/admin';

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

  // Feedback table not created yet — acknowledge the request
  return NextResponse.json({
    id,
    status: body.status,
    resolvedAt: Date.now(),
    resolvedBy: adminCheck.username,
    note: body.note,
    message: 'Feedback persistence requires feedbacks table migration.',
  });
}
