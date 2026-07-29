import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const PAGES = [
  '/topik',
  '/topik/history',
  '/topik/mistakes',
  '/topik/start/topik-e01-I',
  '/topik/practice/I-L-detail',
  '/topik/type/I-L-detail',
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  for (const url of PAGES) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    try {
      await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(500);
      const title = await page.title();
      if (consoleErrors.length > 0) {
        console.log(`WARN ${url}: ${consoleErrors.length} console errors`);
        errors.push({ url, errors: consoleErrors });
      } else {
        console.log(`OK   ${url} — "${title}"`);
      }
    } catch (err) {
      console.log(`FAIL ${url}: ${err.message}`);
      errors.push({ url, error: err.message });
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log(`\n=== RESULT: ${errors.length === 0 ? 'ALL PASS' : `${errors.length} pages with issues`} ===`);
}

run().catch(err => { console.error(err); process.exit(1); });
