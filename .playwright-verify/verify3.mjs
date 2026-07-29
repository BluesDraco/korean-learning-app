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
// dismiss any fixed overlay modal (announcement / onboarding) by clicking close buttons
async function dismissModals(page) {
  for (let i = 0; i < 4; i++) {
    const closed = await page.evaluate(() => {
      // find visible close buttons (aria-label 关闭 / X icon) in fixed overlays
      const btns = [...document.querySelectorAll('button')];
      let did = false;
      for (const b of btns) {
        const al = (b.getAttribute('aria-label') || '').trim();
        const r = b.getBoundingClientRect();
        if (r.width === 0) continue;
        if (al === '关闭' || al.toLowerCase() === 'close' || /知道了|我知道了|开始学习|进入/.test(b.textContent.trim())) {
          // only if inside a fixed high-z container
          let el = b, fixed = false;
          while (el) { const cs = getComputedStyle(el); if (cs.position === 'fixed' && +cs.zIndex >= 40) { fixed = true; break; } el = el.parentElement; }
          if (fixed) { b.click(); did = true; }
        }
      }
      return did;
    });
    if (!closed) break;
    await page.waitForTimeout(400);
  }
}

async function shot(vp, tier, name, clip) {
  const ctx = await authedCtx(vp);
  const page = await ctx.newPage();
  if (tier) await forceTier(page, tier);
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await dismissModals(page);
  await page.waitForTimeout(800);
  const b = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const el = btns.find(x => /升级会员|会员$/.test(x.textContent.trim()) && x.querySelector('svg'));
    if (!el) return { found: false };
    const r = el.getBoundingClientRect();
    // is it actually visible (not under overlay)?
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    const covered = top && !el.contains(top) && top !== el;
    return { found: true, text: el.textContent.trim(), y: Math.round(r.y), covered };
  });
  log(name, 'badge:', JSON.stringify(b));
  await page.screenshot({ path: `${DIR}/${name}.png`, clip });
  await ctx.close();
}

await shot({ width: 393, height: 852 }, 'free', 'fix-daily-mobile-free', { x: 0, y: 0, width: 393, height: 320 });
await shot({ width: 393, height: 852 }, null, 'fix-daily-mobile-real', { x: 0, y: 0, width: 393, height: 320 });
await shot({ width: 1440, height: 900 }, 'free', 'fix-daily-desktop-free', { x: 0, y: 0, width: 1440, height: 320 });
await shot({ width: 1440, height: 900 }, null, 'fix-daily-desktop-real', { x: 0, y: 0, width: 1440, height: 320 });
await browser.close();
