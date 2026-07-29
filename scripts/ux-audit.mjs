// Desktop/tablet UX audit — screenshots + overflow/console-error detection.
// Usage: node scripts/ux-audit.mjs [group]
//   group = A (entry+nav) | B (vocab/learn/explore) | C (fullscreen) | all
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:3000';
const OUT = path.resolve('../ux-audit-shots');
const CRED = { username: 'testuser', password: 'test1234' };

const VIEWPORTS = [
  { name: 'ipad-mini-1024', width: 1024, height: 768 },
  { name: 'ipad-pro11-1194', width: 1194, height: 834 },
  { name: 'ipad-pro12-1366', width: 1366, height: 1024 },
  { name: 'laptop-1440', width: 1440, height: 900 },
];

// Route groups. Detail pages seeded with one real id each; list pages get link-crawled.
const GROUPS = {
  A: [
    { url: '/', auth: false, tag: 'home-guest' },
    { url: '/auth/register', auth: false, tag: 'register' },
    { url: '/auth/login', auth: false, tag: 'login' },
    { url: '/daily', tag: 'daily' },
    { url: '/vocabulary', tag: 'vocabulary' },
    { url: '/diary', tag: 'diary-list' },
    { url: '/learning', tag: 'learning' },
    { url: '/explore', tag: 'explore' },
  ],
  B: [
    { url: '/vocabulary/library', tag: 'vocab-library' },
    { url: '/vocabulary/books', tag: 'vocab-books' },
    { url: '/vocabulary/levels', tag: 'vocab-levels' },
    { url: '/vocabulary/themes', tag: 'vocab-themes' },
    { url: '/vocabulary/themes/theme-cafe', tag: 'vocab-theme-detail' },
    { url: '/vocabulary/dictionary', tag: 'vocab-dictionary' },
    { url: '/vocabulary/review-pool', tag: 'vocab-review-pool' },
    { url: '/vocabulary/yonsei', tag: 'vocab-yonsei' },
    { url: '/review', tag: 'review' },
    { url: '/phonetics', tag: 'phonetics' },
    { url: '/grammar', tag: 'grammar' },
    { url: '/grammar/library/g1', tag: 'grammar-lib-detail' },
    { url: '/topik', tag: 'topik' },
    { url: '/topik/history', tag: 'topik-history' },
    { url: '/topik/mistakes', tag: 'topik-mistakes' },
    { url: '/practice', tag: 'practice' },
    { url: '/practice/cafe', tag: 'practice-detail' },
    { url: '/listening', tag: 'listening' },
    { url: '/listening/shadow', tag: 'listening-shadow' },
    { url: '/listening/speaking', tag: 'listening-speaking' },
    { url: '/dictation', tag: 'dictation' },
    { url: '/dictation/word', tag: 'dictation-word' },
    { url: '/dictation/sentence', tag: 'dictation-sentence' },
    { url: '/writing', tag: 'writing' },
    { url: '/typing', tag: 'typing' },
    { url: '/ai/analyze', tag: 'ai-analyze' },
    { url: '/reading', tag: 'reading' },
    { url: '/knowledge', tag: 'knowledge' },
    { url: '/knowledge/time', tag: 'knowledge-detail' },
    { url: '/korea', tag: 'korea' },
    { url: '/korea/culture', tag: 'korea-culture' },
    { url: '/korea/food', tag: 'korea-food' },
    { url: '/korea/travel', tag: 'korea-travel' },
    { url: '/korea/drama', tag: 'korea-drama' },
    { url: '/learn/picture-books', tag: 'picture-books' },
    { url: '/learn/picture-books/tori-day', tag: 'picture-book-detail' },
    { url: '/tools', tag: 'tools' },
    { url: '/tools/keyboard', tag: 'tools-keyboard' },
    { url: '/tools/korean-name', tag: 'tools-korean-name' },
    { url: '/tools/romanization', tag: 'tools-romanization' },
  ],
  C: [
    { url: '/diary/beginner/1', tag: 'diary-day1' },
    { url: '/diary/beginner/2', tag: 'diary-day2' },
    { url: '/blog', tag: 'blog-list' },
    { url: '/radio', tag: 'radio-list' },
    { url: '/radio/squirrel-morning-d1', tag: 'radio-player' },
    { url: '/radio/interview', tag: 'radio-interview' },
    { url: '/buddy', tag: 'buddy' },
    { url: '/mine', tag: 'mine' },
    { url: '/mine/articles', tag: 'mine-articles' },
    { url: '/mine/recordings', tag: 'mine-recordings' },
    { url: '/mine/practices', tag: 'mine-practices' },
    { url: '/settings', tag: 'settings' },
    { url: '/stats', tag: 'stats' },
    { url: '/messages', tag: 'messages' },
  ],
};

const TEST_USER_ID = '481e67ed-00db-4723-93f6-f14a279d519d';

async function login(context) {
  const res = await context.request.post(`${BASE}/api/auth/login`, { data: CRED });
  if (!res.ok()) throw new Error(`login failed ${res.status()}`);
  // request context shares cookie jar with pages in same context
}

// Suppress announcement/invite popups so they don't cover every screenshot.
async function suppressPopups(context, uid) {
  await context.addInitScript((userId) => {
    try {
      sessionStorage.setItem('popup-announcement-checked:' + userId, '1');
      sessionStorage.setItem('tori-login-invite-shown', '1');
      // feature "what's new" popup: key is `tori-whats-new-<version>:<userId>`. Cover current + known versions.
      localStorage.setItem('tori-whats-new-20260714-v1:' + userId, '1');
    } catch { /* ignore */ }
  }, uid);
}

async function auditPage(page, url, tag, vp) {
  const errors = [];
  const IGNORE = [
    /status of 401/i,           // expected: guest / not-yet-authed resource probes
    /Failed to load resource.*401/i,
    /favicon/i,
  ];
  const onErr = (msg) => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    if (IGNORE.some(re => re.test(t))) return;
    errors.push(t);
  };
  const onPageErr = (err) => errors.push('PAGEERROR: ' + err.message);
  page.on('console', onErr);
  page.on('pageerror', onPageErr);

  let status = 0;
  try {
    const resp = await page.goto(`${BASE}${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    status = resp ? resp.status() : 0;
    // Wait for the real app shell to mount. The pre-mount neutral shell has no .desktop-app;
    // fullscreen pages (diary/blog/radio/practice) render their own root instead.
    const isFullscreen = /^\/(diary|blog|radio|practice\/)/.test(url);
    if (!isFullscreen) {
      try { await page.waitForSelector('.desktop-app', { timeout: 15000 }); }
      catch { errors.push('SHELL: .desktop-app did not mount in 15s'); }
      // The shell mounts before its inner page chunk renders content — wait for real content.
      try {
        await page.waitForFunction(() => {
          const c = document.querySelector('.desktop-content');
          return c && (c.children.length > 0) && (c.innerText || '').trim().length > 10;
        }, { timeout: 12000 });
      } catch { errors.push('CONTENT: .desktop-content stayed empty >12s'); }
    }
    await page.waitForLoadState('load', { timeout: 6000 }).catch(() => {});
    // Wait for Next dev "Compiling..." indicator to vanish (route chunk finished compiling).
    try {
      await page.waitForFunction(() => !document.body.innerText.includes('Compiling'), { timeout: 15000 });
    } catch { errors.push('DEV: still compiling >15s'); }
    await page.waitForTimeout(1200); // final settle for images/fonts
    // Dismiss any announcement/invite popup covering the page.
    // The whats-new/announcement overlays close on backdrop click (outer fixed div has onClick=close).
    try {
      const closeBtn = page.locator('button[aria-label="关闭"], button[aria-label="关闭弹窗"]').first();
      if (await closeBtn.count() && await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click({ timeout: 800 }).catch(() => {});
        await page.waitForTimeout(300);
      }
      // fallback: click any remaining full-screen fixed overlay backdrop (top-left corner, away from card)
      const stillOverlay = await page.evaluate(() => {
        const ov = [...document.querySelectorAll('div')].find(d => {
          const s = getComputedStyle(d); const r = d.getBoundingClientRect();
          return s.position === 'fixed' && +s.zIndex >= 999 && r.width >= window.innerWidth - 4 && r.height >= window.innerHeight - 4;
        });
        return !!ov;
      });
      if (stillOverlay) { await page.mouse.click(8, 8).catch(() => {}); await page.waitForTimeout(300); }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(200);
    } catch { /* ignore */ }
  } catch (e) {
    errors.push('GOTO: ' + e.message);
  }

  // horizontal overflow — authoritative: documentElement (the scroll container). body.scrollWidth
  // over-reports due to fixed/decorative layers and does NOT create a real h-scrollbar.
  let metrics;
  const evalFn = () => {
    const de = document.documentElement;
    const vw = window.innerWidth;
    const overflowX = de.scrollWidth - de.clientWidth; // >0 means a real horizontal scrollbar
    // confirm the page can actually be scrolled right (kills false positives from fixed bg)
    const x0 = window.scrollX; window.scrollTo(9999, 0); const maxScrollX = window.scrollX; window.scrollTo(x0, 0);
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed') continue; // decorative fixed layers don't cause scroll
      if (r.right > vw + 2) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 60),
          right: Math.round(r.right),
          overBy: Math.round(r.right - vw),
        });
      }
    }
    offenders.sort((a, b) => b.overBy - a.overBy);
    // only trust overflow if the page actually scrolls right AND a non-fixed element pokes out
    const realOverflow = maxScrollX > 1 ? overflowX : 0;
    return { vw, overflowX: realOverflow, rawOverflow: overflowX, maxScrollX, offenders: offenders.slice(0, 5) };
  };
  try {
    metrics = await page.evaluate(evalFn);
  } catch {
    // context destroyed by a late navigation — settle and retry once
    await page.waitForTimeout(800);
    try { metrics = await page.evaluate(evalFn); }
    catch (e2) { errors.push('EVAL: ' + e2.message); metrics = { overflowX: 0, offenders: [] }; }
  }

  const dir = path.join(OUT, vp.name);
  fs.mkdirSync(dir, { recursive: true });
  const shot = path.join(dir, `${tag}.png`);
  // Force paint of below-the-fold content: Playwright fullPage sometimes captures before
  // off-viewport elements are rastered. Scroll to bottom then back to top first.
  try {
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 250));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 250));
    });
    await page.waitForTimeout(300);
  } catch { /* ignore */ }
  try { await page.screenshot({ path: shot, fullPage: true, animations: 'disabled' }); } catch (e) { errors.push('SHOT: ' + e.message); }

  page.off('console', onErr);
  page.off('pageerror', onPageErr);

  return { url, tag, status, vp: vp.name, overflowX: metrics.overflowX, offenders: metrics.offenders, errors, shot: path.relative(OUT, shot) };
}

async function run() {
  const group = (process.argv[2] || 'all').toUpperCase();
  const routes = group === 'ALL' ? [...GROUPS.A, ...GROUPS.B, ...GROUPS.C] : (GROUPS[group] || []);
  if (!routes.length) { console.error('unknown group', group); process.exit(1); }

  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const findings = [];

  // Pre-warm every route so Next dev on-demand compilation doesn't cause under-render on first paint.
  process.stdout.write('warming routes');
  {
    const warmCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await login(warmCtx);
    const wp = await warmCtx.newPage();
    for (const r of routes) {
      try { await wp.goto(`${BASE}${r.url}`, { waitUntil: 'load', timeout: 30000 }); await wp.waitForTimeout(300); }
      catch { /* ignore warm errors */ }
      process.stdout.write('.');
    }
    await warmCtx.close();
    process.stdout.write(' done\n');
  }

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    await suppressPopups(context, TEST_USER_ID);
    await login(context);
    const page = await context.newPage();
    for (const r of routes) {
      if (r.auth === false) {
        // guest view: use a fresh no-cookie context
        const guestCtx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const gp = await guestCtx.newPage();
        const f = await auditPage(gp, r.url, r.tag, vp);
        findings.push(f);
        await guestCtx.close();
      } else {
        const f = await auditPage(page, r.url, r.tag, vp);
        findings.push(f);
      }
      const flag = (f => f)(findings[findings.length - 1]);
      const bad = flag.overflowX > 2 || flag.errors.length || flag.status >= 400;
      process.stdout.write(`${bad ? 'x' : '.'}`);
    }
    await context.close();
    process.stdout.write(` [${vp.name} done]\n`);
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT, `report-${group}.json`), JSON.stringify(findings, null, 2));

  // console summary of problems only
  console.log('\n==== PROBLEMS ====');
  const probs = findings.filter(f => f.overflowX > 2 || f.errors.length || f.status >= 400);
  if (!probs.length) { console.log('none detected by heuristics'); }
  for (const p of probs) {
    console.log(`\n[${p.vp}] ${p.url} (${p.tag}) status=${p.status} overflowX=${p.overflowX}`);
    if (p.offenders.length) for (const o of p.offenders) console.log(`   overflow <${o.tag} .${o.cls}> +${o.overBy}px`);
    if (p.errors.length) for (const e of p.errors.slice(0, 4)) console.log(`   ERR: ${e.slice(0, 160)}`);
  }
  console.log(`\nshots in ${OUT}, report-${group}.json written. total=${findings.length} problems=${probs.length}`);
}

run().catch(e => { console.error(e); process.exit(1); });
