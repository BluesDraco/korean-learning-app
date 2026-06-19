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

const items = [
  // Basic vowels — wrap in 음... X 음 to give context and prevent clipping
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
  // Consonants — letter names
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
  // Batchim example words
  { id: 'b-01', text: '박' }, { id: 'b-02', text: '산' },
  { id: 'b-03', text: '옷' }, { id: 'b-04', text: '말' },
  { id: 'b-05', text: '밤' }, { id: 'b-06', text: '밥' },
  { id: 'b-07', text: '강' },
];

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

async function generateAudio(token, text) {
  // Vowel-initial: prepend 으 to prevent first-syllable clipping
  const ttsText = /^[아어오우이에외애위의얘예와왜워웨위의]/.test(text) ? '으, ' + text : text;
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
      speech_rate: -300,  // Very slow for clear pronunciation
      pitch_rate: 0,
    }),
  });
  if (!res.ok) throw new Error(`TTS failed: ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) throw new Error(`TTS error: ${JSON.stringify(await res.json())}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'audio', 'phonetics');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Getting NLS token...');
  const token = await getNlsToken();
  console.log('Token OK\n');

  let ok = 0, fail = 0;
  for (const item of items) {
    const outFile = path.join(outDir, `${item.id}.mp3`);
    try {
      const buf = await generateAudio(token, item.text);
      fs.writeFileSync(outFile, buf);
      console.log(`  OK   ${item.id} (${item.text}) — ${buf.length} bytes`);
      ok++;
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      console.error(`  FAIL ${item.id} (${item.text}): ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

main().catch(console.error);
