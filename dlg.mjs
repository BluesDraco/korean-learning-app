import { chromium } from 'playwright';
const TOKEN = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1512, height: 850 } });
await ctx.addCookies([{ name: 'token', value: TOKEN, domain: 'localhost', path: '/', httpOnly: true }]);
const p = await ctx.newPage();
await p.goto('http://localhost:3000/practice/incheon-airport', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(5000);
for (const s of ['button:has-text("×")','button:has-text("知道了")','button:has-text("进入")']) {
  const el=await p.$(s); if(el){await el.click().catch(()=>{});await p.waitForTimeout(300);}
}
for (let i=0;i<25;i++){
  if (await p.$('.chatui-desktop')) { console.log('reached chat, click', i); break; }
  // quiz：先选一个选项
  const opt = await p.$('.spv2-choice:not(.correct):not(.wrong), .spv2-quiz-opt');
  // 优先推进按钮
  const next = await p.$('.spv2-btn-next');
  if (next) { await next.click().catch(()=>{}); await p.waitForTimeout(800); continue; }
  const seeDlg = await p.$('button:has-text("看完整对话"), button:has-text("开始 AI 对话"), button:has-text("开始对话")');
  if (seeDlg){ await seeDlg.click().catch(()=>{}); await p.waitForTimeout(800); continue; }
  if (opt){ await opt.click().catch(()=>{}); await p.waitForTimeout(500); continue; }
  const anyNext = await p.$('button:has-text("下一"), button:has-text("→")');
  if (anyNext){ await anyNext.click().catch(()=>{}); await p.waitForTimeout(700); continue; }
  console.log('stuck at click', i); break;
}
for (const s of ['button:has-text("文字")','button:has-text("打字")','button:has-text("文本")']) {
  const el=await p.$(s); if(el){await el.click().catch(()=>{});await p.waitForTimeout(600);break;}
}
await p.waitForTimeout(3000);
console.log('chatui-desktop:', await p.$('.chatui-desktop')?true:false, 'URL:', p.url());
await p.screenshot({ path: 'dlg-chat.png' });
await b.close();
