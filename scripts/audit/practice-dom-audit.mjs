// @ts-check
// DOM-level visual audit for practice module
// Checks: dark mode coverage, overflow, z-index, touch targets, contrast, orphan elements
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3000';

const PAGES = [
  { name: 'practice-hub', url: '/practice' },
  { name: 'speaking-hub', url: '/speaking' },
  { name: 'dictation-hub', url: '/dictation' },
  { name: 'writing-hub', url: '/writing' },
  { name: 'typing-hub', url: '/typing' },
  { name: 'speaking-say', url: '/speaking/say' },
  { name: 'speaking-shadow', url: '/speaking/shadow' },
  { name: 'speaking-retell', url: '/speaking/retell' },
  { name: 'dictation-word', url: '/dictation/word' },
  { name: 'dictation-sentence', url: '/dictation/sentence' },
  { name: 'dictation-mistakes', url: '/dictation/mistakes' },
  { name: 'scene-haru-cafe', url: '/practice/haru-cafe' },
  { name: 'companion', url: '/companion/test-id' },
];

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
async function dismissModals(page) {
  // Click all close buttons
  const btns = await page.$$('button');
  for (const btn of btns) {
    try {
      const text = await btn.textContent();
      if (text && /×|✕|关闭|close|skip|跳过/i.test(text)) {
        await btn.click({ timeout: 300 });
        await page.waitForTimeout(300);
      }
    } catch (_) {}
  }
  // Click dim backgrounds
  const dims = await page.$$('[class*="backdrop"], [class*="Overlay"], [style*="z-index: 999"]');
  for (const dim of dims) {
    try {
      await dim.click({ timeout: 300 });
      await page.waitForTimeout(300);
    } catch (_) {}
  }
}

/** @param {import('playwright').Page} page */
async function auditDOM(page, label) {
  const issues = [];

  const data = await page.evaluate(() => {
    const results = {
      horizontalOverflow: false,
      overflowElements: [],
      zeroSizeButtons: [],
      smallTouchTargets: [],
      darkModeIssues: [],
      highZIndex: [],
      emptyContainers: [],
      contrastWarnings: [],
    };

    const vw = window.innerWidth;

    // 1. Horizontal overflow
    const doc = document.documentElement;
    if (doc.scrollWidth > doc.clientWidth + 2) {
      results.horizontalOverflow = true;
      results.overflowElements.push(`html scrollW=${doc.scrollWidth} clientW=${doc.clientWidth}`);
    }

    // Check all direct children of body for overflow
    const allEls = document.querySelectorAll('body *');
    for (const el of allEls) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      const tag = el.tagName.toLowerCase();
      const cls = (el.className && typeof el.className === 'string') ? el.className.split(' ').slice(0, 3).join('.') : '';

      // 2. Overflowing elements
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 100) {
        results.overflowElements.push(
          `${tag}.${cls} scrollW=${el.scrollWidth} clientW=${el.clientWidth}`
        );
      }

      // 3. Zero-size interactive elements
      if ((tag === 'button' || tag === 'a' || el.getAttribute('role') === 'button') && (rect.width === 0 || rect.height === 0)) {
        if (el.textContent && el.textContent.trim()) {
          results.zeroSizeButtons.push(`${tag}.${cls} text="${el.textContent.trim().slice(0, 20)}"`);
        }
      }

      // 4. Small touch targets (only on mobile: vw < 500)
      if (vw < 500 && (tag === 'button' || tag === 'a' || el.getAttribute('role') === 'button')) {
        if (rect.width > 0 && rect.height > 0 && (rect.width < 42 || rect.height < 42)) {
          results.smallTouchTargets.push(
            `${tag}.${cls} ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} text="${(el.textContent || '').trim().slice(0, 20)}"`
          );
        }
      }

      // 5. z-index > 100 (potential stacking issues)
      if (zIndex > 100) {
        results.highZIndex.push(`${tag}.${cls} z=${zIndex}`);
      }

      // 6. Empty containers with min-height set
      const minH = parseInt(style.minHeight);
      if (minH > 100 && el.children.length === 0 && !el.textContent?.trim()) {
        results.emptyContainers.push(`${tag}.${cls} minH=${minH}px`);
      }

      // 7. Background color contrast warnings (only dark mode)
      const bg = style.backgroundColor;
      const color = style.color;
      // Parse rgb values
      const bgMatch = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      const colorMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if (bgMatch && colorMatch) {
        const bgLum = (0.299 * parseInt(bgMatch[1]) + 0.587 * parseInt(bgMatch[2]) + 0.114 * parseInt(bgMatch[3]));
        const fgLum = (0.299 * parseInt(colorMatch[1]) + 0.587 * parseInt(colorMatch[2]) + 0.114 * parseInt(colorMatch[3]));
        const contrast = Math.abs(bgLum - fgLum);
        if (contrast < 20 && bgLum > 200 && fgLum > 200) {
          results.contrastWarnings.push(`${tag}.${cls} bg=${bg} color=${color} contrast=${contrast.toFixed(1)}`);
        }
      }
    }

    return results;
  });

  // Format issues
  if (data.horizontalOverflow) {
    issues.push(`HORIZONTAL_OVERFLOW`);
    data.overflowElements.slice(0, 5).forEach(e => issues.push(`  ↳ ${e}`));
  }

  const overflowEls = data.overflowElements.filter(e => !e.startsWith('html '));
  if (overflowEls.length > 0) {
    issues.push(`ELEMENT_OVERFLOW (${overflowEls.length}): ${overflowEls.slice(0, 5).join(' | ')}`);
  }

  if (data.zeroSizeButtons.length > 0) {
    issues.push(`ZERO_SIZE_BUTTONS (${data.zeroSizeButtons.length}): ${data.zeroSizeButtons.slice(0, 5).join(' | ')}`);
  }

  if (data.smallTouchTargets.length > 0) {
    issues.push(`SMALL_TOUCH (${data.smallTouchTargets.length}): ${data.smallTouchTargets.slice(0, 5).join(' | ')}`);
  }

  if (data.emptyContainers.length > 0) {
    issues.push(`EMPTY_CONTAINERS (${data.emptyContainers.length}): ${data.emptyContainers.slice(0, 3).join(' | ')}`);
  }

  if (data.contrastWarnings.length > 0 && label.includes('dark')) {
    issues.push(`CONTRAST_WARN (${data.contrastWarnings.length}): ${data.contrastWarnings.slice(0, 5).join(' | ')}`);
  }

  return { issues, highZ: data.highZIndex };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const allIssues = [];

  for (const pg of PAGES) {
    for (const theme of ['light', 'dark']) {
      for (const vp of [{ w: 390, h: 844, label: 'mobile' }, { w: 1440, h: 900, label: 'desktop' }]) {
        const context = await browser.newContext({
          viewport: { width: vp.w, height: vp.h },
          deviceScaleFactor: vp.label === 'mobile' ? 2 : 1,
        });
        const page = await context.newPage();
        const label = `${pg.name}_${vp.label}_${theme}`;

        try {
          await page.goto(BASE + pg.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await page.waitForTimeout(300);
          await setTheme(page, theme);
          await dismissModals(page);
          await page.waitForTimeout(300);

          const { issues } = await auditDOM(page, label);

          if (issues.length > 0) {
            console.log(`[ISSUE] ${label}:`);
            issues.forEach(i => console.log(`  ${i}`));
            allIssues.push({ page: label, issues });
          } else {
            console.log(`OK     ${label}`);
          }
        } catch (err) {
          console.log(`CRASH  ${label}: ${err.message}`);
          allIssues.push({ page: label, issues: [`CRASH: ${err.message}`] });
        } finally {
          await context.close();
        }
      }
    }
  }

  await browser.close();

  console.log(`\n=== DOM AUDIT SUMMARY ===`);
  if (allIssues.length === 0) {
    console.log(`All 52 page/theme/viewport combos pass. Zero issues found.`);
  } else {
    console.log(`${allIssues.length} combos with issues:`);
    allIssues.forEach(({ page, issues }) => {
      console.log(`\n${page}:`);
      issues.slice(0, 3).forEach(i => console.log(`  ${i}`));
    });
  }
}

run().catch(err => { console.error(err); process.exit(1); });
