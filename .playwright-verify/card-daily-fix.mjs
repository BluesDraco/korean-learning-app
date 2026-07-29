import { chromium } from 'playwright';
const DIR = 'C:/Users/Administrator/Desktop/korean-learning-app/.playwright-verify';
const BASE = 'http://localhost:3000';
const VERSION = '20260720-v1';
const log = (...a) => console.log(...a);
const browser = await chromium.launch();

async function authedCtx(vp) {
  const ctx = await browser.newContext({ viewport: vp });
  await ctx.request.post(`${BASE}/api/auth/login`, { data: { username: 'testuser', password: 'test1234' } });
  // fetch user id
  const me = await ctx.request.get(`${BASE}/api/auth/me`).catch(() => null);
  let uid = null;
  try { const j = await me.json(); uid = j?.id ?? j?.user?.id ?? null; } catch {}
  return { ctx, uid };
}
async function grabBadge(page) {
  return await page.evaluate(() => {
    const host = [...document.querySelectorAll('button')].find(e => e.textContent.trim() === '永久会员' && e.querySelector('svg'));
    if (!host) return null;
    const cs = getComputedStyle(host);
    const r = host.getBoundingClientRect();
    const svg = host.querySelector('svg');
    return { text: host.textContent.trim(), fontSize: cs.fontSize, padding: cs.padding, w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y), iconW: svg ? Math.round(svg.getBoundingClientRect().width) : null };
  });
}
async function killPopups(page) {
  // click any 关闭 aria-label button that isn't the badge; repeat a few times
  for (let i = 0; i < 6; i++) {
    const n = await page.locator('button[aria-label="关闭"]').count();
    if (!n) break;
    await page.locator('button[aria-label="关闭"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(400);
  }
}

async function shot(vp, name, h) {
  const { ctx, uid } = await authedCtx(vp);
  log(name, 'uid', uid);
  const page = await ctx.newPage();
  // pre-seed feature announcement dismissal so popup never shows
  if (uid) await page.addInitScript(([v, u]) => { try { localStorage.setItem(`tori-whats-new-${v}:${u}`, '1'); localStorage.setItem(`popup-announcement-checked:${u}`, '1'); } catch {} }, [VERSION, uid]);
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some(e => e.textContent.trim() === '永久会员' && e.querySelector('svg')), { timeout: 25000 }).catch(() => log(name, 'badge not found'));
  await page.waitForTimeout(1200);
  await killPopups(page);
  await page.waitForTimeout(300);
  log(name, 'badge', JSON.stringify(await grabBadge(page)), 'popups', await page.locator('button[aria-label="关闭"]').count());
  await page.screenshot({ path: `${DIR}/${name}.png`, clip: { x: 0, y: 0, width: vp.width, height: h } });
  await ctx.close();
}

await shot({ width: 1440, height: 900 }, 'card-daily-desktop-1440', 480);
await shot({ width: 393, height: 852 }, 'card-daily-mobile-393', 480);
await browser.close();
log('DONE');
