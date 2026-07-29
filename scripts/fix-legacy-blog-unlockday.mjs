import { createClient } from '@libsql/client';
import path from 'path';

// 修正 6 个初版示范帖的 unlock_day，对齐真实剧情时间线（w1/w2 主线 Day 1-30）。
// 依据：Day 1 出发 → Day 4 到宿舍 → Day 6 语学堂第一课 → Day 23 弘大看偶像 → Day 30 升中级。
// cafe(15)/hoesik(17) 本就合理不动；subway/hongdae 穿帮，baedal/proverb 高级难度挂初级阶段。

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const fixes = [
  { id: 'blog-subway', day: 7, why: '语学堂第一课(Day6)后开始通勤' },
  { id: 'blog-hongdae', day: 24, why: '弘大娱乐——Day23看偶像/Day24演唱会周末' },
  { id: 'blog-baedal', day: 30, why: '高级难度，Day30升中级后才合理' },
  { id: 'blog-proverb', day: 30, why: '高级难度，Day30升中级后才合理' },
];

async function main() {
  for (const f of fixes) {
    await client.execute({
      sql: `UPDATE blog_posts SET unlock_day = ? WHERE id = ? AND author_kind = 'npc'`,
      args: [f.day, f.id],
    });
    console.log(`  ${f.id} → day ${f.day}  (${f.why})`);
  }
  // Verify
  const ids = fixes.map((f) => f.id);
  const ph = ids.map(() => '?').join(',');
  const r = await client.execute(`SELECT id, unlock_day FROM blog_posts WHERE id IN (${ph})`, ids);
  console.log('\nVerify:');
  r.rows.forEach((x) => console.log(`  ${x.id} = day ${x.unlock_day}`));
}
main().catch((e) => { console.error(e); process.exit(1); });
