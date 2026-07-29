/**
 * 删除所有非 haru-cafe 文件中 pattern 的 when: '...' 字段
 * haru-cafe 的 when 是手动写的、有意义的，保留
 */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/data/scenePreview');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'haru-cafe.ts');

let count = 0;
for (const file of files) {
  const fp = path.join(dir, file);
  let txt = fs.readFileSync(fp, 'utf8');
  const orig = txt;
  // 删除 when: '...', 行（含前后空格）
  txt = txt.replace(/[ \t]*when: '[^']*',[ \t]*/g, '');
  if (txt !== orig) {
    fs.writeFileSync(fp, txt, 'utf8');
    console.log('✅ ' + file);
    count++;
  }
}
console.log(`\nDone: ${count} files cleaned`);
