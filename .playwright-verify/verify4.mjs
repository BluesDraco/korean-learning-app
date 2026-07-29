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
  // remove any fixed high-z overlay nodes entirely, so nothing covers the badge
  await page.evaluate(() => {
    for (const el of [...document.querySelectorAll('body *')]) {
      const cs = getComputedStyle(el);
      if ((cs.position === 'fixed' || cs.position === 'absolute') && +cs.zIndex >= 40) {
        const r = el.getBoundingClientRect();
        // only large overlays (backdrops/modals), not the nav/badge
        if (r.width > 300 && r.height > 300) el.style.display = 'none';
      }
    }
  });
}
async function cap(vp, tier, name, clip) {
  const ctx = await authedCtx(vp);
  const page = await ctx.newPage();
  if (tier) await forceTier(page, tier);
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2800);
  await killOverlays(page);
  await page.waitForTimeout(400);
  // scroll badge into view
  const info = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const el = btns.find(x => /升级会员|会员$/.test(x.textContent.trim()) && x.querySelector('svg'));
    if (!el) return { found: false };
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return { found: true, text: el.textContent.trim(), y: Math.round(r.y), covered: top && !el.contains(top) && top !== el, coveredBy: top ? top.className || top.tagName : null };
  });
  log(name, JSON.stringify(info));
  await page.screenshot({ path: `${DIR}/${name}.png`, clip });
  await ctx.close();
}
// clip regions capture the greeting strip where badge lives
await cap({ width: 393, height: 852 }, 'free', 'fix2-mobile-free', { x: 0, y: 250, width: 393, height: 200 });
await cap({ width: 393, height: 852 }, null, 'fix2-mobile-real', { x: 0, y: 250, width: 393, height: 200 });
await cap({ width: 1440, height: 900 }, 'free', 'fix2-desktop-free', { x: 0, y: 280, width: 900, height: 200 });
await cap({ width: 1440, height: 900 }, null, 'fix2-desktop-real', { x: 0, y: 280, width: 900, height: 200 });
await browser.close();
