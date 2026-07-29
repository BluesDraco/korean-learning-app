import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 博客 feed 时间戳重排：把所有帖子的 published_at 重写进「过去 30 天」窗口。
// 背景：之前 seed 用 P(8,x) 造了未来日期（122 篇 published_at > NOW），
//       导致前端相对时间全显示「방금」，且加权排序失真。
//
// 规则：
//   - 门控帖（author_kind='npc'，含 tori）：时间戳跟随 unlock_day —— day 越大越新。
//     published_at = NOW - (maxDay-unlockDay)/(maxDay-minDay) * 28d - jitter(id)
//     （用户读到 Day N 时刚解锁的帖 = 最新时间戳，自然浮顶。）
//   - 路人帖（passerby）：保留现有 published_at 的相对先后，线性重映射到
//     [NOW-30d, NOW-2d]（故意留最近 2 天空档给 tori/主角团，保证兔莉稳居顶部）。
//   - 只 UPDATE published_at 单列，其余不动。幂等：每次按运行时锚点 NOW 重算。
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
});

const NOW = Date.now();
const DAY = 86_400_000;

// 基于 id 的确定性 jitter（0 ~ 30 分钟），用于打破同 unlock_day 内的并列。
function jitter(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 1800) * 1000; // 秒 → 毫秒，最多 1800s = 30min
}

async function main() {
  // ---- 1. 门控帖（npc，含 tori）：按 unlock_day 映射 ----
  const npc = rows(await client.execute(
    `SELECT id, unlock_day FROM blog_posts WHERE author_kind = 'npc'`,
  ));
  const days = npc.map((r) => Number(r.unlock_day) || 0);
  const minDay = days.length ? Math.min(...days) : 0;
  const maxDay = days.length ? Math.max(...days) : 0;
  const daySpan = Math.max(1, maxDay - minDay);

  let npcCount = 0;
  for (const r of npc) {
    const ud = Number(r.unlock_day) || 0;
    const frac = (maxDay - ud) / daySpan;          // 0=最新(maxDay)  1=最旧(minDay)
    const ts = NOW - Math.round(frac * 28 * DAY) - jitter(r.id);
    await client.execute({
      sql: `UPDATE blog_posts SET published_at = ? WHERE id = ?`,
      args: [ts, r.id],
    });
    npcCount++;
  }

  // ---- 2. 路人帖：保留相对序，线性铺到 [NOW-30d, NOW-2d] ----
  const pass = rows(await client.execute(
    `SELECT id FROM blog_posts WHERE author_kind = 'passerby'
     ORDER BY published_at ASC, id ASC`,
  ));
  const start = NOW - 30 * DAY;   // 最旧
  const end = NOW - 2 * DAY;      // 最新（留 2 天空档给 tori/主角团）
  const width = end - start;
  const n = pass.length;

  let passCount = 0;
  for (let i = 0; i < n; i++) {
    const frac = n <= 1 ? 1 : i / (n - 1);         // 0=最旧  1=最新
    const ts = Math.round(start + frac * width);
    await client.execute({
      sql: `UPDATE blog_posts SET published_at = ? WHERE id = ?`,
      args: [ts, pass[i].id],
    });
    passCount++;
  }

  // ---- 3. 校验输出 ----
  const span = rows(await client.execute(
    `SELECT MIN(published_at) mn, MAX(published_at) mx FROM blog_posts`,
  ))[0];
  const future = rows(await client.execute({
    sql: `SELECT COUNT(*) n FROM blog_posts WHERE published_at > ?`,
    args: [NOW],
  }))[0];

  const iso = (t) => new Date(Number(t)).toISOString().slice(0, 16);
  console.log(`NOW           = ${iso(NOW)}`);
  console.log(`门控帖(npc)   : ${npcCount} 篇  (unlock_day ${minDay}~${maxDay})`);
  console.log(`路人帖        : ${passCount} 篇  → [NOW-30d, NOW-2d]`);
  console.log(`全库 span     : ${iso(span.mn)} ~ ${iso(span.mx)}`);
  console.log(`future 帖数   : ${future.n}  (应为 0)`);

  await client.close();
}

function rows(res) {
  return res.rows.map((r) => ({ ...r }));
}

main().catch((err) => {
  console.error(err);
  client.close();
  process.exit(1);
});
