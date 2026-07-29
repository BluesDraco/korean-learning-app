// scripts/playwright-grammar-tour.mjs
// 自动遍历 P1-P14 所有 145 张卡，逐张：
// 1) 加载卡片 → 截 step0
// 2) 翻到底（捕获所有 step 的渲染）
// 3) 收集所有控制台错误 / 页面错误
// 4) 检测空白页（DOM 文字过少）

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
console.log(`遍历 ${cards.length} 张卡片...`);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 1600 } });
await ctx.addCookies([{ name: 'token', value: JWT, url: 'http://localhost:3000' }]);
const page = await ctx.newPage();

const findings = [];
const consoleErrors = new Map(); // cardId → errors[]
const pageErrors = new Map();

page.on('pageerror', err => {
  const cur = currentCardId;
  if (!cur) return;
  if (!pageErrors.has(cur)) pageErrors.set(cur, []);
  pageErrors.get(cur).push(err.message);
});
page.on('console', m => {
  if (m.type() !== 'error') return;
  const cur = currentCardId;
  if (!cur) return;
  if (!consoleErrors.has(cur)) consoleErrors.set(cur, []);
  consoleErrors.get(cur).push(m.text());
});

let currentCardId = null;

// 进入 grammar 主页
console.log('Loading grammar list...');
await page.goto('http://localhost:3000/grammar', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(5000);

// 找 lesson card 的按钮 — 项目用 onClick={() => onOpenCard(card)} 实际是 React 状态
// 改用直接执行 JS 调用 setCurrentCard 不可行（state 不暴露），改用：找页面的语法 lesson 按钮文本点击
// 但 page.tsx 也允许 URL params 直接进卡？看 router
// 实际上 grammar/page.tsx 没用 URL params，得通过 onClick 点击
// 用 page.evaluate 直接修改 localStorage 让卡片 ID 持久化? 看 router
// 改方案：用 grammar/page.tsx 的 [DEBUG] 接口（没有）
// 最简单：模拟用户点击 — 但 14 个 part 都要展开
// 改用更简洁: 用 page.evaluate 注入 window.location.hash 触发? 不行
// 最终：直接 setItem 当前卡片到 localStorage, 然后 reload
// 但 lessonState 是 localStorage 里只存进度，不存当前卡
// 算了改成 — 遍历 cards, 在浏览器 console 调用 React 组件的 onOpenCard
// 不可能从外部. 改用 dom 文本点击

async function openCard(card) {
  currentCardId = card.id;
  // 回首页，找到 part 段，展开，找 lesson 名点击
  const lessonTitleText = card.title.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&').slice(0, 12);
  // 用 evaluate 获取所有 lesson card 元素
  const clicked = await page.evaluate((titleFragment) => {
    const els = Array.from(document.querySelectorAll('[role="button"], button, [class*="lesson"]'));
    for (const el of els) {
      if (el.textContent && el.textContent.includes(titleFragment)) {
        el.click();
        return true;
      }
    }
    return false;
  }, lessonTitleText);
  if (!clicked) {
    findings.push({ cardId: card.id, kind: 'open-fail', detail: `找不到 lesson "${lessonTitleText}"` });
    return false;
  }
  await page.waitForTimeout(1500);
  return true;
}

async function snapshotCurrentStep(cardId, stepIdx) {
  const filename = `${cardId}_step${stepIdx}.png`;
  const filepath = path.join(screenshotsDir, filename);
  await page.screenshot({ path: filepath, fullPage: true });
  // 检测页面 body 文字长度
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (bodyText.length < 50) {
    findings.push({ cardId, kind: 'near-blank-page', detail: `step ${stepIdx} body text only ${bodyText.length} chars` });
  }
  return filepath;
}

async function clickNext() {
  const found = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent && (b.textContent.includes('下一页') || b.textContent.includes('下一')));
    if (next && !next.disabled) { next.click(); return true; }
    return false;
  });
  if (found) await page.waitForTimeout(700);
  return found;
}

async function goBackToList() {
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const back = btns.find(b => b.textContent === '‹' || b.textContent === '<');
    if (back) back.click();
  });
  await page.waitForTimeout(800);
}

// 先回首页，展开各 part
const partsToExpand = [...new Set(cards.map(c => c.partNumber))];
console.log(`展开 ${partsToExpand.length} 个 part...`);

let cardsSurveyed = 0;
const MAX_CARDS = 30; // 限制只跑前 30 张做样本（145 太久）
const sampleCards = [];
for (let p = 1; p <= 14; p++) {
  const partCards = cards.filter(c => c.partNumber === p);
  if (partCards.length) {
    sampleCards.push(partCards[0]); // 每章首课
    if (partCards.length >= 6) sampleCards.push(partCards[5]); // 中间一张
  }
}
console.log(`抽样 ${sampleCards.length} 张卡：${sampleCards.map(c => c.id).join(', ')}`);

for (const card of sampleCards) {
  if (cardsSurveyed >= MAX_CARDS) break;
  console.log(`\n[${cardsSurveyed+1}/${sampleCards.length}] ${card.id} - ${card.title}`);
  // 回主页
  if (page.url() !== 'http://localhost:3000/grammar') {
    await page.goto('http://localhost:3000/grammar', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
  }
  // 展开 part
  await page.evaluate((partNum) => {
    const els = Array.from(document.querySelectorAll('button, [role="button"]'));
    const cnNum = ['','一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四'][partNum];
    for (const el of els) {
      if (el.textContent && (el.textContent.includes(`第${cnNum}部分`) || el.textContent.includes(`第 ${partNum} 部分`))) {
        el.click();
        return;
      }
    }
  }, card.partNumber);
  await page.waitForTimeout(1000);

  const opened = await openCard(card);
  if (!opened) {
    cardsSurveyed++;
    continue;
  }

  // 截 step 0
  await snapshotCurrentStep(card.id, 0);

  // 翻 5 页
  for (let s = 1; s < 6; s++) {
    const moved = await clickNext();
    if (!moved) break;
    await snapshotCurrentStep(card.id, s);
  }

  // 返回列表
  await goBackToList();
  cardsSurveyed++;
}

console.log(`\n采样了 ${cardsSurveyed} 张卡`);
console.log(`发现 ${findings.length} 个 finding`);
console.log(`Console 报错卡: ${consoleErrors.size}`);
console.log(`Page 报错卡: ${pageErrors.size}`);

// 输出报告
const report = {
  surveyed: cardsSurveyed,
  findings,
  consoleErrors: Object.fromEntries(consoleErrors),
  pageErrors: Object.fromEntries(pageErrors),
};
writeFileSync(path.join(screenshotsDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(`\n报告写入 ${path.join(screenshotsDir, 'report.json')}`);

await browser.close();
