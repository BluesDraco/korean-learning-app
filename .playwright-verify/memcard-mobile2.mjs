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

async function dismissOverlays(page) {
  for (let i = 0; i < 5; i++) {
    const did = await page.evaluate(() => {
      let acted = false;
      // any fixed full-screen overlay with high z-index -> click its got_it / X button
      const overlays = [...document.querySelectorAll('div')].filter(d => {
        const cs = getComputedStyle(d);
        return cs.position === 'fixed' && parseInt(cs.zIndex || '0') >= 900 && d.getBoundingClientRect().width > 200;
      });
      for (const ov of overlays) {
        const btns = [...ov.querySelectorAll('button')];
        // prefer the full-width primary got_it button (last), else X (aria-label)
        const primary = btns.find(b => /知道了|我知道了|开始|好的|got|确定/i.test(b.textContent)) ||
                        btns.find(b => /close|关闭|×|✕/i.test(b.getAttribute('aria-label') || b.textContent)) ||
                        btns[btns.length - 1];
        if (primary) { try { primary.click(); acted = true; } catch {} }
      }
      return acted;
    });
    await page.waitForTimeout(400);
    if (!did) break;
  }
}

async function run(label, dark) {
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await dismissOverlays(page);
  await page.waitForSelector('a[href="/mine/membership"]', { timeout: 15000 }).catch(() => log(`${label}: no mem link`));
  await page.waitForTimeout(400);
  await dismissOverlays(page); // popup may appear late
  if (dark) { await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark')); await page.waitForTimeout(400); }
  await page.evaluate(() => { const el = document.querySelector('a[href="/mine/membership"]'); if (el) el.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const R = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
    const mem = document.querySelector('a[href="/mine/membership"]');
    // is any overlay still up?
    const overlayUp = [...document.querySelectorAll('div')].some(d => { const cs = getComputedStyle(d); return cs.position === 'fixed' && parseInt(cs.zIndex||'0') >= 9000 && d.getBoundingClientRect().width > 300; });
    return { memY: R(mem)?.y, overlayUp };
  });
  log(`${label}: memY=${m.memY} overlayStillUp=${m.overlayUp}`);
  const clipY = Math.max(0, (m.memY ?? 0) - 60);
  await page.screenshot({ path: `${DIR}/memcard-${label}.png`, clip: { x: 0, y: clipY, width: 393, height: 640 } });
  log('saved', `${DIR}/memcard-${label}.png`);
  await ctx.close();
}

await run('mobile-393-light', false);
await run('mobile-393-dark', true);
await browser.close();
log('DONE');
