import { chromium } from 'playwright';

const OUT = 'C:/Users/Administrator/Desktop/korean-learning-app/.shots';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const posts = await (async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/blog', { waitUntil: 'domcontentloaded' });
  // 等 feed 帖子出现
  await page.waitForSelector('.blog-post', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);

  // 关掉可能的首登/场所弹窗
  for (const sel of ['.pi-close', '.blog-menu-close', '[aria-label*="닫기"]', '[aria-label*="关闭"]']) {
    const el = await page.$(sel);
    if (el) { await el.click().catch(() => {}); await page.waitForTimeout(400); }
  }
  await page.waitForTimeout(500);

  // 截多屏，滚动抓到 gapyeong 新帖
  await page.screenshot({ path: `${OUT}/blog-v2-top.png` });
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/blog-v2-mid.png` });
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/blog-v2-mid2.png` });

  await b.close();
  console.log('done');
})();
