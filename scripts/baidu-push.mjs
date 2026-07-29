#!/usr/bin/env node
// 百度主动推送 — 把线上 sitemap 里的全部 URL 推给百度，触发秒级抓取。
// 新站养收录神器：被动等百度爬要几周，主动推送当天就能进抓取队列。
//
// 用法（上线后，拿到准入密钥再跑）：
//   BAIDU_PUSH_TOKEN=你的token node scripts/baidu-push.mjs
//   或： node scripts/baidu-push.mjs --token=你的token
//
// 准入密钥来源：百度站长平台 ziyuan.baidu.com → 普通收录 → 资源提交 → 主动推送(实时)。
// 每天有推送配额上限（新站通常 3000 条/天，足够本站几百条 URL）。

const SITE = 'https://torikorean.com';
const SITEMAP_URL = `${SITE}/sitemap.xml`;

function getToken() {
  const fromArg = process.argv.find((a) => a.startsWith('--token='));
  if (fromArg) return fromArg.slice('--token='.length);
  return process.env.BAIDU_PUSH_TOKEN || '';
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`拉取 sitemap 失败: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  // 只推国内主域、且排除 /en 英文页（百度不需要英文版）
  return urls.filter((u) => u.startsWith(SITE) && !u.startsWith(`${SITE}/en`));
}

async function push(urls, token) {
  const endpoint = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}&token=${token}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: urls.join('\n'),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function main() {
  const token = getToken();
  if (!token) {
    console.error('❌ 缺少准入密钥。用法: BAIDU_PUSH_TOKEN=xxx node scripts/baidu-push.mjs');
    process.exit(1);
  }

  console.log(`拉取 sitemap: ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`共 ${urls.length} 条国内 URL 待推送`);
  if (urls.length === 0) {
    console.error('❌ sitemap 没解析到 URL，检查 SITE_URL 是否已改成 https://torikorean.com');
    process.exit(1);
  }

  const { status, data } = await push(urls, token);
  if (status === 200 && data.success !== undefined) {
    console.log(`✅ 推送成功: 成功 ${data.success} 条，当天剩余配额 ${data.remain}`);
    if (data.not_same_site?.length) console.warn(`⚠️ 非本站 URL(被拒): ${data.not_same_site.length} 条`);
    if (data.not_valid?.length) console.warn(`⚠️ 格式错误 URL: ${data.not_valid.length} 条`);
  } else {
    console.error(`❌ 推送失败 HTTP ${status}:`, JSON.stringify(data));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('❌ 出错:', e.message);
  process.exit(1);
});
