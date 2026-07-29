import { NextResponse } from 'next/server';
import { getRankingBoard } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// GET — 今日公开热度榜 TOP3（管理员二审入选、公开正文用改写版）。公开接口。
export async function GET() {
  // getRankingBoard 已只返回公开安全字段（动物昵称/形象，绝不含真实账号）
  const board = await getRankingBoard(todayStr());
  return NextResponse.json({ board });
}
