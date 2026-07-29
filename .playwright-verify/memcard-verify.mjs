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

async function closeModals(page) {
  for (let i = 0; i < 4; i++) {
    const clicked = await page.evaluate(() => {
      let did = false;
      const btns = [...document.querySelectorAll('button, [role=button], [aria-label]')];
      for (const b of btns) {
        const label = (b.getAttribute('aria-label') || b.textContent || '').trim();
        const r = b.getBoundingClientRect();
        if (r.width === 0) continue;
        if (/^×$|^✕$|^✖$|^x$|close|关闭|跳过|知道了|我知道了|开始探索|开始|进入/i.test(label) && r.top < 600) {
          try { b.click(); did = true; } catch {}
        }
      }
      return did;
    });
    await page.waitForTimeout(300);
    if (!clicked) break;
  }
}

// Scroll the membership card into view and return rects of mem card + 4 tool cards
async function measureCards(page) {
  return await page.evaluate(() => {
    const R = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) }; };
    const memLink = document.querySelector('a[href="/mine/membership"]');
    // the grid item is the memLink's grid cell (parent div with gridColumn 1/-1)
    const memCell = memLink ? memLink.closest('div[style*="grid-column"], div[style*="gridColumn"]') || memLink.parentElement : null;
    const toolHrefs = ['/mine/dictation-mistakes', '/mine/recordings', '/achievement/card', '/messages'];
    const tools = toolHrefs.map(h => document.querySelector(`a[href="${h}"]`)).filter(Boolean);
    const memText = memLink ? memLink.textContent.trim().replace(/\s+/g, ' ') : null;
    // icon box + pill colors inside mem card
    const iconBox = memLink ? memLink.querySelector('div[aria-hidden]') : null;
    const iconBg = iconBox ? getComputedStyle(iconBox).backgroundColor : null;
    const iconFg = iconBox ? getComputedStyle(iconBox).color : null;
    const pill = memLink ? [...memLink.querySelectorAll('span')].find(s => /查看|管理|去升级/.test(s.textContent)) : null;
    const pillBg = pill ? getComputedStyle(pill).backgroundColor : null;
    const pillFg = pill ? getComputedStyle(pill).color : null;
    return {
      memText,
      memLink: R(memLink),
      memCell: R(memCell),
      iconBg, iconFg, pillText: pill ? pill.textContent.trim() : null, pillBg, pillFg,
      tools: tools.map(R),
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
    };
  });
}

async function scrollToMem(page) {
  await page.evaluate(() => {
    const el = document.querySelector('a[href="/mine/membership"]');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(500);
}

async function run(label, vp, dark) {
  const ctx = await authedCtx(vp);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await closeModals(page);
  await page.waitForSelector('a[href="/mine/membership"]', { timeout: 15000 }).catch(() => log(`${label}: no mem link`));
  if (dark) { await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark')); await page.waitForTimeout(400); }
  await scrollToMem(page);
  const m = await measureCards(page);
  log(`\n=== ${label} (${vp.width}x${vp.height}${dark ? ' DARK' : ''}) ===`);
  log('memText:', m.memText);
  log('memLink rect:', JSON.stringify(m.memLink));
  log('icon bg/fg:', m.iconBg, '/', m.iconFg);
  log('pill:', m.pillText, 'bg/fg:', m.pillBg, '/', m.pillFg);
  m.tools.forEach((t, i) => log(`tool[${i}] rect:`, JSON.stringify(t)));
  log('doc scrollWidth vs win:', m.docWidth, 'vs', m.winWidth, m.docWidth > m.winWidth ? '<<< H-OVERFLOW' : 'ok');
  if (m.memLink && m.tools[0]) {
    const ratio = (m.memLink.w / m.tools[0].w).toFixed(2);
    const twoPlusGap = m.tools[0].w * 2 + 10;
    log(`mem.w=${m.memLink.w} tool.w=${m.tools[0].w} ratio=${ratio}  (2*tool+gap≈${Math.round(twoPlusGap)})`);
  }
  // check 2+2 rows: tools[0]&[1] same y, tools[2]&[3] same y
  if (m.tools.length === 4) {
    const row1 = Math.abs(m.tools[0].y - m.tools[1].y) < 8;
    const row2 = Math.abs(m.tools[2].y - m.tools[3].y) < 8;
    const twoRows = Math.abs(m.tools[0].y - m.tools[2].y) > 20;
    log(`2+2 layout: row1sameY=${row1} row2sameY=${row2} distinctRows=${twoRows}`);
  }
  const fname = `${DIR}/memcard-${label}.png`;
  // clip around mem region
  const clipY = Math.max(0, (m.memLink?.y ?? 0) - 60);
  await page.screenshot({ path: fname, clip: { x: 0, y: clipY, width: vp.width, height: Math.min(vp.height, 640) } });
  log('saved', fname);
  await ctx.close();
}

await run('mobile-393-light', { width: 393, height: 852 }, false);
await run('desktop-1440-light', { width: 1440, height: 900 }, false);
await run('mobile-393-dark', { width: 393, height: 852 }, true);
await run('desktop-1440-dark', { width: 1440, height: 900 }, true);

await browser.close();
log('\nDONE');
