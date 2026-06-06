// Seed KPOP hot posts from static data into the database
// Run: npx tsx src/scripts/seedHotPosts.ts
// NOTE: uses new KoreanHotReading data model (crawler → enrich → kpopHotReadings)

import { getDb } from '@/lib/server/db';
import { kpopHotReadings } from '@/data/kpopHotPosts';

async function seed() {
  const db = await getDb();

  for (const post of kpopHotReadings) {
    await db.run(
      `INSERT OR IGNORE INTO kpop_hot_posts
       (id, title_zh, title_ko, summary_zh, category, image_url, source_url,
        source_name, artists, groups, tags, hot_score, learning_score,
        published_at, fetched_at, created_at, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post.id,
        post.titleZh,
        post.originalTitleKo,
        post.bodyZh,
        'comeback',
        post.imageUrl ?? null,
        post.sourceUrl,
        post.sourceName,
        JSON.stringify([]),
        JSON.stringify([]),
        JSON.stringify(post.keywords || []),
        50,
        75,
        post.originalPublishedAt,
        post.fetchedAt,
        Date.now(),
        1,
      ],
    );
  }

  console.log(`Seeded ${kpopHotReadings.length} hot posts.`);
}

seed().catch(console.error);
