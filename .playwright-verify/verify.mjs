import { chromium } from 'playwright';

const DIR = 'C:/Users/Administrator/Desktop/korean-learning-app/.playwright-verify';
const BASE = 'http://localhost:3000';
const log = (...a) => console.log(...a);
const errors = [];
function attach(page, tag) {
  page.on('console', m => { if (m.type() === 'error' && !/401|Failed to load resource/.test(m.text())) errors.push(`[${tag}] ${m.text()}`); });
  page.on('pageerror', e => errors.push(`[${tag}] pageerror: ${e.message}`));
}
const browser = await chromium.launch();

async function authedCtx(viewport) {
  const ctx = await browser.newContext({ viewport });
  const r = await ctx.request.post(`${BASE}/api/auth/login`, { data: { username: 'testuser', password: 'test1234' } });
  if (!r.ok()) log('LOGIN FAILED', r.status());
  return ctx;
}
// intercept /api/membership/me to force a tier (keeps rest of payload minimal but valid)
async function forceTier(page, tier) {
  await page.route('**/api/membership/me**', async route => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier, expiry: tier === 'free' ? null : Date.now() + 30 * 864e5 }) });
  });
}
async function badgeInfo(page) {
  return page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const b = btns.find(x => /升级会员|会员$/.test(x.textContent.trim()) && x.querySelector('svg'));
    if (!b) return { found: false, allBtns: btns.map(x => x.textContent.trim()).filter(Boolean).slice(0, 25) };
    const r = b.getBoundingClientRect(); const cs = getComputedStyle(b);
    return { found: true, text: b.textContent.trim(), color: cs.color, bg: cs.backgroundColor, border: cs.borderColor, x: Math.round(r.x), y: Math.round(r.y) };
  });
}
async function cardStates(page) {
  return page.$$eval('.mb-card', els => els.map(c => {
    const cta = c.querySelector('.mb-cta'); const badge = c.querySelector('.mb-rec-badge');
    return { tier: (c.className.match(/tier-(\w+)/) || [])[1], cta: cta?.textContent.trim(), disabled: cta?.disabled, badge: badge?.textContent.trim(), current: c.className.includes('is-current'), owned: c.className.includes('is-owned') };
  }));
}

// ===== STEP 1: unauth /membership 1440 =====
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage(); attach(page, 'S1');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(600);
  log('S1 unauth cards:', JSON.stringify(await cardStates(page)));
  await page.screenshot({ path: `${DIR}/step1-unauth-membership-1440.png`, fullPage: true });
  await ctx.close();
}

// real tier check
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  const me = await page.evaluate(async () => { const r = await fetch('/api/membership/me', { cache: 'no-store' }); return r.ok ? (await r.json()).tier : r.status; });
  log('REAL testuser tier =', me);
  await ctx.close();
}

// ===== STEP 2a: daily MOBILE — forced free (pink badge) =====
{
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage(); attach(page, 'S2a');
  await forceTier(page, 'free');
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  log('S2a daily-mobile(free) badge:', JSON.stringify(await badgeInfo(page)));
  await page.screenshot({ path: `${DIR}/step2-daily-mobile-free-393.png`, fullPage: false });
  await page.screenshot({ path: `${DIR}/step2-daily-mobile-free-top.png`, clip: { x: 0, y: 0, width: 393, height: 300 } });
  await ctx.close();
}
// ===== STEP 2a2: daily MOBILE — real lifetime (purple badge) =====
{
  const ctx = await authedCtx({ width: 393, height: 852 });
  const page = await ctx.newPage(); attach(page, 'S2a2');
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  log('S2a2 daily-mobile(real) badge:', JSON.stringify(await badgeInfo(page)));
  await page.screenshot({ path: `${DIR}/step2-daily-mobile-real-top.png`, clip: { x: 0, y: 0, width: 393, height: 300 } });
  await ctx.close();
}

// ===== STEP 2b: daily DESKTOP — forced free + real =====
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S2b-free');
  await forceTier(page, 'free');
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  log('S2b daily-desktop(free) badge:', JSON.stringify(await badgeInfo(page)));
  await page.screenshot({ path: `${DIR}/step2-daily-desktop-free-top.png`, clip: { x: 0, y: 0, width: 1440, height: 300 } });
  await ctx.close();
}
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S2b-real');
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  log('S2b daily-desktop(real) badge:', JSON.stringify(await badgeInfo(page)));
  await page.screenshot({ path: `${DIR}/step2-daily-desktop-real-top.png`, clip: { x: 0, y: 0, width: 1440, height: 300 } });
  await ctx.close();
}

// ===== STEP 2c: /membership authed FORCED FREE, click monthly -> checkout =====
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S2c');
  await forceTier(page, 'free');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  log('S2c membership(free) cards:', JSON.stringify(await cardStates(page)));
  await page.screenshot({ path: `${DIR}/step2-membership-free-1440.png`, fullPage: true });
  const monthly = await page.$('.mb-card.tier-monthly .mb-cta');
  const dis = await monthly.evaluate(e => e.disabled);
  if (!dis) {
    await monthly.click();
    await page.waitForTimeout(5000);
    log('S2c after monthly click url:', page.url());
    const notice = await page.$eval('.mb-notice', e => e.textContent.trim()).catch(() => null);
    if (notice) log('S2c notice:', notice);
    await page.screenshot({ path: `${DIR}/step2-after-monthly-click.png`, fullPage: true });
  } else log('S2c monthly disabled, skip click');
  await ctx.close();
}

// ===== STEP 2d: /membership REAL lifetime state =====
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S2d');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1800);
  log('S2d membership(real lifetime) cards:', JSON.stringify(await cardStates(page)));
  await page.screenshot({ path: `${DIR}/step2d-membership-lifetime-1440.png`, fullPage: true });
  await ctx.close();
}

// ===== STEP 3: dark mode /membership (forced monthly to show current+notice states) =====
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S3');
  await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch {} });
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  log('S3 dark theme=', await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'bodyBg=', await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
  // trigger a notice: click the free (owned) card
  const freeCta = await page.$('.mb-card.tier-free .mb-cta');
  const fdis = await freeCta.evaluate(e => e.disabled);
  log('S3 free cta disabled=', fdis);
  await page.screenshot({ path: `${DIR}/step3-membership-dark-monthly-1440.png`, fullPage: true });
  await ctx.close();
}

// ===== STEP 4: intercept me -> monthly, verify tier-aware states =====
{
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage(); attach(page, 'S4');
  await forceTier(page, 'monthly');
  await page.goto(`${BASE}/membership`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('.mb-cta').length >= 4, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1800);
  log('S4 as-monthly cards:', JSON.stringify(await cardStates(page), null, 1));
  await page.screenshot({ path: `${DIR}/step4-membership-as-monthly-1440.png`, fullPage: true });
  // click yearly (upgrade) -> should attempt checkout
  const yearly = await page.$('.mb-card.tier-yearly .mb-cta');
  const ydis = await yearly.evaluate(e => e.disabled);
  if (!ydis) {
    await yearly.click();
    await page.waitForTimeout(4500);
    log('S4 after yearly(upgrade) click url:', page.url());
    const notice = await page.$eval('.mb-notice', e => e.textContent.trim()).catch(() => null);
    if (notice) log('S4 notice:', notice);
    await page.screenshot({ path: `${DIR}/step4-after-yearly-upgrade-click.png`, fullPage: true });
  }
  await ctx.close();
}

log('\n===== JS ERRORS (excl 401 noise) =====');
if (errors.length === 0) log('none'); else errors.forEach(e => log(e));
await browser.close();
