import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/vocabulary/library?tab=dictionary', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(3500);
await p.screenshot({ path: process.env.TEMP + '/dict-shots/tab-dictionary.png' });
console.log('done');
await b.close();
