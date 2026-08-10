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

    const columns = result[0]?.columns ?? [];
    const col = (name: string) => columns.indexOf(name);
    const posts = (result[0]?.values || []).map((row: unknown[]) => ({
      id: row[col('id')],
      titleZh: row[col('title_zh')],
      titleKo: row[col('title_ko')],
      summaryZh: row[col('summary_zh')],
      category: row[col('category')],
      imageUrl: row[col('image_url')],
      sourceUrl: row[col('source_url')],
      sourceName: row[col('source_name')],
      artists: JSON.parse((row[col('artists')] as string) || '[]'),
      groups: JSON.parse((row[col('groups')] as string) || '[]'),
      tags: JSON.parse((row[col('tags')] as string) || '[]'),
      hotScore: row[col('hot_score')],
      learningScore: row[col('learning_score')],
      publishedAt: row[col('published_at')],
      fetchedAt: row[col('fetched_at')],
      isPublished: row[col('is_published')] === 1,
    }));

    return NextResponse.json({ posts, total, page, limit, hasMore: offset + limit < total });
  } catch (err) {
    console.error('Hot posts list error:', err);
    return NextResponse.json({ error: '加载失败' }, { status: 500 });
  }
}
