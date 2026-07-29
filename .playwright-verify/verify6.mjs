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
// hide only overlays that are NOT inside .mb-scope (announcement/onboarding live outside)
async function hideForeignOverlays(page) {
  await page.evaluate(() => {
    const scope = document.querySelector('.mb-scope');
    for (const el of [...document.querySelectorAll('body > *, body > * > *')]) {
      if (scope && (el.contains(scope) || scope.contains(el) || el === scope)) continue;
      const cs = getComputedStyle(el);
      if ((cs.position === 'fixed' || cs.position === 'absolute') && +cs.zIndex >= 40) {
        const r = el.getBoundingClientRect();
        if (r.width > 200 && r.height > 200) el.style.display = 'none';
      }
    }
  });
}
async function capture(tier, dark, name) {
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  if (dark) await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
  await forceTier(page, tier);
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  if (dark) await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await hideForeignOverlays(page);
  if (dark) await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(400);
  const cards = await page.$$eval('.mb-card', els => els.map(c => {
    const cta = c.querySelector('.mb-cta'); const badge = c.querySelector('.mb-rec-badge');
    return { tier: (c.className.match(/tier-(\w+)/) || [])[1], cta: cta?.textContent.trim(), badge: badge?.textContent.trim(), current: c.className.includes('is-current'), owned: c.className.includes('is-owned') };
  }));
  log(name, JSON.stringify(cards));
  const scopeBg = await page.evaluate(() => { const s = document.querySelector('.mb-scope'); return s ? getComputedStyle(s).backgroundColor : null; });
  log(name, 'scopeBg', scopeBg);
  await page.screenshot({ path: `${DIR}/${name}.png`, clip: { x: 0, y: 0, width: 1440, height: 640 } });
  await ctx.close();
}
await capture('monthly', false, 'final-monthly-light');
await capture('monthly', true, 'final-monthly-dark');
await browser.close();
