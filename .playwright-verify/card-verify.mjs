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

// close announcement / onboarding modals by clicking their close button (don't delete fixed els)
async function closeModals(page) {
  for (let i = 0; i < 3; i++) {
    const clicked = await page.evaluate(() => {
      let did = false;
      const btns = [...document.querySelectorAll('button, [role=button], [aria-label]')];
      for (const b of btns) {
        const label = (b.getAttribute('aria-label') || b.textContent || '').trim();
        const r = b.getBoundingClientRect();
        if (r.width === 0) continue;
        if (/^×$|^✕$|^✖$|^x$|close|关闭|跳过|知道了|我知道了|开始探索|开始|进入/i.test(label) && r.top < 500) {
          try { b.click(); did = true; } catch {}
        }
      }
      return did;
    });
    await page.waitForTimeout(350);
    if (!clicked) break;
  }
}

async function measurePass(page) {
  return await page.evaluate(() => {
    const pass = document.querySelector('.mc-pass');
    const meta = document.querySelector('.mc-pass-meta');
    const wm = document.querySelector('.mc-pass-watermark');
    const name = document.querySelector('.mc-pass-name') || document.querySelector('.mc-pass [class*=name]');
    const R = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom), right: Math.round(r.right) }; };
    return {
      passClass: pass?.className || null,
      pass: R(pass),
      meta: R(meta),
      watermark: R(wm),
      wmFontSize: wm ? getComputedStyle(wm).fontSize : null,
      name: R(name),
    };
  });
}

async function measureBadge(page) {
  return await page.evaluate(() => {
    const b = document.querySelector('[class*=MembershipBadge], .membership-badge, [class*=membership-badge]') ||
      [...document.querySelectorAll('*')].find(e => /永久会员|会员/.test(e.textContent) && e.children.length <= 2 && e.getBoundingClientRect().height < 60 && e.getBoundingClientRect().height > 10);
    if (!b) return null;
    const cs = getComputedStyle(b);
    const r = b.getBoundingClientRect();
    return { text: b.textContent.trim().slice(0, 20), fontSize: cs.fontSize, padding: cs.padding, class: b.className, w: Math.round(r.width), h: Math.round(r.height) };
  });
}

// STEP 1: membership desktop light
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/mine/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await closeModals(page);
  await page.waitForFunction(() => !!document.querySelector('.mc-pass.lifetime'), { timeout: 15000 }).catch(() => log('no .mc-pass.lifetime found (light)'));
  await page.waitForTimeout(700);
  const m = await measurePass(page);
  log('STEP1 light measure', JSON.stringify(m, null, 0));
  await page.screenshot({ path: `${DIR}/card-membership-light-1440.png`, fullPage: true });

  // STEP 2: same page dark
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${DIR}/card-membership-dark-1440.png`, fullPage: true });
  const md = await measurePass(page);
  log('STEP2 dark measure', JSON.stringify(md, null, 0));
  await ctx.close();
}

// STEP 3: daily desktop 1440
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await closeModals(page);
  await page.waitForTimeout(500);
  const b = await measureBadge(page);
  log('STEP3 daily desktop badge', JSON.stringify(b));
  await page.screenshot({ path: `${DIR}/card-daily-desktop-1440.png`, clip: { x: 0, y: 0, width: 1440, height: 500 } });
  await ctx.close();
}

// STEP 3b: daily mobile 393
{
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await closeModals(page);
  await page.waitForTimeout(500);
  const b = await measureBadge(page);
  log('STEP3b daily mobile badge', JSON.stringify(b));
  await page.screenshot({ path: `${DIR}/card-daily-mobile-393.png`, clip: { x: 0, y: 0, width: 393, height: 500 } });
  await ctx.close();
}

// STEP 4: membership mobile 393
{
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/mine/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await closeModals(page);
  await page.waitForFunction(() => !!document.querySelector('.mc-pass.lifetime'), { timeout: 15000 }).catch(() => log('no .mc-pass.lifetime mobile'));
  await page.waitForTimeout(600);
  const m = await measurePass(page);
  log('STEP4 mobile measure', JSON.stringify(m, null, 0));
  await page.screenshot({ path: `${DIR}/card-membership-mobile-393.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
log('DONE');
