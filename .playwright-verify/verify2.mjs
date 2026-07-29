import { chromium } from 'playwright';
const DIR = 'C:/Users/Administrator/Desktop/korean-learning-app/.playwright-verify';
const BASE = 'http://localhost:3000';
const log = (...a) => console.log(...a);
const errors = [];
const browser = await chromium.launch();
async function authedCtx(vp) {
  const ctx = await browser.newContext({ viewport: vp });
  const r = await ctx.request.post(`${BASE}/api/auth/login`, { data: { username: 'testuser', password: 'test1234' } });
  if (!r.ok()) log('LOGIN FAIL', r.status());
  return ctx;
}
async function forceTier(page, tier) {
  await page.route('**/api/membership/me**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier, expiry: tier === 'free' ? null : Date.now() + 30 * 864e5 }) }));
}
function attach(page, tag) {
  page.on('console', m => { if (m.type() === 'error' && !/401|Failed to load resource/.test(m.text())) errors.push(`[${tag}] ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${tag}] pageerror: ${e.message}`));
}

// S2c: free -> click monthly upgrade, expect checkout redirect (use in-page JS click to bypass overlay)
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S2c');
  await forceTier(page, 'free');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector('.mb-card.tier-monthly .mb-cta').click());
  await page.waitForTimeout(5500);
  log('S2c after monthly-upgrade click url:', page.url());
  const notice = await page.$eval('.mb-notice', e => e.textContent.trim()).catch(() => null);
  if (notice) log('S2c notice:', notice);
  await page.screenshot({ path: `${DIR}/step2-after-monthly-click.png`, fullPage: true });
  await ctx.close();
}
// S3: dark mode monthly-forced full screenshot
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S3');
  await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  // trigger notice by clicking free(owned) card via JS
  await page.evaluate(() => { const b = document.querySelector('.mb-card.tier-free .mb-cta'); if (b && !b.disabled) b.click(); });
  await page.waitForTimeout(600);
  const notice = await page.$eval('.mb-notice', e => ({ text: e.textContent.trim(), color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor })).catch(() => null);
  log('S3 dark notice:', JSON.stringify(notice));
  log('S3 bodyBg:', await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
  await page.screenshot({ path: `${DIR}/step3-membership-dark-monthly-1440.png`, fullPage: true });
  await ctx.close();
}
// S4: monthly-forced -> click yearly upgrade -> checkout redirect
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S4');
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${DIR}/step4-membership-as-monthly-1440.png`, fullPage: true });
  await page.evaluate(() => document.querySelector('.mb-card.tier-yearly .mb-cta').click());
  await page.waitForTimeout(5500);
  log('S4 after yearly-upgrade click url:', page.url());
  const notice = await page.$eval('.mb-notice', e => e.textContent.trim()).catch(() => null);
  if (notice) log('S4 notice:', notice);
  await page.screenshot({ path: `${DIR}/step4-after-yearly-upgrade-click.png`, fullPage: true });
  await ctx.close();
}
log('\n===== JS ERRORS ====='); errors.length ? errors.forEach(e => log(e)) : log('none');
await browser.close();
