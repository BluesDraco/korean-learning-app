/* eslint-disable @typescript-eslint/no-require-imports, no-unused-vars */
// 双端适配截图脚本：5 档宽度 × 5 个 tab，截 /phonetics
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 800 },
];

const TABS = [
  { key: 'progressive', label: '分步学习' },
  { key: 'alphabet', label: '字母表' },
  { key: 'rules', label: '连读规则' },
  { key: 'composer', label: '合成器' },
  { key: 'practice', label: '练习' },
];

const OUT_DIR = path.join(__dirname, 'phonetics-screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE_URL = 'http://localhost:3002';

// 直接拿登录 cookie
function getToken() {
  // 先尝试注册（已存在会失败，不影响登录）
  try {
    execSync(`curl -s -X POST ${BASE_URL}/api/auth/register -H "Content-Type: application/json" -d '{"username":"playwrighttest","password":"test12345"}' --max-time 10`);
  } catch (_) {}
  const cookieRaw = execSync(`curl -s -i -X POST ${BASE_URL}/api/auth/login -H "Content-Type: application/json" -d "{\\"username\\":\\"playwrighttest\\",\\"password\\":\\"test12345\\"}" --max-time 10`).toString();
  const m = cookieRaw.match(/[Ss]et-[Cc]ookie:\s*token=([^;]+)/);
  return m ? m[1] : null;
}

(async () => {
  const token = getToken();
  console.log('Token acquired:', token ? 'yes' : 'no');

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    if (token) {
      await ctx.addCookies([{ name: 'token', value: token, domain: 'localhost', path: '/', httpOnly: true, secure: false, sameSite: 'Lax' }]);
    }
    // 预置 localStorage 跳过日记 Day 2 弹窗等
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem('tori-diary-day2-announce-v1', '1');
      } catch (e) { /* ignore */ }
    });
    const page = await ctx.newPage();

    for (const tab of TABS) {
      const fname = `${vp.name}_${tab.key}.png`;
      const outPath = path.join(OUT_DIR, fname);
      try {
        await page.goto(`${BASE_URL}/phonetics`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // 双端布局：mobile / desktop 两份 DOM 同时存在，只能用 :visible 拿当前显示的那份
        await page.waitForSelector('.hr-main-tab', { timeout: 15000, state: 'attached' });
        await page.waitForTimeout(800);
        // 关闭可能挡住主页的全局弹窗
        for (const sel of [
          'button[aria-label="关闭"]',
          'button:has-text("跳过")',
          'button:has-text("稍后")',
          'button:has-text("立即开始")',
          'button[aria-label="Close"]',
          '.fixed.inset-0 button:has(svg)',
        ]) {
          const btn = page.locator(sel).first();
          if (await btn.count() > 0) {
            await btn.click().catch(() => {});
            await page.waitForTimeout(300);
          }
        }
        // 切到目标 tab — 用 visible 过滤（mobile 和 desktop 各有一份 DOM）
        if (tab.key !== 'progressive') {
          const tabBtn = page.locator(`.hr-main-tab:visible:has-text("${tab.label}")`).first();
          await tabBtn.waitFor({ state: 'visible', timeout: 5000 });
          await tabBtn.click();
          await page.waitForTimeout(800);
        }
        // 截图前 scroll 到顶 + 等稳定
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`  ✓ ${fname}`);
      } catch (e) {
        console.log(`  ✗ ${fname}: ${e.message.slice(0, 100)}`);
      }
    }
    await ctx.close();
  }

  await browser.close();
  console.log(`\nDone. Screenshots in: ${OUT_DIR}`);
})();
