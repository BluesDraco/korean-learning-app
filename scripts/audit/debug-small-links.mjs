import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  await page.goto(BASE + '/practice', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(500);

  // Find all <a> elements with height <= 25px
  const smallLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    const results = [];
    for (const a of links) {
      const rect = a.getBoundingClientRect();
      if (rect.height > 0 && rect.height <= 25) {
        // Get parent chain for context
        let parent = a.parentElement;
        const chain = [];
        for (let i = 0; i < 3 && parent; i++) {
          const cls = parent.className && typeof parent.className === 'string'
            ? parent.className.split(' ').slice(0, 2).join('.')
            : '';
          chain.push(parent.tagName.toLowerCase() + (cls ? '.' + cls : ''));
          parent = parent.parentElement;
        }
        results.push({
          text: a.textContent?.trim().slice(0, 40),
          w: rect.width,
          h: rect.height,
          href: a.getAttribute('href')?.slice(0, 60),
          cls: a.className && typeof a.className === 'string' ? a.className.split(' ').slice(0, 3).join('.') : '',
          chain: chain.join(' > '),
        });
      }
    }
    return results;
  });

  console.log(`Found ${smallLinks.length} small <a> elements (height <= 25px):\n`);
  smallLinks.slice(0, 10).forEach(l => {
    console.log(`  [${l.w}×${l.h}] "${l.text}"`);
    console.log(`    href: ${l.href}`);
    console.log(`    cls: "${l.cls}"`);
    console.log(`    parent chain: ${l.chain}`);
    console.log();
  });

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
