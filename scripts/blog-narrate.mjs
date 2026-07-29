#!/usr/bin/env node
// 博客（动物朋友圈）帖子语音条配音生成器
// ─────────────────────────────────────────────────────────────────────────
// 从 repo 的 data/app.db 读 blog_posts（NPC + passerby，跳过 passerby_hidden）
//   每帖 content_json.sentences[].ko → 逐句 MiniMax(PCM) 合成
//   → 统一 -16 LUFS 响度归一（全角色同一目标，音量一致）
//   → 字节精确算时长 → 句间插短静音 → 拼接转 mp3 落 public/audio/blog/{slug}.mp3
//   → 直接 UPDATE blog_posts SET audio_url, audio_duration（语音条只需整段播放，无需逐句时间戳）
//
// 音色：按 author_id 查花名册（见 memory/blog-voice-roster.md）。路人按性别分两档。
//
// 用法：
//   node blog-narrate.mjs --dry-run                # 只统计帖数/句数/字符
//   node blog-narrate.mjs --slug=hongdae-hana      # 单帖
//   node blog-narrate.mjs --kind=npc               # 只 NPC / --kind=passerby
//   node blog-narrate.mjs --author=tori            # 只某作者
//   node blog-narrate.mjs                          # 整段语音条：全部（已生成的跳过）
//   node blog-narrate.mjs --force ...              # 重生
//   node blog-narrate.mjs --timings-only           # 只补逐句时间戳(t)，确定性成立则复用现有 mp3
//   node blog-narrate.mjs --prerecord-comments     # 逐条预录固定评论语音(角色音色)
//
// 幂等：整段模式 mp3 已在且 DB 有 audio_url 则跳过；timings-only 全句已有 t 则跳过；
//   评论模式文件在且 audioUrl 已填则跳过（均 --force 强制重生）。单句失败重试 5 次。
// 需要：D:/radio-tts-poc/.env(MINIMAX_API_KEY / MINIMAX_GROUP_ID) + ffmpeg。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createClient } from '@libsql/client';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dir, '..');
const DB_URL = 'file:' + path.join(REPO, 'data/app.db').replace(/\\/g, '/');
const AUDIO_DIR = path.join(REPO, 'public/audio/blog');
const ENV_DIR = 'D:/radio-tts-poc'; // 凭证 .env 仍放独立工作区

// ── 角色 → MiniMax voice_id（花名册 2026-07-24 定版）──
const VOICE = {
  tori:    'ttv-voice-2026072418124226-IqYdeGs2',
  minji:   'ttv-voice-2026071820165926-CWE1Lxma',
  haru:    'ttv-voice-2026071820110926-BaiXIoqU',
  nabi:    'ttv-voice-2026071820210626-iTgw6kmg',
  junho:   'ttv-voice-2026071820245526-ZPK3zbvn',
  choco:   'ttv-voice-2026071820310926-1fuuwrOc',
  koal:    'ttv-voice-2026071820275126-YOC6tHI9',
  darami:  'Korean_bright_announcer_vv1',
  news:    'Korean_PlayboyCharmer',
  gomdori: 'ttv-voice-2026071717173426-dYRoOH37',
  yowoo:   'Korean_SweetGirl',
};
const SPEED = { darami: 0.85, gomdori: 0.9 }; // 其余默认 0.9
const DEFAULT_SPEED = 0.9;

// ── 路人（passerby）按性别分两档 ──
const PASSERBY_FEMALE = 'ttv-voice-2026072418223426-7iDJviGN'; // 用户新建
const PASSERBY_MALE   = 'ttv-voice-2026071820275126-YOC6tHI9'; // 借男嘉宾B
const PASSERBY_GENDER = {
  // 女
  granny: 'f', newmom: 'f', nurse: 'f', florist: 'f', seolgi: 'f',
  cook1: 'f', slow: 'f', actor: 'f', jeju: 'f', daegu: 'f',
  // 男
  carpenter: 'm', firefighter: 'm', rider: 'm', taxi: 'm', salaryman: 'm',
  retiree: 'm', coder: 'm', founder: 'm', baker: 'm', busan: 'm',
  gapyeong: 'm', nightowl: 'm', student: 'm', runner: 'm',
};

function voiceFor(authorId, authorKind) {
  if (authorKind === 'passerby') {
    return PASSERBY_GENDER[authorId] === 'm' ? PASSERBY_MALE : PASSERBY_FEMALE;
  }
  return VOICE[authorId] || VOICE.tori;
}
function speedFor(authorId, authorKind) {
  if (authorKind === 'passerby') return DEFAULT_SPEED;
  return SPEED[authorId] ?? DEFAULT_SPEED;
}

const LUFS = -16; // 全角色统一目标响度（音量一致）
const GAP = 0.4;  // 句间静音(秒)

const MODEL = 'speech-02-turbo';
const SAMPLE_RATE = 32000, BYTES_PER_SAMPLE = 2, CHANNELS = 1;
const MAX_RETRY = 5;

// TTS 文本清洗：剥离 emoji、网络笑声(ㅋㅋ/ㅎㅎ)、卖萌延音(ㅠㅠ/ㅜㅜ/ㄷㄷ)等裸子音串。
// 屏幕仍显示原文，这里只清洗送 TTS 的文本，避免读成"kkkk"。
function cleanForTTS(text) {
  return text
    // emoji / 杂符号（保留韩文、汉字、常用标点）
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '')
    // 裸子音/裸元音串（网络用语 ㅋㅋㅋ ㅎㅎ ㅠㅠ ㅜㅜ ㄷㄷ ㅇㅇ 等，2个及以上）
    .replace(/[ㄱ-ㅎㅏ-ㅣ]{2,}/g, '')
    // 重复标点收敛
    .replace(/\.{2,}/g, '…')
    .replace(/[~〜]{1,}/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const FORCE = args.includes('--force');
// --timings-only：逐句重合成拿 PCM 字节算时间戳，默认不重写 mp3（确定性成立时）；
//   只把每句 t:[start,end] 写回 content_json.sentences，供前端点单句跳播整段。
// --prerecord-comments：把每帖 content.comments[] 逐条用「评论作者」角色音色预录成
//   public/audio/blog/comments/{slug}-c{i}.mp3，写回 content.comments[i].audioUrl。
const TIMINGS_ONLY = args.includes('--timings-only');
const PRERECORD_COMMENTS = args.includes('--prerecord-comments');
const slugArg = args.find(a => a.startsWith('--slug='));
const kindArg = args.find(a => a.startsWith('--kind='));
const authorArg = args.find(a => a.startsWith('--author='));
const ONLY_SLUG = slugArg ? slugArg.slice('--slug='.length) : null;
const ONLY_KIND = kindArg ? kindArg.slice('--kind='.length) : null;
const ONLY_AUTHOR = authorArg ? authorArg.slice('--author='.length) : null;

function fail(m) { console.error('\n❌', m, '\n'); process.exit(1); }
const bytesToSec = (b) => b / (SAMPLE_RATE * BYTES_PER_SAMPLE * CHANNELS);
const r2 = (n) => Math.round(n * 100) / 100;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

// ---------- .env ----------
function loadEnv() {
  const p = path.join(ENV_DIR, '.env');
  if (!fs.existsSync(p)) fail(`缺 .env(${p})`);
  const env = {};
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}
const env = loadEnv();
const API_KEY = env.MINIMAX_API_KEY, GROUP_ID = env.MINIMAX_GROUP_ID;
if (!DRY && (!API_KEY || !GROUP_ID)) fail('.env 缺 MINIMAX_API_KEY / MINIMAX_GROUP_ID');

const db = createClient({ url: DB_URL });

// ---------- 读 DB：待合成帖子（NPC + passerby，排除 passerby_hidden 与 user）----------
async function loadPosts() {
  const conds = ["author_kind IN ('npc','passerby')"];
  const params = [];
  if (ONLY_SLUG) { conds.push('slug = ?'); params.push(ONLY_SLUG); }
  if (ONLY_KIND) { conds.push('author_kind = ?'); params.push(ONLY_KIND); }
  if (ONLY_AUTHOR) { conds.push('author_id = ?'); params.push(ONLY_AUTHOR); }
  const sql = `SELECT slug, author_id, author_kind, content_json, audio_url, audio_duration
               FROM blog_posts WHERE ${conds.join(' AND ')} ORDER BY author_kind, author_id, slug`;
  const r = await db.execute({ sql, args: params });
  const posts = [];
  for (const row of r.rows) {
    let content = null;
    try { content = JSON.parse(row.content_json); } catch { /* skip malformed */ }
    if (!content || !Array.isArray(content.sentences)) continue;
    // 保留原始 sentences 顺序：清洗后为空的句子记 ko=''(不合成、t 记 null)，维持下标对应。
    const kos = content.sentences.map(s => cleanForTTS(String(s.ko || '')));
    if (!kos.some(Boolean)) continue; // 整帖无可合成句
    posts.push({
      slug: row.slug, authorId: row.author_id, authorKind: row.author_kind,
      kos, content, hasAudio: !!row.audio_url, audioDuration: Number(row.audio_duration ?? 0),
    });
  }
  return posts;
}

// ---------- MiniMax 单句 → PCM(含重试) ----------
async function synth(text, voiceId, speed) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    try {
      const res = await fetch(`https://api.minimaxi.com/v1/t2a_v2?GroupId=${GROUP_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL, text, stream: false,
          voice_setting: { voice_id: voiceId, speed, vol: 1.0, pitch: 0 },
          audio_setting: { sample_rate: SAMPLE_RATE, format: 'pcm' },
        }),
        signal: AbortSignal.timeout(30_000),
      });
      const data = await res.json();
      if (data?.base_resp?.status_code !== 0 || !data?.data?.audio)
        throw new Error(`base_resp=${JSON.stringify(data?.base_resp)}`);
      return Buffer.from(data.data.audio, 'hex');
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_RETRY) await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error(`合成失败(重试${MAX_RETRY}次): ${lastErr?.message}`);
}

function wavHeader(dataLen) {
  const h = Buffer.alloc(44);
  const byteRate = SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE;
  h.write('RIFF', 0); h.writeUInt32LE(36 + dataLen, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20);
  h.writeUInt16LE(CHANNELS, 22); h.writeUInt32LE(SAMPLE_RATE, 24);
  h.writeUInt32LE(byteRate, 28); h.writeUInt16LE(CHANNELS * BYTES_PER_SAMPLE, 32);
  h.writeUInt16LE(BYTES_PER_SAMPLE * 8, 34); h.write('data', 36); h.writeUInt32LE(dataLen, 40);
  return h;
}

function normalizeLoudness(pcm) {
  const r = spawnSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error',
    '-f', 's16le', '-ar', String(SAMPLE_RATE), '-ac', String(CHANNELS), '-i', 'pipe:0',
    '-af', `loudnorm=I=${LUFS}:TP=-1.5:LRA=11`,
    '-f', 's16le', '-ar', String(SAMPLE_RATE), '-ac', String(CHANNELS), 'pipe:1',
  ], { input: pcm, maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0 || !r.stdout || r.stdout.length === 0)
    throw new Error(`loudnorm 失败: ${r.stderr?.toString().slice(0, 200)}`);
  return r.stdout;
}

function toMp3(wavBuf, outMp3) {
  const tmp = outMp3.replace(/\.mp3$/, '.tmp.wav');
  fs.writeFileSync(tmp, wavBuf);
  const ff = spawnSync('ffmpeg', ['-y', '-i', tmp, '-codec:a', 'libmp3lame', '-b:a', '128k', outMp3], { encoding: 'utf8' });
  fs.rmSync(tmp, { force: true });
  return ff.status === 0 && fs.existsSync(outMp3);
}

// 逐句合成整段音频，同时算出每句在整段里的 [startSec, endSec] 时间戳（对齐原始 sentences 下标）。
// 句 i 的可听区间 = 它的 pcm 段（不含其后的静音间隙）：[cursor, cursor+pcm.length]。
// 返回 { chunks, totalSec, timings }。timings[i]=null 表示该句为空（不合成）。
async function synthPost(post, voiceId, speed) {
  const gapBytes = Math.round(GAP * SAMPLE_RATE * BYTES_PER_SAMPLE * CHANNELS);
  const silence = Buffer.alloc(gapBytes);
  const chunks = [];
  const timings = new Array(post.kos.length).fill(null);
  let cursor = 0;
  const nonEmpty = post.kos.filter(Boolean).length;
  let done = 0;
  for (let i = 0; i < post.kos.length; i++) {
    const ko = post.kos[i];
    if (!ko) continue; // 空句：不合成、不占音频、timing 记 null
    done++;
    process.stdout.write(`  [${done}/${nonEmpty}] ${ko.slice(0, 16)}… `);
    const raw = await synth(ko, voiceId, speed);
    const pcm = normalizeLoudness(raw);
    const startBytes = cursor;
    chunks.push(pcm); cursor += pcm.length;
    timings[i] = [r2(bytesToSec(startBytes)), r2(bytesToSec(cursor))];
    // 句间静音（末句后不加）：只在还有后续非空句时插入
    const moreAfter = post.kos.slice(i + 1).some(Boolean);
    if (moreAfter) { chunks.push(silence); cursor += gapBytes; }
    console.log(`✓ ${r2(bytesToSec(pcm.length))}s`);
  }
  return { chunks, totalSec: bytesToSec(cursor), timings };
}

async function generate(post) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  const outMp3 = path.join(AUDIO_DIR, `${post.slug}.mp3`);

  // --timings-only：所有非空句已有 t 且非 force → 跳过（已补过时间戳）
  if (TIMINGS_ONLY && !FORCE) {
    const allTimed = post.content.sentences.every(
      (s, i) => !post.kos[i] || (Array.isArray(s.t) && s.t.length === 2),
    );
    if (allTimed) { console.log(`  ⏭️  ${post.slug} 时间戳已齐,跳过`); return null; }
  }
  // 默认（全量重录）：已有 audio + mp3 文件存在 且非 force → 跳过
  if (!TIMINGS_ONLY && fs.existsSync(outMp3) && post.hasAudio && !FORCE) {
    console.log(`  ⏭️  ${post.slug} 已存在,跳过`);
    return null;
  }

  const voiceId = voiceFor(post.authorId, post.authorKind);
  const speed = speedFor(post.authorId, post.authorKind);
  const nonEmpty = post.kos.filter(Boolean).length;
  console.log(`\n🎙️  ${post.slug}  (${post.authorId}/${post.authorKind})  ${nonEmpty} 句  [${voiceId} @${speed}x ${LUFS}LUFS]${TIMINGS_ONLY ? ' (timings-only)' : ''}`);

  const { chunks, totalSec, timings } = await synthPost(post, voiceId, speed);
  const durInt = Math.round(totalSec);

  // 把时间戳写进 content.sentences[i].t（对齐原始下标）
  post.content.sentences.forEach((s, i) => { if (timings[i]) s.t = timings[i]; });

  // 确定性自检（--timings-only）：新合成总时长 vs 存量 audioDuration。
  // audioDuration 是整数秒（存时 round），量化误差最多 0.5s；阈值取 max(0.75s, 3%)。
  // 一致 → 现有 mp3 与新 timing 匹配，只写 timing，不重生 mp3（免重传）。
  // 超阈值 → MiniMax 非确定性致漂移，timing 贴旧 mp3 会错位 → 退化写新 mp3 + 标记需重传。
  let needsReupload = false;
  let wroteMp3 = false;
  if (TIMINGS_ONLY) {
    const diff = Math.abs(totalSec - post.audioDuration);
    const threshold = Math.max(0.75, totalSec * 0.03);
    if (post.audioDuration > 0 && diff <= threshold) {
      await db.execute({
        sql: `UPDATE blog_posts SET content_json = ? WHERE slug = ?`,
        args: [JSON.stringify(post.content), post.slug],
      });
      console.log(`  ✅ ${post.slug}: 时间戳已写 (Δ${r2(diff)}s ≤ ${r2(threshold)}s, 复用现有 mp3)`);
      return { durInt, needsReupload: false };
    }
    needsReupload = true;
    console.log(`  ⚠️ ${post.slug}: 新时长${r2(totalSec)}s vs 存量${post.audioDuration}s 差${r2(diff)}s > ${r2(threshold)}s → 重写 mp3`);
  }

  // 写 mp3（默认模式 / --force / timings 自检不通过）
  const allPcm = Buffer.concat(chunks);
  if (!toMp3(Buffer.concat([wavHeader(allPcm.length), allPcm]), outMp3)) fail(`${post.slug} mp3 失败`);
  wroteMp3 = true;
  const audioUrl = `/audio/blog/${post.slug}.mp3`;
  await db.execute({
    sql: `UPDATE blog_posts SET audio_url = ?, audio_duration = ?, content_json = ? WHERE slug = ?`,
    args: [audioUrl, durInt, JSON.stringify(post.content), post.slug],
  });
  console.log(`  ✅ ${post.slug}: ${mmss(totalSec)} / ${(fs.statSync(outMp3).size / 1024 / 1024).toFixed(2)}MB → DB 回填${wroteMp3 && needsReupload ? ' (需重传)' : ''}`);
  return { durInt, needsReupload };
}

// 评论作者音色：NPC 卡司走 VOICE 表；路人(passerby)按 PASSERBY_GENDER 性别分派。
// 评论作者既可能是卡司也可能是路人（路人也会互相评论），故不能只查 VOICE。
function commentVoiceFor(animalId) {
  if (VOICE[animalId]) return { voiceId: VOICE[animalId], speed: SPEED[animalId] ?? DEFAULT_SPEED };
  if (PASSERBY_GENDER[animalId]) {
    return { voiceId: PASSERBY_GENDER[animalId] === 'm' ? PASSERBY_MALE : PASSERBY_FEMALE, speed: DEFAULT_SPEED };
  }
  return null; // 真未知：调用方回落 + 告警
}

// 固定评论预录：每帖 content.comments[i] 用「评论作者」角色音色逐条合成
// public/audio/blog/comments/{slug}-c{i}.mp3，写回 comments[i].audioUrl。
const COMMENTS_DIR = path.join(AUDIO_DIR, 'comments');
async function prerecordComments(post) {
  const comments = Array.isArray(post.content.comments) ? post.content.comments : [];
  if (comments.length === 0) return { count: 0 };
  fs.mkdirSync(COMMENTS_DIR, { recursive: true });
  let wrote = 0;
  console.log(`\n💬 ${post.slug}  ${comments.length} 条评论`);
  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];
    const ko = cleanForTTS(String(c.ko || ''));
    if (!ko) continue;
    const outMp3 = path.join(COMMENTS_DIR, `${post.slug}-c${i}.mp3`);
    if (fs.existsSync(outMp3) && c.audioUrl && !FORCE) {
      console.log(`  ⏭️  c${i} 已存在,跳过`);
      continue;
    }
    let sel = commentVoiceFor(c.animalId);
    if (!sel) { sel = { voiceId: VOICE.tori, speed: DEFAULT_SPEED }; console.log(`  ⚠️ c${i} 未知评论作者 ${c.animalId} → 回落 tori`); }
    const { voiceId, speed } = sel;
    process.stdout.write(`  [c${i}] ${c.animalId} ${ko.slice(0, 14)}… `);
    const raw = await synth(ko, voiceId, speed);
    const pcm = normalizeLoudness(raw);
    if (!toMp3(Buffer.concat([wavHeader(pcm.length), pcm]), outMp3)) { console.log('mp3 失败,跳过'); continue; }
    c.audioUrl = `/audio/blog/comments/${post.slug}-c${i}.mp3`;
    wrote++;
    console.log(`✓ ${r2(bytesToSec(pcm.length))}s`);
  }
  if (wrote > 0) {
    await db.execute({
      sql: `UPDATE blog_posts SET content_json = ? WHERE slug = ?`,
      args: [JSON.stringify(post.content), post.slug],
    });
  }
  return { count: wrote };
}

async function main() {
  const posts = await loadPosts();
  if (posts.length === 0) fail(`没匹配到帖子(slug=${ONLY_SLUG} kind=${ONLY_KIND} author=${ONLY_AUTHOR})`);
  const mode = PRERECORD_COMMENTS ? '评论预录' : TIMINGS_ONLY ? '逐句时间戳' : '整段语音条';
  const sents = posts.reduce((a, p) => a + p.kos.filter(Boolean).length, 0);
  const commentChars = posts.reduce((a, p) => a + (p.content.comments || []).reduce((s, c) => s + cleanForTTS(String(c.ko || '')).length, 0), 0);
  const sentChars = posts.reduce((a, p) => a + p.kos.reduce((s, k) => s + k.length, 0), 0);
  const chars = PRERECORD_COMMENTS ? commentChars : sentChars;
  console.log(`\n📱 博客语音[${mode}] —— ${posts.length} 帖 / ${PRERECORD_COMMENTS ? posts.reduce((a, p) => a + (p.content.comments || []).length, 0) + ' 条评论' : sents + ' 句'} / ${chars} 字符${DRY ? '（--dry-run 不合成）' : ''}${FORCE ? '（--force 重生）' : ''}`);
  if (DRY) {
    const byKind = {};
    for (const p of posts) {
      byKind[p.authorKind] = (byKind[p.authorKind] || 0) + 1;
      if (ONLY_SLUG || ONLY_AUTHOR) {
        const v = voiceFor(p.authorId, p.authorKind);
        console.log(`  ${p.slug} (${p.authorId}): ${p.kos.filter(Boolean).length} 句 / ${(p.content.comments || []).length} 评论 → ${v}`);
      }
    }
    console.log('  分布:', JSON.stringify(byKind));
    console.log(`  约 ${chars} 字符待合成。`);
    return;
  }
  const failed = [];
  const reupload = [];
  let done = 0;
  let commentCount = 0;
  for (const post of posts) {
    try {
      if (PRERECORD_COMMENTS) {
        const r = await prerecordComments(post);
        commentCount += r.count;
      } else {
        const r = await generate(post);
        if (r && r.needsReupload) reupload.push(post.slug);
      }
      done++;
    } catch (e) {
      console.log(`\n  ❌ ${post.slug} 失败: ${e.message}（继续下一帖，重跑可补）`);
      failed.push(post.slug);
    }
  }
  if (failed.length) console.log(`\n⚠️ ${failed.length} 帖失败: ${failed.join(', ')}。重跑会自动补。`);
  if (reupload.length) {
    console.log(`\n🚚 ${reupload.length} 帖 mp3 已重生（时间戳与旧音频不匹配），部署时需重传这些 mp3:\n  ${reupload.join(', ')}`);
  }
  if (PRERECORD_COMMENTS) {
    console.log(`\n✅ 完成 ${done}/${posts.length} 帖，共预录 ${commentCount} 条评论语音 → ${COMMENTS_DIR}\n`);
  } else {
    console.log(`\n✅ 完成 ${done}/${posts.length} 帖${TIMINGS_ONLY ? '（时间戳已写 DB）' : `，mp3 在 ${AUDIO_DIR}`}。\n`);
  }
}
main().catch(e => fail(e.message));
