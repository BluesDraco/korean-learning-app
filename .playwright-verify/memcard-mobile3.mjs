import { chromium } from 'playwright';
const DIR = 'C:/Users/Administrator/Desktop/korean-learning-app/.playwright-verify';
const BASE = 'http://localhost:3000';
const log = (...a) => console.log(...a);
const browser = await chromium.launch();

async function authedCtx(vp) {
  const ctx = await browser.newContext({ viewport: vp });
  await ctx.request.post(`${BASE}/api/auth/login`, { data: { username: 'testuser', password: 'test1234' } });
  // suppress feature-announcement popup for any userId: intercept localStorage.getItem
  await ctx.addInitScript(() => {
    const orig = Storage.prototype.getItem;
    Storage.prototype.getItem = function (k) {
      if (typeof k === 'string' && (k.startsWith('tori-whats-new-') || k.startsWith('popup-announcement-read:'))) return '1';
      return orig.call(this, k);
    };
  });
  return ctx;
}

async function run(label, dark) {
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href="/mine/membership"]', { timeout: 15000 }).catch(() => log(`${label}: no mem link`));
  await page.waitForTimeout(1500);
  if (dark) { await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark')); await page.waitForTimeout(400); }
  await page.evaluate(() => { const el = document.querySelector('a[href="/mine/membership"]'); if (el) el.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const mem = document.querySelector('a[href="/mine/membership"]');
    const r = mem ? mem.getBoundingClientRect() : null;
    const overlayUp = [...document.querySelectorAll('div')].some(d => { const cs = getComputedStyle(d); return cs.position === 'fixed' && parseInt(cs.zIndex||'0') >= 9000 && d.getBoundingClientRect().width > 300; });
    return { memY: r ? Math.round(r.y) : null, overlayUp };
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
