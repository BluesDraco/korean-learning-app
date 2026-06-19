import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, '..', '.env.local');
const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
for (const line of envLines) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const APPKEY = process.env.ALIYUN_NLS_APPKEY;
const ACCESS_KEY_ID = process.env.ALIYUN_ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ALIYUN_ACCESS_KEY_SECRET;
const TTS_URL = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';

// ── 40音字母 ──
const phoneticItems = [
  { id: 'v-01', text: '아' }, { id: 'v-02', text: '야' },
  { id: 'v-03', text: '어' }, { id: 'v-04', text: '여' },
  { id: 'v-05', text: '오' }, { id: 'v-06', text: '요' },
  { id: 'v-07', text: '우' }, { id: 'v-08', text: '유' },
  { id: 'v-09', text: '으' }, { id: 'v-10', text: '이' },
  { id: 'v-11', text: '애' }, { id: 'v-12', text: '얘' },
  { id: 'v-13', text: '에' }, { id: 'v-14', text: '예' },
  { id: 'v-15', text: '와' }, { id: 'v-16', text: '왜' },
  { id: 'v-17', text: '외' }, { id: 'v-18', text: '워' },
  { id: 'v-19', text: '웨' }, { id: 'v-20', text: '위' },
  { id: 'v-21', text: '의' },
  { id: 'c-01', text: '기역' }, { id: 'c-02', text: '니은' },
  { id: 'c-03', text: '디귿' }, { id: 'c-04', text: '리을' },
  { id: 'c-05', text: '미음' }, { id: 'c-06', text: '비읍' },
  { id: 'c-07', text: '시옷' }, { id: 'c-08', text: '이응' },
  { id: 'c-09', text: '지읒' }, { id: 'c-10', text: '치읓' },
  { id: 'c-11', text: '키읔' }, { id: 'c-12', text: '티읕' },
  { id: 'c-13', text: '피읖' }, { id: 'c-14', text: '히읗' },
  { id: 'c-15', text: '쌍기역' }, { id: 'c-16', text: '쌍디귿' },
  { id: 'c-17', text: '쌍비읍' }, { id: 'c-18', text: '쌍시옷' },
  { id: 'c-19', text: '쌍지읒' },
  { id: 'b-01', text: '박' }, { id: 'b-02', text: '산' },
  { id: 'b-03', text: '옷' }, { id: 'b-04', text: '말' },
  { id: 'b-05', text: '밤' }, { id: 'b-06', text: '밥' },
  { id: 'b-07', text: '강' },
];

// ── 课程数据 (inline to avoid TS import issues) ──
const { thirtyDayCourse } = await import('../src/data/thirtyDayCourse.ts');

const wordSet = new Set();
const sentenceSet = new Set();
for (const day of thirtyDayCourse) {
  for (const w of (day.words || [])) if (w.korean) wordSet.add(w.korean);
  for (const s of (day.sentences || [])) if (s.korean) sentenceSet.add(s.korean);
}

// Safe filename: use hash of text
function textToFilename(text) {
  return crypto.createHash('md5').update(text).digest('hex').slice(0, 12);
}

function percentEncode(s) {
  return encodeURIComponent(s)
    .replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
    .replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

async function getNlsToken() {
  const params = {
    AccessKeyId: ACCESS_KEY_ID,
    Action: 'CreateToken',
    Format: 'JSON',
    RegionId: 'cn-shanghai',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: crypto.randomUUID().replace(/-/g, ''),
    SignatureVersion: '1.0',
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    Version: '2019-02-28',
  };
  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys.map(k => `${percentEncode(k)}=${percentEncode(params[k])}`).join('&');
  const stringToSign = `GET&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = crypto.createHmac('sha1', `${ACCESS_KEY_SECRET}&`).update(stringToSign).digest('base64');
  const url = `https://nls-meta.cn-shanghai.aliyuncs.com/?${canonicalQuery}&Signature=${percentEncode(signature)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.Token.Id;
}

async function generateAudio(token, text, speechRate = -20) {
  const ttsText = /^[아어오우이에외애위의얘예와왜워웨]/.test(text) ? '으 ' + text : text;
  const res = await fetch(TTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-NLS-Token': token },
    body: JSON.stringify({
      appkey: APPKEY,
      text: ttsText,
      token,
      format: 'mp3',
      sample_rate: 24000,
      voice: 'Kyong',
      volume: 60,
      speech_rate: speechRate,
      pitch_rate: 0,
    }),
  });
  if (!res.ok) throw new Error(`TTS failed: ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) throw new Error(`TTS error: ${JSON.stringify(await res.json())}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  // Create output directories
  const phoneticDir = path.join(__dirname, '..', 'public', 'audio', 'phonetics');
  const courseDir = path.join(__dirname, '..', 'public', 'audio', 'course');
  fs.mkdirSync(phoneticDir, { recursive: true });
  fs.mkdirSync(courseDir, { recursive: true });

  console.log('Getting NLS token...');
  let token = await getNlsToken();
  let tokenRefreshedAt = Date.now();
  console.log('Token OK\n');

  let ok = 0, skip = 0, fail = 0;

  // Helper to refresh token every 10 hours
  async function getToken() {
    if (Date.now() - tokenRefreshedAt > 10 * 60 * 60 * 1000) {
      token = await getNlsToken();
      tokenRefreshedAt = Date.now();
    }
    return token;
  }

  // ── Generate phonetics ──
  console.log(`=== 40音字母 (${phoneticItems.length}个) ===`);
  for (const item of phoneticItems) {
    const outFile = path.join(phoneticDir, `${item.id}.mp3`);
    if (fs.existsSync(outFile)) { console.log(`  SKIP ${item.id} (${item.text})`); skip++; continue; }
    try {
      const buf = await generateAudio(await getToken(), item.text, -20);
      fs.writeFileSync(outFile, buf);
      console.log(`  OK   ${item.id} (${item.text}) — ${buf.length} bytes`);
      ok++;
      await new Promise(r => setTimeout(r, 150));
    } catch (e) {
      console.error(`  FAIL ${item.id} (${item.text}): ${e.message}`);
      fail++;
    }
  }

  // ── Generate course words ──
  console.log(`\n=== 课程单词 (${wordSet.size}个) ===`);
  for (const text of wordSet) {
    const hash = textToFilename(text);
    const outFile = path.join(courseDir, `w_${hash}.mp3`);
    if (fs.existsSync(outFile)) { skip++; continue; }
    try {
      const buf = await generateAudio(await getToken(), text, -20);
      fs.writeFileSync(outFile, buf);
      console.log(`  OK   ${text} → w_${hash}.mp3`);
      ok++;
      await new Promise(r => setTimeout(r, 150));
    } catch (e) {
      console.error(`  FAIL ${text}: ${e.message}`);
      fail++;
    }
  }

  // ── Generate course sentences ──
  console.log(`\n=== 课程例句 (${sentenceSet.size}个) ===`);
  for (const text of sentenceSet) {
    const hash = textToFilename(text);
    const outFile = path.join(courseDir, `s_${hash}.mp3`);
    if (fs.existsSync(outFile)) { skip++; continue; }
    try {
      const buf = await generateAudio(await getToken(), text, 0);
      fs.writeFileSync(outFile, buf);
      console.log(`  OK   ${text.slice(0, 20)}... → s_${hash}.mp3`);
      ok++;
      await new Promise(r => setTimeout(r, 150));
    } catch (e) {
      console.error(`  FAIL ${text.slice(0, 20)}: ${e.message}`);
      fail++;
    }
  }

  // ── Write index file for registry ──
  const index = { phonetics: {}, course: { words: {}, sentences: {} } };
  for (const item of phoneticItems) {
    index.phonetics[item.text] = `/audio/phonetics/${item.id}.mp3`;
  }
  for (const text of wordSet) {
    const hash = textToFilename(text);
    index.course.words[text] = `/audio/course/w_${hash}.mp3`;
  }
  for (const text of sentenceSet) {
    const hash = textToFilename(text);
    index.course.sentences[text] = `/audio/course/s_${hash}.mp3`;
  }
  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'audio', 'audio-index.json'),
    JSON.stringify(index, null, 2)
  );

  console.log(`\nDone: ${ok} generated, ${skip} skipped, ${fail} failed`);
  console.log('Index written to public/audio/audio-index.json');
}

main().catch(console.error);
