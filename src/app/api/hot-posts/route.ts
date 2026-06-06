import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'hot';
    const offset = (page - 1) * limit;

    const db = await getDb();

    let whereClause = 'WHERE is_published = 1';
    const params: unknown[] = [];

    if (category && category !== 'all') {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    const orderBy = sort === 'latest' ? 'published_at DESC' : sort === 'learning' ? 'learning_score DESC' : 'hot_score DESC';

    const countResult = await db.exec(`SELECT COUNT(*) as cnt FROM kpop_hot_posts ${whereClause}`, params);
    const total = (countResult[0]?.values?.[0]?.[0] as number) || 0;

    const result = await db.exec(
      `SELECT * FROM kpop_hot_posts ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...params, limit, offset],
    );

    const posts = (result[0]?.values || []).map((row: unknown[]) => ({
      id: row[0],
      titleZh: row[1],
      titleKo: row[2],
      summaryZh: row[3],
      category: row[4],
      imageUrl: row[5],
      sourceUrl: row[6],
      sourceName: row[7],
      artists: JSON.parse((row[8] as string) || '[]'),
      groups: JSON.parse((row[9] as string) || '[]'),
      tags: JSON.parse((row[10] as string) || '[]'),
      hotScore: row[11],
      learningScore: row[12],
      publishedAt: row[13],
      fetchedAt: row[14],
      isPublished: row[16] === 1,
    }));

    return NextResponse.json({ posts, total, page, limit, hasMore: offset + limit < total });
  } catch (err) {
    console.error('Hot posts list error:', err);
    return NextResponse.json({ error: '加载失败' }, { status: 500 });
  }
}
