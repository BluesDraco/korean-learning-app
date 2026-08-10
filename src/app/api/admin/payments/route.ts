import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const search = (searchParams.get('search') || '').trim();
  const tierFilter = searchParams.get('tier') || 'all';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));

  const db = await getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (search) {
    conditions.push('(u.username LIKE ? OR o.note LIKE ? OR o.id LIKE ?)');
    params.push('%' + search + '%', '%' + search + '%', '%' + search + '%');
  }
  if (tierFilter !== 'all') {
    conditions.push('o.tier = ?');
    params.push(tierFilter);
  }

  const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

  const countSql = 'SELECT COUNT(*) as c FROM orders o LEFT JOIN users u ON o.user_id = u.id ' + where;
  const countResult = await db.exec(countSql, params);
  const total = Number(countResult[0]?.values[0]?.[0] ?? 0);

  const offset = (page - 1) * pageSize;
  const dataSql = 'SELECT o.id, o.user_id, u.username, o.tier, o.amount, o.source, o.note, o.operator, o.created_at FROM orders o LEFT JOIN users u ON o.user_id = u.id ' + where + ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
  const dataResult = await db.exec(dataSql, [...params, pageSize, offset]);

  const payments = (dataResult[0]?.values ?? []).map((row: any) => ({
    id: row[0],
    userId: row[1],
    username: row[2] || '—',
    tier: row[3],
    amount: row[4],
    currency: 'CNY',
    source: row[5] || 'manual',
    channel: '',
    status: 'paid',
    note: row[6] || '',
    operator: row[7] || '',
    createdAt: row[8] || 0,
    paidAt: row[8] || null,
    outTradeNo: row[0],
  }));

  return NextResponse.json({ payments, total });
}
