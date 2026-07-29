// scripts/playwright-grammar-tour-v2.mjs
// 用 URL 参数 ?card=card-pX-lY 直接打开卡片
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');
const JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6ImRldnRlc3QiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODI2NDMwMTMsImV4cCI6MTc4MzI0NzgxM30.Rn9zd5g0Eai3mV_q2923zRnXf8uC7evveECEAQn6UpM';
const screenshotsDir = path.resolve(__dirname, '..', 'playwright-screenshots');
mkdirSync(screenshotsDir, { recursive: true });

async function loadCardIds() {
  const ids = [];
  for (let p = 1; p <= 14; p++) {
    const mod = await import('file:///' + path.join(dataDir, `grammar-cards-p${p}.ts`).replace(/\\/g, '/'));
    for (const c of mod[`grammarCardsP${p}`]) {
      ids.push({ id: c.id, partNumber: c.partNumber, lessonNumber: c.lessonNumber, title: c.title, isPractice: c.isPractice });
    }
  }
  return ids;
}

const cards = await loadCardIds();
console.log(`Total cards: ${cards.length}`);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 1800 } });
await ctx.addCookies([{ name: 'token', value: JWT, url: 'http://localhost:3000' }]);
const page = await ctx.newPage();

const findings = [];
const consoleErrors = new Map();
const pageErrorsMap = new Map();
let currentCardId = null;

page.on('pageerror', err => {
  if (!currentCardId) return;
  if (!pageErrorsMap.has(currentCardId)) pageErrorsMap.set(currentCardId, []);
  pageErrorsMap.get(currentCardId).push(err.message);
});
page.on('console', m => {
  if (m.type() !== 'error') return;
  if (!currentCardId) return;
  // 过滤 CSP 字体 warning（系统问题，不是卡片问题）
  if (m.text().includes('fonts.googleapis.com')) return;
  if (m.text().includes('Content Security Policy')) return;
  if (!consoleErrors.has(currentCardId)) consoleErrors.set(currentCardId, []);
  consoleErrors.get(currentCardId).push(m.text());
});

let surveyed = 0;
let nearBlank = 0;

for (const card of cards) {
  currentCardId = card.id;
  surveyed++;
  process.stdout.write(`\r[${surveyed}/${cards.length}] ${card.id}    `);

  try {
    await page.goto(`http://localhost:3000/grammar?card=${card.id}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    // 检测页面是否真打开了卡片（找进度条 "1 / N"）
    const isCardOpen = await page.evaluate(() => {
      const txt = document.body.innerText;
      return /\d+\s*\/\s*\d+/.test(txt) && !!document.querySelector('[style*="linear-gradient"]');
    });

    if (!isCardOpen) {
      findings.push({ cardId: card.id, kind: 'card-not-opened', detail: 'progress bar not found' });
      continue;
    }

    // 截 step 0
    const sshot0 = path.join(screenshotsDir, `${card.id}_step0.png`);
    await page.screenshot({ path: sshot0, fullPage: true });

    // 检测正文长度（排除导航栏标题等）
    const stepText = await page.evaluate(() => {
      // 找内容主区域（除去顶部 header）
      const main = document.querySelector('main') || document.body;
      return main.innerText.length;
    });
    if (stepText < 200) {
      findings.push({ cardId: card.id, kind: 'step0-near-blank', detail: `text ${stepText} chars` });
      nearBlank++;
    }

    // 测试翻页 - 用 evaluate 触发点击
    let pageCount = 1;
    for (let s = 1; s < 12; s++) {
      const clicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const next = btns.find(b => {
          const t = b.textContent?.trim() || '';
          return (t === '下一页' || t === '下一步' || t === '继续' || t === 'Next' || t === '下一题') && !b.disabled;
        });
        if (next) { next.click(); return true; }
        return false;
      });
      if (!clicked) break;
      await page.waitForTimeout(500);
      pageCount++;
    }
    if (pageCount < 3 && !card.isPractice) {
      findings.push({ cardId: card.id, kind: 'too-few-steps', detail: `only ${pageCount} steps` });
    }

  } catch (e) {
    findings.push({ cardId: card.id, kind: 'load-exception', detail: e.message.slice(0, 100) });
  }
}

console.log(`\n\n采样了 ${surveyed} 张卡`);
console.log(`空白卡: ${nearBlank}`);
console.log(`所有 findings: ${findings.length}`);
console.log(`Console 报错卡: ${consoleErrors.size}`);
console.log(`Page 报错卡: ${pageErrorsMap.size}`);

const byKind = {};
for (const f of findings) (byKind[f.kind] ||= []).push(f);
for (const [k, items] of Object.entries(byKind)) {
  console.log(`\n[${k}] (${items.length})`);
  for (const f of items.slice(0, 20)) console.log(`  ${f.cardId}: ${f.detail}`);
  if (items.length > 20) console.log(`  ...(${items.length - 20} more)`);
}

if (consoleErrors.size) {
  console.log('\n=== Console Errors ===');
  for (const [cid, errs] of consoleErrors) {
    console.log(`${cid}:`);
    for (const e of errs.slice(0, 3)) console.log(`  ${e.slice(0, 200)}`);
  }
}
if (pageErrorsMap.size) {
  console.log('\n=== Page Errors ===');
  for (const [cid, errs] of pageErrorsMap) {
    console.log(`${cid}:`);
    for (const e of errs.slice(0, 3)) console.log(`  ${e.slice(0, 200)}`);
  }
}

writeFileSync(path.join(screenshotsDir, 'report-v2.json'), JSON.stringify({
  surveyed,
  findings,
  consoleErrors: Object.fromEntries(consoleErrors),
  pageErrors: Object.fromEntries(pageErrorsMap),
}, null, 2));

await browser.close();
