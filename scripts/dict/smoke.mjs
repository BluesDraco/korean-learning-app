import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const shots = process.env.TEMP + '/dict-shots';
import { mkdirSync } from 'node:fs';
mkdirSync(shots, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); // iPhone-ish
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));

async function step(name, fn) {
  try { await fn(); console.log('OK  ', name); }
  catch (e) { console.log('FAIL', name, '::', e.message); }
}

await step('load /vocabulary/dictionary', async () => {
  await page.goto(`${BASE}/vocabulary/dictionary`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
});

await step('초성 index bar present', async () => {
  const buttons = await page.locator('button', { hasText: 'ㄱ' }).count();
  if (buttons === 0) throw new Error('no ㄱ index button');
});

await step('entries rendered (가…)', async () => {
  await page.waitForSelector('text=边，边上', { timeout: 5000 });
});

await page.screenshot({ path: `${shots}/01-browse.png`, fullPage: false });

await step('expand first entry', async () => {
  await page.locator('text=边，边上').first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${shots}/02-expanded.png`, fullPage: false });
});

await step('search 家具', async () => {
  const input = page.locator('input[placeholder*="搜"]');
  await input.fill('家具');
  await page.waitForTimeout(1200);
  await page.waitForSelector('text=家具', { timeout: 5000 });
  await page.screenshot({ path: `${shots}/03-search.png`, fullPage: false });
});

console.log('\nConsole errors:', errors.length ? errors.slice(0, 10) : 'none');
console.log('Screenshots in', shots);
await browser.close();
