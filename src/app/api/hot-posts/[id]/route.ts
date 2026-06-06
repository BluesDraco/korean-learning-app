import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await getDb();

    const postResult = await db.exec('SELECT * FROM kpop_hot_posts WHERE id = ?', [id]);
    if (!postResult[0]?.values?.length) {
      return NextResponse.json({ error: '未找到该热帖' }, { status: 404 });
    }

    const row = postResult[0].values[0] as unknown[];
    const post = {
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
    };

    const sentencesResult = await db.exec(
      'SELECT * FROM kpop_hot_sentences WHERE post_id = ? ORDER BY sort_index ASC',
      [id],
    );

    const sentences = (sentencesResult[0]?.values || []).map((sRow: unknown[]) => ({
      id: sRow[0],
      postId: sRow[1],
      sortIndex: sRow[2],
      korean: sRow[3],
      chinese: sRow[4],
      breakdown: JSON.parse((sRow[5] as string) || '[]'),
      expressionNote: sRow[6] || null,
      reusableExpression: sRow[7] || null,
      audioUrl: sRow[8] || null,
    }));

    return NextResponse.json({ ...post, sentences });
  } catch (err) {
    console.error('Hot post detail error:', err);
    return NextResponse.json({ error: '加载失败' }, { status: 500 });
  }
}
