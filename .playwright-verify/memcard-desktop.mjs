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
      for (const b of [...document.querySelectorAll('button, [role=button], [aria-label]')]) {
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

async function measure(page) {
  return await page.evaluate(() => {
    const R = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) }; };
    // find "我的" section by heading text
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,p,div')].filter(e => e.textContent.trim() === '我的' && e.getBoundingClientRect().width < 200);
    // membership button: has 永久会员 / 升级会员 / 我的会员 and is a button
    const btns = [...document.querySelectorAll('button')];
    // big card: contains BOTH the tier label AND its cta pill text, and has an aria-hidden icon box
    const memBtn = btns.find(b => /永久会员|升级会员|我的会员/.test(b.textContent)
      && /查看专属权益|解锁全部内容|续费不中断/.test(b.textContent)
      && b.querySelector('div[aria-hidden]'));
    const toolLabels = ['我的错题', '我的录音', '我的成就', '消息'];
    const tools = toolLabels.map(lbl => btns.find(b => {
      const t = b.textContent.trim();
      return t.startsWith(lbl) && b !== memBtn;
    })).filter(Boolean);
    const iconBox = memBtn ? memBtn.querySelector('div[aria-hidden]') : null;
    const pill = memBtn ? [...memBtn.querySelectorAll('span')].find(s => /查看|管理|去升级/.test(s.textContent)) : null;
    return {
      memText: memBtn ? memBtn.textContent.trim().replace(/\s+/g, ' ') : null,
      memRect: R(memBtn),
      iconBg: iconBox ? getComputedStyle(iconBox).backgroundColor : null,
      iconFg: iconBox ? getComputedStyle(iconBox).color : null,
      pillText: pill ? pill.textContent.trim() : null,
      pillBg: pill ? getComputedStyle(pill).backgroundColor : null,
      pillFg: pill ? getComputedStyle(pill).color : null,
      tools: tools.map(R),
      docW: document.documentElement.scrollWidth, winW: window.innerWidth,
    };
  });
}

async function run(label, dark) {
  const ctx = await authedCtx({ width: 1440, height: 900 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/daily`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await closeModals(page);
  for (const name of ['知道了', '关闭']) {
    const b = page.getByRole('button', { name });
    try { if (await b.count()) { await b.first().click({ timeout: 3000 }); await page.waitForTimeout(400); } } catch {}
  }
  const isMemCard = "x => /永久会员|升级会员|我的会员/.test(x.textContent) && /查看专属权益|解锁全部内容|续费不中断/.test(x.textContent) && x.querySelector('div[aria-hidden]')";
  await page.waitForFunction(`[...document.querySelectorAll('button')].some(${isMemCard})`, { timeout: 15000 }).catch(() => log(`${label}: no mem btn`));
  if (dark) { await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark')); await page.waitForTimeout(400); }
  await page.evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(${isMemCard}); if (b) b.scrollIntoView({ block: 'center' }); })()`);
  await page.waitForTimeout(500);
  const m = await measure(page);
  log(`\n=== ${label} (1440x900${dark ? ' DARK' : ''}) ===`);
  log('memText:', m.memText);
  log('memRect:', JSON.stringify(m.memRect));
  log('icon bg/fg:', m.iconBg, '/', m.iconFg);
  log('pill:', m.pillText, 'bg/fg:', m.pillBg, '/', m.pillFg);
  m.tools.forEach((t, i) => log(`tool[${i}]:`, JSON.stringify(t)));
  log('doc vs win:', m.docW, m.winW, m.docW > m.winW ? '<<<OVERFLOW' : 'ok');
  if (m.memRect && m.tools[0]) log(`mem.w=${m.memRect.w} tool.w=${m.tools[0].w} ratio=${(m.memRect.w/m.tools[0].w).toFixed(2)} (2*tool+gap≈${Math.round(m.tools[0].w*2+12)})`);
  if (m.tools.length === 4) {
    log(`2+2: row1sameY=${Math.abs(m.tools[0].y-m.tools[1].y)<8} row2sameY=${Math.abs(m.tools[2].y-m.tools[3].y)<8} distinctRows=${Math.abs(m.tools[0].y-m.tools[2].y)>20}`);
  }
  const clipY = Math.max(0, (m.memRect?.y ?? 0) - 70);
  await page.screenshot({ path: `${DIR}/memcard-${label}.png`, clip: { x: 0, y: clipY, width: 1440, height: 640 } });
  log('saved', `${DIR}/memcard-${label}.png`);
  await ctx.close();
}

await run('desktop-1440-light', false);
await run('desktop-1440-dark', true);
await browser.close();
log('\nDONE');
