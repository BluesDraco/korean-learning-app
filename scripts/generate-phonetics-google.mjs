import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const items = [
  // Basic vowels
  { id: 'v-01', text: '아' }, { id: 'v-02', text: '야' },
  { id: 'v-03', text: '어' }, { id: 'v-04', text: '여' },
  { id: 'v-05', text: '오' }, { id: 'v-06', text: '요' },
  { id: 'v-07', text: '우' }, { id: 'v-08', text: '유' },
  { id: 'v-09', text: '으' }, { id: 'v-10', text: '이' },
  // Compound vowels
  { id: 'v-11', text: '애' }, { id: 'v-12', text: '얘' },
  { id: 'v-13', text: '에' }, { id: 'v-14', text: '예' },
  { id: 'v-15', text: '와' }, { id: 'v-16', text: '왜' },
  { id: 'v-17', text: '외' }, { id: 'v-18', text: '워' },
  { id: 'v-19', text: '웨' }, { id: 'v-20', text: '위' },
  { id: 'v-21', text: '의' },
  // Basic consonants
  { id: 'c-01', text: '기역' }, { id: 'c-02', text: '니은' },
  { id: 'c-03', text: '디귿' }, { id: 'c-04', text: '리을' },
  { id: 'c-05', text: '미음' }, { id: 'c-06', text: '비읍' },
  { id: 'c-07', text: '시옷' }, { id: 'c-08', text: '이응' },
  { id: 'c-09', text: '지읒' }, { id: 'c-10', text: '치읓' },
  { id: 'c-11', text: '키읔' }, { id: 'c-12', text: '티읕' },
  { id: 'c-13', text: '피읖' }, { id: 'c-14', text: '히읗' },
  // Double consonants
  { id: 'c-15', text: '쌍기역' }, { id: 'c-16', text: '쌍디귿' },
  { id: 'c-17', text: '쌍비읍' }, { id: 'c-18', text: '쌍시옷' },
  { id: 'c-19', text: '쌍지읒' },
  // Batchim example words
  { id: 'b-01', text: '박' },
  { id: 'b-02', text: '산' },
  { id: 'b-03', text: '옷' },
  { id: 'b-04', text: '말' },
  { id: 'b-05', text: '밤' },
  { id: 'b-06', text: '밥' },
  { id: 'b-07', text: '강' },
];

async function fetchGoogleTTS(text) {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=${encoded}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('audio')) throw new Error(`Unexpected content-type: ${ct}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'audio', 'phonetics');
  fs.mkdirSync(outDir, { recursive: true });

  let ok = 0, fail = 0;
  for (const item of items) {
    const outFile = path.join(outDir, `${item.id}.mp3`);
    try {
      const buf = await fetchGoogleTTS(item.text);
      fs.writeFileSync(outFile, buf);
      console.log(`  OK   ${item.id} (${item.text}) — ${buf.length} bytes`);
      ok++;
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error(`  FAIL ${item.id} (${item.text}): ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

main().catch(console.error);
