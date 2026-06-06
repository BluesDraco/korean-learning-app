// 将 kpopHotPosts.ts 数据同步到数据库（支持 Turso 远程和本地 SQLite）
// 服务器执行: node scripts/seed-hot-posts.mjs

import { readFileSync, existsSync } from 'fs';
import { createClient } from '@libsql/client';
import path from 'path';

// 手动加载 .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
}
loadEnv();

const JSON_FILE = 'data/hot-posts.json';

function parseHotPosts() {
  if (!existsSync(JSON_FILE)) {
    console.error('data/hot-posts.json 不存在，请先运行 node scripts/crawl-hot-posts.mjs');
    process.exit(1);
  }
  return JSON.parse(readFileSync(JSON_FILE, 'utf-8'));
}

async function seed() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const localDbPath = path.resolve(process.cwd(), 'data', 'app.db');
  const dbUrl = url || `file:${localDbPath}`;

  console.log('DB:', url ? 'Turso remote' : `Local (${localDbPath})`);

  const db = createClient({
    url: dbUrl,
    ...(url ? { authToken } : {}),
  });

  const posts = parseHotPosts();
  console.log(`解析到 ${posts.length} 条热帖`);

  // 清空旧数据
  await db.execute('DELETE FROM kpop_hot_posts');
  await db.execute('DELETE FROM kpop_hot_sentences');

  const now = Date.now();
  let sentenceCount = 0;
  for (const p of posts) {
    await db.execute({
      sql: `INSERT INTO kpop_hot_posts
        (id, title_zh, title_ko, summary_zh, category, image_url, source_url, source_name,
         artists, groups, tags, hot_score, learning_score, published_at, fetched_at, created_at, is_published)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id, p.titleZh, p.titleKo || '', p.summaryZh, p.category,
        p.imageUrl || '', p.sourceUrl, p.sourceName,
        JSON.stringify(p.artists), '[]', JSON.stringify(p.tags || []),
        p.hotScore, 85, p.publishedAt || now, now, now, 1,
      ],
    });

    // Seed sentences for this post
    for (let si = 0; si < p.sentences.length; si++) {
      const s = p.sentences[si];
      const sentenceId = `${p.id}-s${si}`;
      await db.execute({
        sql: `INSERT INTO kpop_hot_sentences
          (id, post_id, sort_index, korean, chinese, breakdown, expression_note, reusable_expression, audio_url)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          sentenceId,
          p.id,
          si,
          s.korean,
          s.chinese || '',
          JSON.stringify(s.breakdown || []),
          s.expressionNote || null,
          null,
          null,
        ],
      });
      sentenceCount++;
    }
  }

  console.log(`✅ 写入 ${posts.length} 条帖子 + ${sentenceCount} 条句子到数据库`);
}

seed().catch((e) => {
  console.error('Seed 失败:', e);
  process.exit(1);
});
