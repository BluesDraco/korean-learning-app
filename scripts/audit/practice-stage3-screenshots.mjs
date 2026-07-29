// @ts-check
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, '..', '..', 'audit-screenshots', 'practice-stage3');
const PAGES = [
  // Hub pages
  { name: '01-practice-hub', url: '/practice' },
  { name: '02-speaking-hub', url: '/speaking' },
  { name: '03-dictation-hub', url: '/dictation' },
  { name: '04-writing-hub', url: '/writing' },
  { name: '05-typing-hub', url: '/typing' },
  // Sub pages
  { name: '06-speaking-say', url: '/speaking/say' },
  { name: '07-speaking-shadow', url: '/speaking/shadow' },
  { name: '08-speaking-retell', url: '/speaking/retell' },
  { name: '09-dictation-word', url: '/dictation/word' },
  { name: '10-dictation-sentence', url: '/dictation/sentence' },
  { name: '11-dictation-mistakes', url: '/dictation/mistakes' },
  { name: '12-scene-haru-cafe', url: '/practice/haru-cafe' },
  { name: '13-companion', url: '/companion/test-id' },
];

const MOBILE = { width: 390, height: 844, label: 'mobile' };
const DESKTOP = { width: 1440, height: 900, label: 'desktop' };
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissModals(page) {
  // Close any onboarding/welcome modals
  const closeBtns = page.locator('[class*="onboarding"] button, [class*="modal"] button, [class*="overlay"] button, .close-btn, [aria-label*="关闭"], [aria-label*="close"]');
  const count = await closeBtns.count();
  for (let i = 0; i < count; i++) {
    try { await closeBtns.nth(i).click({ timeout: 500 }); await page.waitForTimeout(300); } catch (_) {}
  }
  // Also try clicking backdrop/overlay
  const overlays = page.locator('[class*="Overlay"], [class*="backdrop"]');
  const oCount = await overlays.count();
  for (let i = 0; i < oCount; i++) {
    try { await overlays.nth(i).click({ timeout: 500 }); await page.waitForTimeout(300); } catch (_) {}
  }
}

/** @param {import('playwright').Page} page */
async function setTheme(page, theme) {
  if (theme === 'dark') {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
  } else {
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    });
  }
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page */
async function forceReflow(page, viewport) {
  // Force reflow at the target viewport to avoid responsive false positives
  await page.setViewportSize(viewport);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    document.body.offsetHeight; // force reflow
  });
  await page.waitForTimeout(200);
}

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const pg of PAGES) {
    for (const theme of THEMES) {
      for (const vp of [MOBILE, DESKTOP]) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.label === 'mobile' ? 2 : 1,
        });
        const page = await context.newPage();

        const label = `${pg.name}_${vp.label}_${theme}`;
        const filePath = path.join(OUT, `${label}.png`);
        const fullPagePath = path.join(OUT, `${label}_full.png`);

        try {
          await page.goto(BASE + pg.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await forceReflow(page, vp);
          await setTheme(page, theme);
          await dismissModals(page);

          // Viewport screenshot
          await page.screenshot({ path: filePath, fullPage: false });

          // Full page screenshot (only for mobile, desktop rarely needs it)
          if (vp.label === 'mobile') {
            try {
              await page.screenshot({ path: fullPagePath, fullPage: true });
            } catch (_) {
              // fullPage can fail on very long pages, skip
            }
          }

          // Check for overflow
          const overflow = await page.evaluate(() => {
            const doc = document.documentElement;
            return {
              scrollWidth: doc.scrollWidth,
              clientWidth: doc.clientWidth,
              hasOverflow: doc.scrollWidth > doc.clientWidth + 2,
            };
          });

          // Check for console errors
          const errors = [];
          page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
          });

          results.push({
            page: label,
            status: 'OK',
            overflow: overflow.hasOverflow ? `HORIZONTAL OVERFLOW (scrollW=${overflow.scrollWidth}, clientW=${overflow.clientWidth})` : 'none',
          });

          console.log(`OK  ${label}${overflow.hasOverflow ? ` [OVERFLOW: scrollW=${overflow.scrollWidth} clientW=${overflow.clientWidth}]` : ''}`);
        } catch (err) {
          results.push({ page: label, status: 'FAIL', error: err.message });
          console.log(`FAIL ${label}: ${err.message}`);
        } finally {
          await context.close();
        }
      }
    }
  }

  await browser.close();

  // Summary
  const ok = results.filter(r => r.status === 'OK').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  const overflowPages = results.filter(r => r.overflow !== 'none');
  console.log(`\n=== SUMMARY ===`);
  console.log(`OK: ${ok} | FAIL: ${fail} | Total: ${results.length}`);
  if (overflowPages.length > 0) {
    console.log(`\nOVERFLOW PAGES:`);
    overflowPages.forEach(r => console.log(`  ${r.page}: ${r.overflow}`));
  }
}

run().catch(err => { console.error(err); process.exit(1); });
