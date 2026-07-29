import { chromium } from 'playwright';
const DIR = 'C:/Users/Administrator/Desktop/korean-learning-app/.playwright-verify';
const BASE = 'http://localhost:3000';
const log = (...a) => console.log(...a);
const browser = await chromium.launch();
async function authedCtx(vp) {
  const ctx = await browser.newContext({ viewport: vp });
  await ctx.request.post(`${BASE}/api/auth/login`, { data: { username: 'testuser', password: 'test1234' } });
  return ctx;
}
async function forceTier(page, tier) {
  await page.route('**/api/membership/me**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier, expiry: tier === 'free' ? null : Date.now() + 30 * 864e5 }) }));
}
async function killOverlays(page) {
  await page.evaluate(() => {
    for (const el of [...document.querySelectorAll('body *')]) {
      const cs = getComputedStyle(el);
      if ((cs.position === 'fixed' || cs.position === 'absolute') && +cs.zIndex >= 40) {
        const r = el.getBoundingClientRect();
        if (r.width > 300 && r.height > 300 && !el.querySelector('.mb-cards')) el.style.display = 'none';
      }
    }
  });
}
// tier-aware monthly, light
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await killOverlays(page);
  await page.waitForTimeout(300);
  // trigger notice: click free(owned)
  await page.evaluate(() => { const b = document.querySelector('.mb-card.tier-free .mb-cta'); if (b) b.click(); });
  await page.waitForTimeout(500);
  const notice = await page.$eval('.mb-notice', e => e.textContent.trim()).catch(() => null);
  log('monthly-view notice(after clicking free):', notice);
  await page.screenshot({ path: `${DIR}/final-step4-monthly-cards.png`, clip: { x: 0, y: 0, width: 1440, height: 620 } });
  await ctx.close();
}
// dark, monthly
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await killOverlays(page);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.querySelector('.mb-card.tier-free .mb-cta'); if (b) b.click(); });
  await page.waitForTimeout(500);
  const notice = await page.$eval('.mb-notice', e => ({ text: e.textContent.trim(), color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor })).catch(() => null);
  log('dark notice:', JSON.stringify(notice));
  await page.screenshot({ path: `${DIR}/final-step3-dark-cards.png`, clip: { x: 0, y: 0, width: 1440, height: 620 } });
  await ctx.close();
}
await browser.close();
