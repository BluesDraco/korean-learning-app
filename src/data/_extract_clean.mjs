import fs from 'fs';
import path from 'path';

const ROOT = 'C:/Users/Administrator/Desktop/korean-learning-app';
const SCOPES = ['src', 'public'];
const EXCLUDE_DIRS = new Set(['node_modules','.next','.git','dict']);
const PHONETIC_KEYS = new Set(['pronunciation','pron','romanization','roman','rom','tricky','note']);
const RE_KOREAN = /[가-힣]{2,}/g;

function extractFromTs(content){
  const keyRe = /(?:pronunciation|romanization|roman|rom|tricky|pron|note)\s*:\s*[`'"][^`'"]*[`'"]/g;
  const c = content.replace(keyRe, '');
  return c.match(RE_KOREAN) || [];
}

function extractFromJson(obj, acc){
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)){
    for (const x of obj) extractFromJson(x, acc);
    return;
  }
  for (const [k, v] of Object.entries(obj)){
    if (PHONETIC_KEYS.has(k)) continue;
    if (typeof v === 'string'){
      const m = v.match(RE_KOREAN);
      if (m) acc.push(...m);
    } else if (v && typeof v === 'object'){
      extractFromJson(v, acc);
    }
  }
}

const tokMap = {};
function addTokens(words, file){
  for (const w of words){
    if (!tokMap[w]) tokMap[w] = { files: new Set(), count: 0 };
    tokMap[w].files.add(file);
    tokMap[w].count++;
  }
}

const files = [];
function walk(dir){
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const ent of ents){
    if (ent.isDirectory()){
      if (EXCLUDE_DIRS.has(ent.name)) continue;
      walk(path.join(dir, ent.name));
    } else if (ent.isFile()){
      const rel = path.relative(ROOT, path.join(dir, ent.name)).split(path.sep).join('/');
      const ext = path.extname(ent.name).toLowerCase();
      if (['.ts','.tsx','.js','.jsx','.mjs','.cjs','.html','.md','.txt','.json'].includes(ext)){
        files.push({ rel, abs: path.join(dir, ent.name), ext });
      }
    }
  }
}
for (const s of SCOPES) walk(path.join(ROOT, s));
console.log('Scanned files:', files.length);

let total = 0;
for (const f of files){
  let content;
  try { content = fs.readFileSync(f.abs, 'utf8'); } catch { continue; }
  if (f.ext === '.json'){
    try {
      const obj = JSON.parse(content);
      const acc = [];
      extractFromJson(obj, acc);
      if (acc.length){ addTokens(acc, f.rel); total += acc.length; }
    } catch {
      const m = content.match(RE_KOREAN);
      if (m) { addTokens(m, f.rel); total += m.length; }
    }
  } else {
    const m = extractFromTs(content);
    if (m.length){ addTokens(m, f.rel); total += m.length; }
  }
}

const out = {};
for (const [w, v] of Object.entries(tokMap)){
  out[w] = { files: [...v.files], count: v.count };
}
fs.writeFileSync('C:/Users/Administrator/Desktop/korean-learning-app/_tokfiles3.json', JSON.stringify(out));
console.log('Unique words:', Object.keys(out).length, 'Total tokens:', total);
