// 一次性内容订正：修 newmom-01 中韩标题反义 + runner-06 병句 존버텨서。
// 只改这两条帖子的相关列，读出 content_json 只替换目标句后写回，其余字段不动。
// 幂等：可重复跑。本地连 data/app.db；生产设 TURSO_* 环境变量后同脚本可用。
import { createClient } from '@libsql/client';
import path from 'path';

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});
console.log(url ? '⚠️ 连的是 TURSO 远程库' : '连的是本地 data/app.db');

// newmom-01：标题与正文（没睡过整觉）一致
await client.execute({
  sql: `UPDATE blog_posts SET title_ko=?, title_zh=? WHERE slug=?`,
  args: ['통잠 못 잔 지 6개월', '6个月没睡过整觉了', 'p2-newmom-sleep'],
});

// runner-06：删掉杂糅词 존버텨서，句子照样通顺
const OLD_KO = '새 러닝화 사서 신고 나왔는데 발이 너무 편해서 존버텨서 산 보람 있음 ㅋㅋ';
const NEW_KO = '새 러닝화 사서 신고 나왔는데 발이 너무 편해서 산 보람 있음 ㅋㅋ';
const NEW_ZH = '新跑鞋穿上出来脚太舒服了，买得太值了哈哈';
const NEW_EXCERPT = NEW_KO + ' 이제 이걸로 개인 기록 갱신 가보자고';

const r = await client.execute({ sql: `SELECT content_json FROM blog_posts WHERE slug=?`, args: ['p2-runner-shoes'] });
if (r.rows.length) {
  const content = JSON.parse(r.rows[0].content_json);
  if (content.sentences?.[0]) { content.sentences[0].ko = NEW_KO; content.sentences[0].zh = NEW_ZH; }
  await client.execute({
    sql: `UPDATE blog_posts SET excerpt_ko=?, content_json=? WHERE slug=?`,
    args: [NEW_EXCERPT, JSON.stringify(content), 'p2-runner-shoes'],
  });
}

// 校验
for (const slug of ['p2-newmom-sleep', 'p2-runner-shoes']) {
  const x = await client.execute({ sql: `SELECT title_ko, title_zh, excerpt_ko FROM blog_posts WHERE slug=?`, args: [slug] });
  console.log(slug, '→', JSON.stringify(x.rows[0]));
}
console.log('✓ done');
