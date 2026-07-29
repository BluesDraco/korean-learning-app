import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const shots = process.env.TEMP + '/dict-shots';
mkdirSync(shots, { recursive: true });

const WIDTHS = [
  { name: 'mobile', w: 390, h: 844 },
  { name: 'tablet', w: 834, h: 1112 },
  { name: 'desktop', w: 1440, h: 900 },
];
const BASE = 'http://localhost:3000/vocabulary/library?tab=dictionary';

const browser = await chromium.launch({ headless: true });
for (const { name, w, h } of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${shots}/resp-${name}-browse.png` });
  // expand first entry
  try {
    await page.locator('[role="button"]').first().click();
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${shots}/resp-${name}-expanded.png` });
  } catch (e) { console.log(name, 'expand failed:', e.message); }
  console.log(`${name} (${w}px): pageerrors=${errs.length ? errs.slice(0,3) : 'none'}`);
  await ctx.close();
}
await browser.close();
console.log('shots in', shots);
