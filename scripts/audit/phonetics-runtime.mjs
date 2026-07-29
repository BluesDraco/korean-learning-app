// Phonetics module runtime audit
// Usage: node scripts/audit/phonetics-runtime.mjs
// Dev server must be running at http://localhost:3000

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = resolve(__dirname, 'phonetics-screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BASE = 'http://localhost:3000';

const PAGES = [
  { path: '/phonetics', label: 'hub' },
  { path: '/phonetics/step/1/letter', label: 'step1-letter' },
  { path: '/phonetics/step/1/quiz', label: 'step1-quiz' },
  { path: '/phonetics/step/1/challenge', label: 'step1-challenge' },
  { path: '/phonetics/step/practice', label: 'practice' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

const results = [];

async function auditPage(browser, { path, label }, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();

  const errors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  const entry = {
    page: label,
    viewport: vp.name,
    url: `${BASE}${path}`,
    loadOK: false,
    title: '',
    consoleErrors: [],
    pageErrors: [],
    horizontalOverflow: false,
    highZCount: 0,
    screenshotPath: '',
    screenshotSize: 0,
  };

  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    // Extra settle time for React hydration
    await page.waitForTimeout(1500);
    entry.loadOK = true;
  } catch (e) {
    entry.loadOK = false;
    entry.loadError = e.message;
    await ctx.close();
    return entry;
  }

  // Title check
  entry.title = await page.title();

  // Horizontal overflow check
  try {
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 2;
    });
    entry.horizontalOverflow = overflow;
  } catch (e) {
    entry.horizontalOverflow = 'error: ' + e.message;
  }

  // Z-index check
  try {
    const highZ = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      let count = 0;
      const details = [];
      all.forEach(el => {
        const style = window.getComputedStyle(el);
        const z = parseInt(style.zIndex, 10);
        if (!isNaN(z) && z > 100) {
          count++;
          if (details.length < 15) {
            details.push({ tag: el.tagName, id: el.id, class: el.className?.slice(0, 80), zIndex: z });
          }
        }
      });
      return { count, details };
    });
    entry.highZCount = highZ.count;
    entry.highZDetails = highZ.details;
  } catch (e) {
    entry.highZCount = 'error: ' + e.message;
  }

  // Screenshot
  const shotFile = `${label}-${vp.name}.png`;
  const shotPath = resolve(SCREENSHOT_DIR, shotFile);
  try {
    await page.screenshot({ path: shotPath, fullPage: false });
    entry.screenshotPath = shotPath;
    const { size } = await import('fs').then(fs => fs.statSync(shotPath));
    entry.screenshotSize = size;
  } catch (e) {
    entry.screenshotPath = 'FAIL: ' + e.message;
    entry.screenshotSize = 0;
  }

  entry.consoleErrors = errors;
  entry.pageErrors = pageErrors;

  await ctx.close();
  return entry;
}

async function auditDarkMode(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const entry = {
    page: 'hub-dark',
    viewport: 'desktop',
    url: `${BASE}/phonetics`,
    loadOK: false,
    darkEnabled: false,
    consoleErrors: [],
    pageErrors: [],
    horizontalOverflow: false,
    highZCount: 0,
    screenshotPath: '',
    screenshotSize: 0,
  };

  try {
    await page.goto(`${BASE}/phonetics`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);
    entry.loadOK = true;

    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(800);

    // Verify the attribute took
    entry.darkEnabled = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    const darkShotPath = resolve(SCREENSHOT_DIR, 'hub-dark-mode.png');
    await page.screenshot({ path: darkShotPath, fullPage: false });
    entry.screenshotPath = darkShotPath;
    const { size } = await import('fs').then(fs => fs.statSync(darkShotPath));
    entry.screenshotSize = size;

    entry.consoleErrors = errors;
  } catch (e) {
    entry.loadError = e.message;
  }

  await ctx.close();
  return entry;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function summarize(results) {
  console.log('\n' + '='.repeat(70));
  console.log('  PHONETICS MODULE RUNTIME AUDIT SUMMARY');
  console.log('='.repeat(70));

  // Collect findings
  const crashes = results.filter(r => !r.loadOK);
  const consoleErrPages = results.filter(r => r.consoleErrors?.length > 0);
  const pageErrPages = results.filter(r => r.pageErrors?.length > 0);
  const overflowPages = results.filter(r => r.horizontalOverflow === true);
  const highZPages = results.filter(r => typeof r.highZCount === 'number' && r.highZCount > 0);
  const suspiciousScreenshots = results.filter(r => r.screenshotSize > 0 && r.screenshotSize < 5120);

  // Print per-page results
  for (const r of results) {
    const status = r.loadOK ? 'OK' : 'CRASH';
    const row = `[${status}] ${r.page} @ ${r.viewport}`;
    console.log(`\n${row}`);
    console.log(`  URL: ${r.url}`);

    if (!r.loadOK) {
      console.log(`  LOAD ERROR: ${r.loadError}`);
      continue;
    }

    console.log(`  Title: "${r.title}"`);

    if (r.consoleErrors?.length > 0) {
      console.log(`  Console Errors (${r.consoleErrors.length}):`);
      r.consoleErrors.slice(0, 5).forEach(e => console.log(`    - ${e}`));
    }

    if (r.pageErrors?.length > 0) {
      console.log(`  Page Errors (${r.pageErrors.length}):`);
      r.pageErrors.forEach(e => console.log(`    - ${e}`));
    }

    if (r.horizontalOverflow === true) {
      console.log(`  ! HORIZONTAL OVERFLOW detected`);
    }

    if (typeof r.highZCount === 'number' && r.highZCount > 0) {
      console.log(`  z-index > 100: ${r.highZCount} elements`);
      if (r.highZDetails?.length > 0) {
        r.highZDetails.forEach(d => {
          console.log(`    - ${d.tag} .${d.class} z=${d.zIndex}`);
        });
      }
    }

    if (r.screenshotSize > 0) {
      const sizeStr = formatBytes(r.screenshotSize);
      const warn = r.screenshotSize < 5120 ? ' <-- SUSPICIOUSLY SMALL (possible blank page)' : '';
      console.log(`  Screenshot: ${sizeStr}${warn}`);
    }
  }

  // Summary counts
  console.log('\n' + '-'.repeat(70));
  console.log('COUNTS');
  console.log(`  Crashes:           ${crashes.length}`);
  console.log(`  Console errors:    ${consoleErrPages.length} pages`);
  console.log(`  Page exceptions:   ${pageErrPages.length} pages`);
  console.log(`  Horizontal overflow: ${overflowPages.length} pages`);
  console.log(`  z-index > 100:     ${highZPages.length} pages`);
  console.log(`  <5KB screenshots:  ${suspiciousScreenshots.length} pages`);
  console.log('-'.repeat(70));

  return {
    crashes: crashes.length,
    consoleErrors: consoleErrPages.length,
    pageErrors: pageErrPages.length,
    overflow: overflowPages.length,
    highZ: highZPages.length,
    smallScreenshots: suspiciousScreenshots.length,
  };
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  try {
    // Audit all pages at both viewports
    for (const pageDef of PAGES) {
      for (const vp of VIEWPORTS) {
        console.log(`Auditing: ${pageDef.label} @ ${vp.name}...`);
        const r = await auditPage(browser, pageDef, vp);
        results.push(r);
      }
    }

    // Dark mode check
    console.log('Auditing: dark mode on /phonetics...');
    const darkResult = await auditDarkMode(browser);
    results.push(darkResult);

  } finally {
    await browser.close();
  }

  const summary = summarize(results);

  // Write JSON report
  const reportPath = resolve(SCREENSHOT_DIR, 'audit-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nFull JSON report: ${reportPath}`);
  console.log(`Screenshots: ${SCREENSHOT_DIR}`);

  // Exit with error code if real problems found
  if (summary.crashes > 0 || summary.consoleErrors > 0 || summary.pageErrors > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
