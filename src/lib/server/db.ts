import { createClient, type Client } from '@libsql/client';
import path from 'path';
import { mkdirSync } from 'fs';
import { cached, clearCache } from '@/lib/cache';

let client: Client | null = null;
let initialized = false;
let initPromise: Promise<void> | null = null;
let isReplicaMode = false;
let replicaFailed = false;

function getClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const localDbDir = path.resolve(process.cwd(), 'data');
  const localDbPath = path.resolve(localDbDir, 'app.db');
  const localReplicaPath = path.resolve(localDbDir, 'app-replica.db');

  mkdirSync(localDbDir, { recursive: true });

  if (url) {
    // 1) 尝试 Embedded Replica（本地读 <1ms，云端写），失败过一次就跳过
    if (!replicaFailed) {
      try {
        client = createClient({
          url: `file:${localReplicaPath}`,
          syncUrl: url,
          authToken: process.env.TURSO_AUTH_TOKEN,
        });
        isReplicaMode = true;
        console.log('[db] Embedded replica mode, remote:', url);
        return client;
      } catch (err) {
        console.error('[db] Embedded replica create failed:', err);
        client = null;
        isReplicaMode = false;
        replicaFailed = true;
      }
    }

    // 2) 降级：直接连 Turso 云端
    console.log('[db] Direct remote mode');
    try {
      client = createClient({
        url,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
      isReplicaMode = false;
      return client;
    } catch (err) {
      console.error('[db] Direct remote create failed:', err);
      client = null;
      throw err;
    }
  } else {
    // 纯本地模式（开发环境）
    const dbUrl = `file:${localDbPath}`;
    console.log('[db] Local-only mode:', dbUrl);
    client = createClient({ url: dbUrl });
    return client;
  }
}

// 启动时对本地 SQLite 做一次完整性校验（PRAGMA integrity_check）。
// 只跑一次；只对本地 file: 库（跳过 direct-remote 云端，避免无谓查询）；
// 损坏时打印全部错误行，不阻断启动（让备份恢复流程接管）。
let integrityChecked = false;
async function checkIntegrityOnce(c: Client): Promise<void> {
  if (integrityChecked) return;
  integrityChecked = true;
  // direct-remote Turso 无需本地完整性校验（云端由 Turso 保证）
  const hasLocalFile = isReplicaMode || !process.env.TURSO_DATABASE_URL;
  if (!hasLocalFile) return;
  try {
    const res = await c.execute('PRAGMA integrity_check');
    // 每行只有一列（列名 'integrity_check'）；ok 时单行 'ok'，损坏时多行详细错误
    const messages = res.rows
      .map((row) => Object.values(row as Record<string, unknown>)[0])
      .filter((v) => v != null)
      .map(String);
    const allOk = messages.length === 1 && messages[0] === 'ok';
    if (allOk) {
      console.log('[db] Integrity check ok');
    } else {
      console.error('[db] ⚠️  Integrity check FAILED — database may be corrupt:');
      for (const msg of messages) console.error('  -', msg);
      console.error('[db] Restore from /www/backup/torikorean/ or the local backup');
    }
  } catch (err) {
    console.error('[db] Integrity check errored:', err);
  }
}

let syncTimer: ReturnType<typeof setInterval> | null = null;

export async function syncReplica() {
  if (!isReplicaMode) return;
  const c = getClient();
  try {
    await c.sync();
    console.log('[db] Replica synced');
  } catch (err) {
    console.error('[db] Replica sync failed:', err);
  }
}

// 首次启动同步，之后每 60 秒同步一次
export function startReplicaSync() {
  if (syncTimer || !isReplicaMode) return;
  syncReplica();
  syncTimer = setInterval(syncReplica, 60_000);
}

export interface Db {
  exec: (sql: string, params?: unknown[]) => Promise<Array<{ columns: string[]; values: unknown[][] }>>;
  run: (sql: string, params?: unknown[]) => Promise<{ rowsAffected: number }>;
  batch: (statements: { sql: string; args: unknown[] }[]) => Promise<void>;
}

// 把 exec() 结果按列名映射成对象数组，避免 row[数字] 位置下标——
// SELECT 列顺序一变，位置下标就静默取错值（尤其鉴权字段=越权隐患）。
export function rowsToObjects(
  result: Array<{ columns: string[]; values: unknown[][] }>
): Record<string, unknown>[] {
  const first = result[0];
  if (!first) return [];
  return first.values.map((row) =>
    Object.fromEntries(first.columns.map((col, i) => [col, row[i]]))
  );
}

export async function getDb(): Promise<Db> {
  const c = getClient();
  if (isReplicaMode && !syncTimer) startReplicaSync();

  if (!initialized) {
    if (!initPromise) {
      initPromise = (async () => {
        try {
        await checkIntegrityOnce(c);
        await c.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      nickname TEXT DEFAULT '',
      email TEXT DEFAULT '',
      role TEXT DEFAULT 'user',
      onboarding_completed INTEGER DEFAULT 0,
      korean_level TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);

  // Migrations for older databases
  // onboarding_completed is a boolean flag (0/1), korean_level is a text label
  try { await c.execute(`ALTER TABLE users ADD COLUMN onboarding_completed INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN korean_level TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN last_login_at INTEGER`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN avatar_url TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN invite_code TEXT DEFAULT ''`); } catch { /* already exists */ }

  await c.execute(`
    CREATE TABLE IF NOT EXISTS study_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT DEFAULT '',
      xp_earned INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE INDEX IF NOT EXISTS idx_study_logs_created_at ON study_logs(created_at)
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS page_views (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      path TEXT NOT NULL,
      referrer TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS ai_usage (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT 'gpt-4o-mini',
      endpoint TEXT NOT NULL,
      prompt_tokens INTEGER DEFAULT 0,
      completion_tokens INTEGER DEFAULT 0,
      cost REAL DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at)
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id TEXT PRIMARY KEY,
      ip TEXT NOT NULL,
      attempted_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await c.execute(`
    CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_at ON login_attempts(ip, attempted_at)
  `);

  // 通用 key-value 配置表（JSON 值）。首个用途：会员权益矩阵覆盖值
  await c.execute(`
    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER
    )
  `);

  // 会员订单（Phase 1：后台手动开通即写一条 source='manual'，无真支付网关）
  // amount 单位分；tier 为购买档位；expiry 为该订单开通后的到期时间戳（lifetime 为 NULL）
  await c.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      tier TEXT NOT NULL,
      amount INTEGER NOT NULL DEFAULT 0,
      source TEXT NOT NULL DEFAULT 'manual',
      note TEXT DEFAULT '',
      expiry INTEGER,
      operator TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC)`);

  // Stripe 订阅（海外站自动续费）。月/年付为 subscription 模式，永久仍为一次性 payment。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      stripe_subscription_id TEXT NOT NULL UNIQUE,
      stripe_customer_id TEXT NOT NULL,
      tier TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      current_period_end INTEGER,
      cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id)`);

  // 永久档履约（周边邮寄 / 产品共建 / VIP 通道等实体权益的登记与状态跟踪）
  // status: 'pending'|'in_progress'|'done'；perk_type: 'merch'|'devservice'|'vip' 等
  await c.execute(`
    CREATE TABLE IF NOT EXISTS lifetime_perks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      perk_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      detail TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_lifetime_perks_user ON lifetime_perks(user_id)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_lifetime_perks_status ON lifetime_perks(status)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      path TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'content_error',
      message TEXT NOT NULL,
      metadata TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // ── User data tables (cloud sync) ──

  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_words (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      pronunciation TEXT DEFAULT '',
      meaning TEXT NOT NULL,
      part_of_speech TEXT DEFAULT '',
      examples TEXT DEFAULT '[]',
      source_entry_id TEXT,
      source_video_id TEXT,
      source_subtitle_id TEXT,
      mastery TEXT DEFAULT 'new',
      srs_level INTEGER DEFAULT 0,
      next_review INTEGER DEFAULT 0,
      ease_factor REAL DEFAULT 2.5,
      "interval" INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      last_reviewed INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_words_user ON user_words(user_id)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_words_next_review ON user_words(user_id, next_review)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS review_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date INTEGER NOT NULL,
      words_reviewed INTEGER DEFAULT 0,
      words_passed INTEGER DEFAULT 0,
      duration INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_review_sessions_user ON review_sessions(user_id, date)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS dictation_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word_id TEXT NOT NULL,
      meaning TEXT DEFAULT '',
      date INTEGER NOT NULL,
      correct INTEGER DEFAULT 0,
      user_input TEXT DEFAULT '',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_dictation_records_user ON dictation_records(user_id, date)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS shadowing_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      subtitle_id TEXT NOT NULL,
      date INTEGER NOT NULL,
      score INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      nickname TEXT DEFAULT '学习者',
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      xp_to_next_level INTEGER DEFAULT 150,
      streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_study_date INTEGER DEFAULT 0,
      target_level TEXT DEFAULT 'beginner',
      daily_goal_minutes INTEGER DEFAULT 15,
      daily_goal_words INTEGER DEFAULT 10,
      current_unit INTEGER DEFAULT 1,
      onboarding_complete INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS daily_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date INTEGER NOT NULL,
      words_learned INTEGER DEFAULT 0,
      words_reviewed INTEGER DEFAULT 0,
      dictations_done INTEGER DEFAULT 0,
      shadowing_done INTEGER DEFAULT 0,
      minutes_studied INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_daily_logs_user ON daily_logs(user_id, date)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      earned_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS app_settings (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      daily_word_goal INTEGER DEFAULT 20,
      review_batch_size INTEGER DEFAULT 10,
      default_playback_rate REAL DEFAULT 1,
      theme TEXT DEFAULT 'dark',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS word_books (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      word_ids TEXT DEFAULT '[]',
      color TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_word_books_user ON word_books(user_id)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS study_videos (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      url TEXT NOT NULL,
      platform TEXT DEFAULT 'youtube',
      platform_id TEXT DEFAULT '',
      title TEXT DEFAULT '',
      thumbnail TEXT,
      subtitle_source TEXT DEFAULT 'manual',
      added_at INTEGER NOT NULL,
      last_studied_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS study_subtitles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      video_id TEXT NOT NULL,
      "index" INTEGER NOT NULL,
      start REAL NOT NULL,
      "end" REAL NOT NULL,
      text TEXT NOT NULL,
      text_zh TEXT DEFAULT '',
      tokens TEXT DEFAULT '',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_study_subtitles_video ON study_subtitles(user_id, video_id)`);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS video_study_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      video_id TEXT NOT NULL,
      date INTEGER NOT NULL,
      duration_sec INTEGER DEFAULT 0,
      words_added TEXT DEFAULT '[]',
      sentences_looped INTEGER DEFAULT 0,
      action TEXT DEFAULT '',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // ── Announcements / Inbox ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'announcement',
      target_user_id TEXT,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (target_user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_announcements_created ON announcements(created_at DESC)`);
  // Migration: add is_active for popup withdraw feature (老库补列)
  try { await c.execute(`ALTER TABLE announcements ADD COLUMN is_active INTEGER DEFAULT 1`); } catch { /* already exists */ }

  await c.execute(`
    CREATE TABLE IF NOT EXISTS announcement_reads (
      id TEXT PRIMARY KEY,
      announcement_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      read_at INTEGER NOT NULL,
      FOREIGN KEY (announcement_id) REFERENCES announcements(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_announcement_reads_user ON announcement_reads(user_id, announcement_id)`);

  // ── New tables for stickers, buddy, achievements, ambassador ──

  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      achievement_type TEXT NOT NULL,
      achieved_at INTEGER NOT NULL,
      is_card_generated INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_share_links (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL,
      expires_at INTEGER,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS sticker_packs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      published_at INTEGER,
      is_active INTEGER DEFAULT 1
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS stickers (
      id TEXT PRIMARY KEY,
      pack_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      caption_zh TEXT DEFAULT '',
      caption_ko TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (pack_id) REFERENCES sticker_packs(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS sticker_downloads (
      id TEXT PRIMARY KEY,
      pack_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      downloaded_at INTEGER NOT NULL,
      FOREIGN KEY (pack_id) REFERENCES sticker_packs(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS buddy_relations (
      id TEXT PRIMARY KEY,
      user_a_id TEXT NOT NULL,
      user_b_id TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_a_id) REFERENCES users(id),
      FOREIGN KEY (user_b_id) REFERENCES users(id)
    )
  `);

  await c.execute(`
    CREATE TABLE IF NOT EXISTS buddy_invites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      invite_token TEXT NOT NULL,
      learning_goal TEXT DEFAULT '',
      level TEXT DEFAULT '',
      daily_minutes INTEGER DEFAULT 15,
      intro TEXT DEFAULT '',
      expires_at INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // ── Migrations for older user_profiles ──
  try { await c.execute(`ALTER TABLE user_profiles ADD COLUMN is_ambassador INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_profiles ADD COLUMN ambassador_since INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_profiles ADD COLUMN ambassador_reason TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_profiles ADD COLUMN share_enabled INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_profiles ADD COLUMN share_token TEXT DEFAULT ''`); } catch { /* already exists */ }

  // ── User table field migrations ──
  try { await c.execute(`ALTER TABLE users ADD COLUMN email_verified_at INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN phone TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN phone_verified_at INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN last_login_at INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'`); } catch { /* already exists */ }
  // 会员档位：'free'|'monthly'|'yearly'|'lifetime'；到期时间戳（ms），lifetime/free 为 NULL
  try { await c.execute(`ALTER TABLE users ADD COLUMN membership_type TEXT DEFAULT 'free'`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE users ADD COLUMN membership_expiry INTEGER`); } catch { /* already exists */ }

  // 会员订单支付框架（Phase 2）。旧手动订单无这些列 → 默认 status='paid'，收入统计/历史不变
  try { await c.execute(`ALTER TABLE orders ADD COLUMN status TEXT NOT NULL DEFAULT 'paid'`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE orders ADD COLUMN channel TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE orders ADD COLUMN out_trade_no TEXT`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE orders ADD COLUMN paid_at INTEGER`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE orders ADD COLUMN raw_callback TEXT DEFAULT ''`); } catch { /* already exists */ }
  // 币种：'CNY'|'USD'。旧订单全为上海¥站，默认 CNY；海外站新订单写入时显式传 USD 覆盖。
  try { await c.execute(`ALTER TABLE orders ADD COLUMN currency TEXT NOT NULL DEFAULT 'CNY'`); } catch { /* already exists */ }
  try { await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_out_trade_no ON orders(out_trade_no)`); } catch { /* already exists */ }
  try { await c.execute(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at DESC)`); } catch { /* already exists */ }

  // Migration: add meaning to dictation_records
  try { await c.execute(`ALTER TABLE dictation_records ADD COLUMN meaning TEXT DEFAULT ''`); } catch { /* already exists */ }

  // Migration: add source / source_detail to user_words
	  try { await c.execute(`ALTER TABLE user_words ADD COLUMN source TEXT DEFAULT ''`); } catch { /* already exists */ }
	  try { await c.execute(`ALTER TABLE user_words ADD COLUMN source_detail TEXT DEFAULT ''`); } catch { /* already exists */ }

	  // ── User sentences ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_sentences (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      korean TEXT NOT NULL,
      chinese TEXT DEFAULT '',
      source_type TEXT DEFAULT 'manual',
      source_id TEXT,
      note TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_sentences_user ON user_sentences(user_id)`);

  // ── User articles ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_articles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      original_text TEXT DEFAULT '',
      translated_text TEXT DEFAULT '',
      source_type TEXT DEFAULT 'manual',
      source_url TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_articles_user ON user_articles(user_id)`);

  // ── User notes ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_notes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT DEFAULT '',
      source_type TEXT DEFAULT '',
      source_id TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_notes_user ON user_notes(user_id)`);

  // ── User recordings ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_recordings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'pronunciation',
      source_id TEXT,
      line_id TEXT,
      audio_url TEXT NOT NULL,
      duration_ms INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_recordings_user ON user_recordings(user_id)`);

  // Migration: add updated_at if missing
  try { await c.execute(`ALTER TABLE user_recordings ADD COLUMN updated_at INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_recordings ADD COLUMN korean TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_recordings ADD COLUMN audio_data TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_recordings ADD COLUMN source_type TEXT DEFAULT ''`); } catch { /* already exists */ }

  // Migration: add tracking columns to user_sentences
  try { await c.execute(`ALTER TABLE user_sentences ADD COLUMN source_title TEXT DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_sentences ADD COLUMN start_time REAL DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_sentences ADD COLUMN end_time REAL DEFAULT 0`); } catch { /* already exists */ }

  // ── User KPOP progress ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_kpop_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      song_id TEXT NOT NULL,
      current_line_index INTEGER DEFAULT 0,
      practiced_lines TEXT DEFAULT '[]',
      completed_lines TEXT DEFAULT '[]',
      total_lines INTEGER DEFAULT 0,
      total_recordings INTEGER DEFAULT 0,
      total_practice_seconds INTEGER DEFAULT 0,
      last_practiced_at INTEGER DEFAULT 0,
      status TEXT DEFAULT 'not_started',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_kpop_progress_user ON user_kpop_progress(user_id, song_id)`);

  // Migration: add total_lines if missing
  try { await c.execute(`ALTER TABLE user_kpop_progress ADD COLUMN total_lines INTEGER DEFAULT 0`); } catch { /* already exists */ }

  // ── User diary ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS user_diary (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT DEFAULT '',
      content TEXT NOT NULL,
      mood TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_diary_user ON user_diary(user_id)`);

	  // ── KPOP lyric sessions ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_lyric_sessions (
	      id TEXT PRIMARY KEY,
	      user_id TEXT NOT NULL,
	      song_id TEXT NOT NULL,
	      total_lines INTEGER NOT NULL DEFAULT 0,
	      practiced_lines INTEGER NOT NULL DEFAULT 0,
	      completed_lines INTEGER NOT NULL DEFAULT 0,
	      current_line_index INTEGER DEFAULT 0,
	      last_practiced_at INTEGER,
	      total_practice_seconds INTEGER DEFAULT 0,
	      status TEXT DEFAULT 'not_started',
	      created_at INTEGER NOT NULL,
	      updated_at INTEGER NOT NULL,
	      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	      UNIQUE(user_id, song_id)
	    )
	  `);
	  await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_lyric_sessions_user ON kpop_lyric_sessions(user_id, song_id)`);

	  // ── KPOP line progress ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_line_progress (
	      id TEXT PRIMARY KEY,
	      user_id TEXT NOT NULL,
	      song_id TEXT NOT NULL,
	      line_index INTEGER NOT NULL,
	      status TEXT DEFAULT 'untouched',
	      practiced_count INTEGER DEFAULT 0,
	      last_practiced_at INTEGER,
	      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	      UNIQUE(user_id, song_id, line_index)
	    )
	  `);
	  await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_line_progress_user ON kpop_line_progress(user_id, song_id)`);

	  // ── KPOP recordings ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_recordings (
	      id TEXT PRIMARY KEY,
	      user_id TEXT NOT NULL,
	      song_id TEXT NOT NULL,
	      line_id TEXT NOT NULL,
	      line_index INTEGER NOT NULL,
	      recording_url TEXT,
	      duration_ms INTEGER DEFAULT 0,
	      attempt_index INTEGER DEFAULT 1,
	      user_note TEXT,
	      created_at INTEGER NOT NULL,
	      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	    )
	  `);
	  await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_recordings_user ON kpop_recordings(user_id, song_id, line_index)`);

	  // ── KPOP hot posts ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_hot_posts (
	      id TEXT PRIMARY KEY,
	      title_zh TEXT NOT NULL,
	      title_ko TEXT,
	      summary_zh TEXT,
	      category TEXT DEFAULT 'general',
	      image_url TEXT,
	      source_url TEXT,
	      source_name TEXT,
	      artists TEXT DEFAULT '[]',
	      groups TEXT DEFAULT '[]',
	      tags TEXT DEFAULT '[]',
	      hot_score INTEGER DEFAULT 0,
	      learning_score INTEGER DEFAULT 0,
	      published_at INTEGER,
	      fetched_at INTEGER,
	      created_at INTEGER NOT NULL,
	      is_published INTEGER DEFAULT 1
	    )
	  `);

	  // ── KPOP import jobs ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_import_jobs (
	      id TEXT PRIMARY KEY,
	      user_id TEXT NOT NULL,
	      url TEXT NOT NULL,
	      status TEXT DEFAULT 'queued',
	      track_id TEXT,
	      title TEXT DEFAULT '',
	      error TEXT,
	      created_at INTEGER NOT NULL,
	      updated_at INTEGER NOT NULL,
	      FOREIGN KEY (user_id) REFERENCES users(id)
	    )
	  `);
	  await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_import_jobs_user ON kpop_import_jobs(user_id)`);

	  // ── KPOP hot sentences ──
	  await c.execute(`
	    CREATE TABLE IF NOT EXISTS kpop_hot_sentences (
	      id TEXT PRIMARY KEY,
	      post_id TEXT NOT NULL,
	      sort_index INTEGER NOT NULL DEFAULT 0,
	      korean TEXT NOT NULL,
	      chinese TEXT NOT NULL,
	      breakdown TEXT DEFAULT '[]',
	      expression_note TEXT,
	      reusable_expression TEXT,
	      audio_url TEXT,
	      FOREIGN KEY (post_id) REFERENCES kpop_hot_posts(id) ON DELETE CASCADE
	    )
	  `);
	  await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_hot_sentences_post ON kpop_hot_sentences(post_id)`);

	      // Kpop track calibration
	      await c.execute(`
	        CREATE TABLE IF NOT EXISTS kpop_track_calibration (
	          id TEXT PRIMARY KEY,
	          song_id TEXT NOT NULL UNIQUE,
	          timing_offset_ms INTEGER NOT NULL DEFAULT 0,
	          timing_verified INTEGER NOT NULL DEFAULT 0,
	          timing_source TEXT DEFAULT 'manual',
	          created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
	          updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
	        )
	      `);
	      await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_calibration_song ON kpop_track_calibration(song_id)`);

      // Kpop line calibration — per-line timing adjustments
      await c.execute(`
        CREATE TABLE IF NOT EXISTS kpop_line_calibration (
          id TEXT PRIMARY KEY,
          song_id TEXT NOT NULL,
          line_index INTEGER NOT NULL,
          start_offset_ms INTEGER NOT NULL DEFAULT 0,
          end_offset_ms INTEGER NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
          UNIQUE(song_id, line_index)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_kpop_line_cal_song ON kpop_line_calibration(song_id)`);

      // ── Pronunciation attempts ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_pronunciation_attempts (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          item_id TEXT NOT NULL,
          duration_ms INTEGER NOT NULL DEFAULT 0,
          score REAL,
          feedback TEXT,
          created_at INTEGER NOT NULL DEFAULT (unixepoch()),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_pronunciation_attempts_user ON user_pronunciation_attempts(user_id)`);

      // ── Lesson mastery (30-day course) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS lesson_mastery (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          day_num INTEGER NOT NULL,
          item_type TEXT NOT NULL,
          item_idx INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          seen_count INTEGER DEFAULT 0,
          correct_count INTEGER DEFAULT 0,
          wrong_count INTEGER DEFAULT 0,
          last_seen_at INTEGER,
          next_review_at INTEGER,
          interval INTEGER DEFAULT 0,
          ease REAL DEFAULT 2.5,
          source TEXT DEFAULT '',
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_lesson_mastery_user ON lesson_mastery(user_id)`);

      // ── Phonetic mistakes（音标错题本，混淆对粒度） ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS phonetic_mistakes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          target_jamo TEXT NOT NULL,
          wrong_jamo TEXT NOT NULL,
          stage INTEGER NOT NULL,
          wrong_count INTEGER DEFAULT 1,
          last_wrong_at INTEGER NOT NULL,
          resolved INTEGER DEFAULT 0,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_phonetic_mistakes_user ON phonetic_mistakes(user_id)`);
      await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_phonetic_mistakes_pair ON phonetic_mistakes(user_id, target_jamo, wrong_jamo)`);

      // ── Phonetic SRS（音标 SRS，字母级） ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS phonetic_srs (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          jamo TEXT NOT NULL,
          stage INTEGER NOT NULL,
          srs_level INTEGER DEFAULT 0,
          ease_factor REAL DEFAULT 2.5,
          interval REAL DEFAULT 0,
          next_review_at INTEGER NOT NULL,
          seen_count INTEGER DEFAULT 0,
          correct_count INTEGER DEFAULT 0,
          wrong_count INTEGER DEFAULT 0,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_phonetic_srs_user ON phonetic_srs(user_id)`);
      await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_phonetic_srs_jamo ON phonetic_srs(user_id, jamo)`);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_phonetic_srs_due ON phonetic_srs(user_id, next_review_at)`);

      // ── Learning events (30-day course) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS learning_events (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          day_num INTEGER NOT NULL,
          card_type TEXT NOT NULL,
          action TEXT NOT NULL,
          detail TEXT DEFAULT '',
          timestamp INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_learning_events_user ON learning_events(user_id)`);

      // ── Grammar states ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_grammar_states (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          status TEXT DEFAULT 'new',
          seen_count INTEGER DEFAULT 0,
          correct_count INTEGER DEFAULT 0,
          wrong_count INTEGER DEFAULT 0,
          last_seen_at INTEGER,
          next_review_at INTEGER,
          source TEXT,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_grammar_states_user ON user_grammar_states(user_id)`);

      // ── User phonetic step completion (40 音 progressive) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_phonetic_steps (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          completed_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_phonetic_steps_user ON user_phonetic_steps(user_id)`);

      // ── Grammar favorites (star toggle) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_grammar_favorites (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_grammar_favorites_user ON user_grammar_favorites(user_id)`);

      // ── Typing pack progress ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS typing_pack_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          completed_at INTEGER NOT NULL,
          best_wpm INTEGER DEFAULT 0,
          best_accuracy INTEGER DEFAULT 0,
          practice_count INTEGER DEFAULT 0,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_typing_pack_user ON typing_pack_progress(user_id)`);

      // ── Typing mastery (per item streak) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS typing_mastery (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          theme_id TEXT NOT NULL,
          item_key TEXT NOT NULL,
          streak INTEGER DEFAULT 0,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_typing_mastery_user_theme ON typing_mastery(user_id, theme_id)`);

      // ── Writing history ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS writing_history (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          date TEXT,
          mode TEXT,
          mode_label TEXT,
          score TEXT,
          snippet TEXT,
          details_json TEXT,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_writing_history_user ON writing_history(user_id, created_at)`);

      // ── AI analyze history ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS ai_analyze_history (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          timestamp INTEGER NOT NULL,
          original TEXT,
          full_translation TEXT,
          result_json TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_ai_analyze_history_user ON ai_analyze_history(user_id, timestamp)`);

      // ── Vocab last visited unit (single-row per user) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_vocab_last_visit (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          source TEXT,
          unit_id TEXT,
          unit_title TEXT,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      // ── Idiom / expression "added to study" marks ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_expression_added (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_expression_added_user ON user_expression_added(user_id)`);

      // ── One-off migration: P13/P14 拆分 + P15-P22→P17-P24 重编号（2026-07） ──
      await c.execute(`CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at INTEGER NOT NULL)`);
      const migId = 'grammar-p13-p14-split-2026-07';
      const applied = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId] });
      if (applied.rows.length === 0) {
        const idMap: Record<string, string> = {
          // 老 P13 L11(综合①) → 新 P13 L05
          'card-p13-l11': 'card-p13-l05',
          // 老 P13 L5-L10 → 新 P14 L1-L6
          'card-p13-l05': 'card-p14-l01',
          'card-p13-l06': 'card-p14-l02',
          'card-p13-l07': 'card-p14-l03',
          'card-p13-l08': 'card-p14-l04',
          'card-p13-l09': 'card-p14-l05',
          'card-p13-l10': 'card-p14-l06',
          // 老 P13 L12(综合②) → 新 P14 L07
          'card-p13-l12': 'card-p14-l07',
          // 老 P14 L1-L4 → 新 P15 L1-L4
          'card-p14-l01': 'card-p15-l01',
          'card-p14-l02': 'card-p15-l02',
          'card-p14-l03': 'card-p15-l03',
          'card-p14-l04': 'card-p15-l04',
          // 老 P14 L09 → 新 P15 L05
          'card-p14-l09': 'card-p15-l05',
          // 老 P14 L11(综合①) → 新 P15 L06
          'card-p14-l11': 'card-p15-l06',
          // 老 P14 L5-L8 → 新 P16 L1-L4
          'card-p14-l05': 'card-p16-l01',
          'card-p14-l06': 'card-p16-l02',
          'card-p14-l07': 'card-p16-l03',
          'card-p14-l08': 'card-p16-l04',
          // 老 P14 L10 → 新 P16 L05
          'card-p14-l10': 'card-p16-l05',
          // 老 P14 L12(综合②) → 新 P16 L06
          'card-p14-l12': 'card-p16-l06',
        };
        // 老 P15-P22 → 新 P17-P24（course number 不变）
        for (let oldP = 15; oldP <= 22; oldP++) {
          const newP = oldP + 2;
          for (let l = 1; l <= 12; l++) {
            const ll = String(l).padStart(2, '0');
            idMap[`card-p${oldP}-l${ll}`] = `card-p${newP}-l${ll}`;
          }
        }
        // 按"目标不冲突"顺序：先做 P15-P22→P17-P24（新 id 完全独立），再做 P14→P15/P16（会占用新 P15/P16 空间，但那时 P15-P22 已迁走），最后做 P13 内部/→P14。
        // 用两阶段更新避免主键冲突：先把老 id 前缀改为临时前缀，再改成新 id。
        for (const [oldId, newId] of Object.entries(idMap)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [`__mig_tmp__${newId}`, oldId],
          });
        }
        for (const newId of Object.values(idMap)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [newId, `__mig_tmp__${newId}`],
          });
        }
        // 清理未能迁移的临时行（新 id 主键已被占用等）
        await c.execute(`DELETE FROM user_grammar_states WHERE id LIKE '__mig_tmp__%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId, Date.now()],
        });
      }

      // ── One-off migration: 插入 P13(被动)/P14(使动)，老 P13-P25 → P15-P27（2026-07 第二次） ──
      const migId2 = 'grammar-p13-p14-passive-causative-2026-07';
      const applied2 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId2] });
      if (applied2.rows.length === 0) {
        const idMap2: Record<string, string> = {};
        // p13 → p15, p14 → p16, ..., p25 → p27 (each Part shift +2)
        // 老 P13 has 5 lessons, 老 P14 has 7 lessons, 老 P15-P22 each 9 lessons, 老 P23 8, 老 P24 9, 老 P25 9
        // 全部按 lXX 原样保留
        const oldLessonCounts: Record<number, number> = {
          13: 5, 14: 7, 15: 6, 16: 6, 17: 9, 18: 9, 19: 9, 20: 9, 21: 9, 22: 9, 23: 9, 24: 9, 25: 9,
        };
        for (let oldPart = 13; oldPart <= 25; oldPart++) {
          const newPart = oldPart + 2;
          const count = oldLessonCounts[oldPart] ?? 9;
          for (let l = 1; l <= count; l++) {
            const lp = String(l).padStart(2, '0');
            idMap2[`card-p${oldPart}-l${lp}`] = `card-p${newPart}-l${lp}`;
          }
        }
        // 两阶段更新避免主键冲突
        for (const [oldId, newId] of Object.entries(idMap2)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [`__mig2_tmp__${newId}`, oldId],
          });
        }
        for (const newId of Object.values(idMap2)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [newId, `__mig2_tmp__${newId}`],
          });
        }
        await c.execute(`DELETE FROM user_grammar_states WHERE id LIKE '__mig2_tmp__%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId2, Date.now()],
        });
      }

      // ── One-off migration: 插入 P15(敬语)，老 P15-P28 → P16-P29（2026-07 第三次） ──
      const migId3 = 'grammar-p15-honorifics-2026-07';
      const applied3 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId3] });
      if (applied3.rows.length === 0) {
        const idMap3: Record<string, string> = {};
        // 老 P15 5课 / 老 P16 7课 / 老 P17-P28 每部 9 课
        const oldLessonCounts3: Record<number, number> = {
          15: 5, 16: 7, 17: 9, 18: 9, 19: 9, 20: 9, 21: 9, 22: 9, 23: 9, 24: 9, 25: 9, 26: 9, 27: 9, 28: 9,
        };
        for (let oldPart = 15; oldPart <= 28; oldPart++) {
          const newPart = oldPart + 1;
          const count = oldLessonCounts3[oldPart] ?? 9;
          for (let l = 1; l <= count; l++) {
            const lp = String(l).padStart(2, '0');
            idMap3[`card-p${oldPart}-l${lp}`] = `card-p${newPart}-l${lp}`;
          }
        }
        for (const [oldId, newId] of Object.entries(idMap3)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [`__mig3_tmp__${newId}`, oldId],
          });
        }
        for (const newId of Object.values(idMap3)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [newId, `__mig3_tmp__${newId}`],
          });
        }
        await c.execute(`DELETE FROM user_grammar_states WHERE id LIKE '__mig3_tmp__%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId3, Date.now()],
        });
      }

      // ── One-off migration: 插入 P16(拟声拟态)，老 P16-P29 → P17-P30（2026-07 第四次） ──
      const migId4 = 'grammar-p16-onomatopoeia-2026-07';
      const applied4 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId4] });
      if (applied4.rows.length === 0) {
        const idMap4: Record<string, string> = {};
        // 老 P16 5课（程度、路径与目的）/ 老 P17 7课 / 老 P18-P29 每部 9 课
        const oldLessonCounts4: Record<number, number> = {
          16: 5, 17: 7, 18: 9, 19: 9, 20: 9, 21: 9, 22: 9, 23: 9, 24: 9, 25: 9, 26: 9, 27: 9, 28: 9, 29: 9,
        };
        for (let oldPart = 16; oldPart <= 29; oldPart++) {
          const newPart = oldPart + 1;
          const count = oldLessonCounts4[oldPart] ?? 9;
          for (let l = 1; l <= count; l++) {
            const lp = String(l).padStart(2, '0');
            idMap4[`card-p${oldPart}-l${lp}`] = `card-p${newPart}-l${lp}`;
          }
        }
        for (const [oldId, newId] of Object.entries(idMap4)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [`__mig4_tmp__${newId}`, oldId],
          });
        }
        for (const newId of Object.values(idMap4)) {
          await c.execute({
            sql: `UPDATE OR IGNORE user_grammar_states SET id = ? WHERE id = ?`,
            args: [newId, `__mig4_tmp__${newId}`],
          });
        }
        await c.execute(`DELETE FROM user_grammar_states WHERE id LIKE '__mig4_tmp__%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId4, Date.now()],
        });
      }

      // ── grammar-user-scope-prefix: 修 user_grammar_states 主键串号 ──
      // 原 pk 为全局 id（card-p1-l01），多用户共享一行 → 第 2+ 用户写入 PK 冲突静默失败。
      // 迁移到 ${user_id}:${id} 形式，与 words/typingMastery 等表一致（USER_OWNED_DETERMINISTIC_TABLES）。
      const migId5 = 'grammar-user-scope-prefix-2026-07';
      const applied5 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId5] });
      if (applied5.rows.length === 0) {
        // 直接 UPDATE：因为老数据一个 id 只对应一行，加了前缀就不会冲突。
        await c.execute(`UPDATE user_grammar_states SET id = user_id || ':' || id WHERE id NOT LIKE '%:%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId5, Date.now()],
        });
      }

      // ── Article progress ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_article_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          article_id TEXT NOT NULL,
          status TEXT DEFAULT 'not_started',
          read_sentence_ids TEXT DEFAULT '[]',
          saved_sentence_ids TEXT DEFAULT '[]',
          saved_word_ids TEXT DEFAULT '[]',
          quiz_score INTEGER,
          quiz_answers TEXT DEFAULT '{}',
          output_answer TEXT,
          output_score INTEGER,
          completed_at INTEGER,
          last_read_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_article_progress_user ON user_article_progress(user_id)`);
      try { await c.execute(`ALTER TABLE user_article_progress ADD COLUMN output_score INTEGER`); } catch { /* already exists */ }

      // ── article-progress-user-scope-prefix: 修 user_article_progress 主键串号 ──
      // 原 pk 直接用 article.id（reading/[id]/page.tsx put({ id: article.id })），多用户共享一行。
      const migId6 = 'article-progress-user-scope-prefix-2026-07';
      const applied6 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId6] });
      if (applied6.rows.length === 0) {
        await c.execute(`UPDATE user_article_progress SET id = user_id || ':' || id WHERE id NOT LIKE '%:%'`);
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId6, Date.now()],
        });
      }

      // ── 3 天免费试用：所有现有免费用户自动获得 3 天月度会员（2026-07-27 内测上线）──
      const migId7 = 'trial-3day-all-users-2026-07-27';
      const applied7 = await c.execute({ sql: `SELECT id FROM schema_migrations WHERE id = ?`, args: [migId7] });
      if (applied7.rows.length === 0) {
        const trialExpiry = Date.now() + 3 * 24 * 60 * 60 * 1000;
        // 更新所有现存免费用户（含 membership_type = 'free' 或 NULL 或默认值）
        await c.execute({
          sql: `UPDATE users SET membership_type = 'monthly', membership_expiry = ? WHERE membership_type = 'free' OR membership_type IS NULL OR membership_type = ''`,
          args: [trialExpiry],
        });
        await c.execute({
          sql: `INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)`,
          args: [migId7, Date.now()],
        });
      }

      // ── Article learning events ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS article_learning_events (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          article_id TEXT NOT NULL,
          sentence_id TEXT,
          action TEXT NOT NULL,
          payload TEXT,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_article_learning_events_user ON article_learning_events(user_id)`);

      // ── Practice scores (动物城 AI 聊天通关打分) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS practice_scores (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          scene_slug TEXT NOT NULL,
          scene_cn TEXT NOT NULL,
          natural INTEGER NOT NULL,
          grammar INTEGER NOT NULL,
          politeness INTEGER NOT NULL,
          task INTEGER NOT NULL,
          overall INTEGER NOT NULL,
          tips_json TEXT NOT NULL DEFAULT '[]',
          highlight TEXT,
          msg_count INTEGER NOT NULL DEFAULT 0,
          mistake_count INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_practice_scores_user ON practice_scores(user_id, created_at DESC)`);

      // ── Reading progress (hot posts / reading articles) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS reading_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          post_id TEXT NOT NULL,
          read_at INTEGER NOT NULL,
          completed_at INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id)`);
      try { await c.execute(`ALTER TABLE reading_progress ADD COLUMN completed_at INTEGER`); } catch { /* already exists */ }

      // ── Word lookup cache (global, shared across all users) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS word_lookup_cache (
          word TEXT PRIMARY KEY,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
      `);

      // ── Grammar explain cache (global, permanent) ──
      // 句子 → 结构化语法解释（主干/助词/词尾/易错点），所有用户共享，省 AI 费
      await c.execute(`
        CREATE TABLE IF NOT EXISTS grammar_explain_cache (
          sentence TEXT PRIMARY KEY,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
      `);

      // ── Analyze cache (global, 30-day TTL) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS analyze_cache (
          id TEXT PRIMARY KEY,
          text TEXT NOT NULL,
          mode TEXT NOT NULL,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          UNIQUE(text, mode)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_analyze_cache_text_mode ON analyze_cache(text, mode)`);

      // ── Phonetics AI cache (global, 30-day TTL) ──
      // mode: 'letter' (字母详解) | 'examples' (规则举例) | 'confused' (易混差别) | 'mistake' (练习错题)
      // key: 业务键，如字母 'ㅓ' / 规则 id 'r-01' / 易混对 id 'cp-03' / 答错的题 'ㅓ:ㅗ'
      await c.execute(`
        CREATE TABLE IF NOT EXISTS phonetics_ai_cache (
          id TEXT PRIMARY KEY,
          mode TEXT NOT NULL,
          key TEXT NOT NULL,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          UNIQUE(mode, key)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_phonetics_ai_cache_mode_key ON phonetics_ai_cache(mode, key)`);

      // ── Meaning example cache (按义项懒加载例句，全局共享，30 天 TTL) ──
      // key 形态：`${baseForm}::${meaningChinese}::${pos}`，避免义项漂移
      await c.execute(`
        CREATE TABLE IF NOT EXISTS meaning_example_cache (
          key TEXT PRIMARY KEY,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
      `);

      // ── Grammar breakdown cache (global, permanent) ──
      // 句子+语法点 → 词素拆解，确定性输入，所有用户共享，省 DeepSeek 费
      await c.execute(`
        CREATE TABLE IF NOT EXISTS grammar_breakdown_cache (
          key TEXT PRIMARY KEY,
          result TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
      `);

      // ── TOPIK sessions ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_sessions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          mode TEXT NOT NULL,
          exam_set_id TEXT,
          section TEXT NOT NULL,
          score INTEGER,
          correct_count INTEGER,
          total_count INTEGER,
          duration_sec INTEGER,
          completed_at INTEGER,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_topik_sessions_user ON topik_sessions(user_id)`);

      // ── TOPIK mistakes ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_mistakes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          question_id TEXT NOT NULL,
          session_id TEXT,
          wrong_count INTEGER DEFAULT 1,
          last_wrong_at INTEGER NOT NULL,
          mastered INTEGER DEFAULT 0,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_topik_mistakes_user ON topik_mistakes(user_id)`);

      // ── TOPIK 题型掌握统计（每种 questionType 一行）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_type_mastery (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          question_type TEXT NOT NULL,
          attempts INTEGER NOT NULL DEFAULT 0,
          correct INTEGER NOT NULL DEFAULT 0,
          last_practiced_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_topik_type_mastery_user ON topik_type_mastery(user_id)`);

      // ── TOPIK 用户目标（考试日期、目标级别、每日题量）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_user_goals (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          target_date INTEGER,
          target_level TEXT,
          daily_question_count INTEGER NOT NULL DEFAULT 10,
          updated_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_topik_user_goals_user ON topik_user_goals(user_id)`);

      // ── TOPIK 每日训练计划（每日 15 题，含出题原因，用于打卡+连续记录）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_daily_plans (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          date TEXT NOT NULL,
          question_ids TEXT NOT NULL,
          reason_map TEXT NOT NULL,
          target_level TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          completed_at INTEGER,
          session_id TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_topik_daily_plans_user_date ON topik_daily_plans(user_id, date)`);

      // ── TOPIK AI 解释缓存（全局共享，同一题所有用户复用）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS topik_explain_cache (
          question_id TEXT PRIMARY KEY,
          explanation TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
      `);

      await c.execute(`
        CREATE TABLE IF NOT EXISTS spelling_mistakes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          word_id TEXT,
          word TEXT NOT NULL,
          meaning TEXT NOT NULL,
          user_input TEXT NOT NULL,
          correct_answer TEXT NOT NULL,
          mistake_type TEXT NOT NULL DEFAULT 'spelling',
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_spelling_mistakes_user ON spelling_mistakes(user_id)`);

      await c.execute(`
        CREATE TABLE IF NOT EXISTS ai_chat_mistakes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          scenario_id TEXT NOT NULL DEFAULT '',
          scenario_name TEXT NOT NULL DEFAULT '',
          user_input TEXT NOT NULL,
          wrong_part TEXT NOT NULL DEFAULT '',
          correct_part TEXT NOT NULL DEFAULT '',
          grammar_error TEXT NOT NULL DEFAULT '',
          reviewed INTEGER DEFAULT 0,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_ai_chat_mistakes_user ON ai_chat_mistakes(user_id, created_at DESC)`);

      await c.execute(`
        CREATE TABLE IF NOT EXISTS ai_chat_new_words (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          ko TEXT NOT NULL,
          zh TEXT NOT NULL,
          part_of_speech TEXT DEFAULT '',
          scenario_id TEXT DEFAULT '',
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE(user_id, ko)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_ai_chat_new_words_user ON ai_chat_new_words(user_id)`);

      // ── 场景对话会话持久化（每个用户 × 场景一条最新会话）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS practice_chat_sessions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          scene_slug TEXT NOT NULL,
          messages TEXT NOT NULL DEFAULT '[]',
          chat_task_idx INTEGER NOT NULL DEFAULT 0,
          has_sent INTEGER NOT NULL DEFAULT 0,
          completed INTEGER NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE(user_id, scene_slug)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_practice_chat_sessions_user ON practice_chat_sessions(user_id, updated_at DESC)`);
      // 显式 UNIQUE 兜底：确保 ON CONFLICT (user_id, scene_slug) 成立（有些旧 DB 迁移未生效）
      await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS uq_practice_chat_sessions_user_slug ON practice_chat_sessions(user_id, scene_slug)`);

      // ── 用户自定义场景（AI 虚构场景，兔莉代入功能位陪练）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS custom_scenes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          title_ko TEXT NOT NULL,
          icon TEXT DEFAULT '✨',
          place TEXT NOT NULL,
          situation TEXT NOT NULL,
          goal TEXT NOT NULL,
          opening_ko TEXT NOT NULL DEFAULT '',
          opening_zh TEXT NOT NULL DEFAULT '',
          mini_preview TEXT NOT NULL DEFAULT '{}',
          character_id TEXT NOT NULL DEFAULT 'tori',
          role_ko TEXT NOT NULL DEFAULT '',
          role_zh TEXT NOT NULL DEFAULT '',
          difficulty TEXT NOT NULL DEFAULT 'intermediate',
          tip_zh TEXT NOT NULL DEFAULT '',
          mode TEXT NOT NULL DEFAULT 'scene',
          companion_name TEXT NOT NULL DEFAULT '',
          companion_name_zh TEXT NOT NULL DEFAULT '',
          verbal_tic TEXT NOT NULL DEFAULT '',
          avatar_url TEXT NOT NULL DEFAULT '',
          created_at INTEGER NOT NULL,
          last_played_at INTEGER DEFAULT 0,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_custom_scenes_user ON custom_scenes(user_id, last_played_at DESC)`);
      // ── custom_scenes 精细化增强字段（角色/难度/贴士）──
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN character_id TEXT NOT NULL DEFAULT 'tori'`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN role_ko TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN role_zh TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'intermediate'`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN tip_zh TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      // ── 专属陪练（free 模式）字段：模式/自定义昵称/口癖 ──
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN mode TEXT NOT NULL DEFAULT 'scene'`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN companion_name TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN companion_name_zh TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN verbal_tic TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
      try { await c.execute(`ALTER TABLE custom_scenes ADD COLUMN avatar_url TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }

      // ── Tori 韩语日记（30 天养成手册）──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_tori_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          day INTEGER NOT NULL,
          modules_done TEXT NOT NULL DEFAULT '[]',
          output_json TEXT NOT NULL DEFAULT '[]',
          started_at INTEGER NOT NULL,
          completed_at INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_tori_progress_user ON user_tori_progress(user_id, day)`);

      // Migration: add level column (ToriLevel)
      try { await c.execute(`ALTER TABLE user_tori_progress ADD COLUMN level TEXT DEFAULT 'beginner'`); } catch { /* already exists */ }
      // Migration: add module_state（子模块中途恢复状态，JSON）
      try { await c.execute(`ALTER TABLE user_tori_progress ADD COLUMN module_state TEXT DEFAULT '{}'`); } catch { /* already exists */ }

      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_tori_stickers (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          sticker_id TEXT NOT NULL,
          acquired_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE(user_id, sticker_id)
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_tori_stickers_user ON user_tori_stickers(user_id)`);

      // ── Tori 日记 · 子关卡星级进度 ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS user_tori_subquest_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          level TEXT NOT NULL DEFAULT 'beginner',
          day INTEGER NOT NULL,
          idx INTEGER NOT NULL,
          kind TEXT NOT NULL,
          stars INTEGER NOT NULL DEFAULT 0,
          wrong_count INTEGER NOT NULL DEFAULT 0,
          attempts INTEGER NOT NULL DEFAULT 0,
          first_cleared_at INTEGER,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_user_tori_subquest_user ON user_tori_subquest_progress(user_id, level, day)`);

  // Migration: add correct_count / wrong_count to user_words
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN correct_count INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN wrong_count INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN consecutive_correct INTEGER DEFAULT 0`); } catch { /* already exists */ }
  // Migration: add meanings (multi-meaning JSON array) to user_words
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN meanings TEXT DEFAULT '[]'`); } catch { /* already exists */ }

  // ── 兔莉的博客 (Tori's Blog) ──
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title_ko TEXT NOT NULL,
      title_zh TEXT NOT NULL,
      excerpt_ko TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT '초급',
      category TEXT NOT NULL DEFAULT '서울 일기',
      content_json TEXT NOT NULL DEFAULT '{}',
      audio_url TEXT NOT NULL DEFAULT '',
      audio_duration INTEGER NOT NULL DEFAULT 0,
      cover_emoji TEXT NOT NULL DEFAULT '📔',
      published_at INTEGER NOT NULL,
      is_featured INTEGER NOT NULL DEFAULT 0
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
  // SNS 化：作者（哪只动物发的）、点赞数、封面图（16:9，预留真图）、封面主题色
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN author_id TEXT NOT NULL DEFAULT 'tori'`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN like_count INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN cover_image_url TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN cover_theme TEXT NOT NULL DEFAULT 'pink'`); } catch { /* already exists */ }

  // 用户对博客的真实点赞/收藏（持久化，每人每帖一行）
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_reactions (
      user_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      liked INTEGER NOT NULL DEFAULT 0,
      saved INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, post_id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_reactions_user ON blog_reactions(user_id)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_reactions_post ON blog_reactions(post_id)`);

  // 关注动物卡司（NPC 作者）：每人对每只动物一行，存在即已关注
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_follows (
      user_id TEXT NOT NULL,
      animal_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, animal_id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_follows_user ON blog_follows(user_id)`);
  // follow_day: 关注时的日记进度快照。只对该动物「之后」解锁的帖发通知，避免历史帖刷屏。
  try { await c.execute(`ALTER TABLE blog_follows ADD COLUMN follow_day INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }

  // 二期：Day 门控 + 用户 UGC 帖
  // unlock_day: NPC 帖按日记进度解锁（0 = 不门控，旧种子帖始终显示）
  // author_kind: 'npc'（动物）| 'user'（真实用户发的）
  // score_json: 用户帖的 DeepSeek 多维评分结果（NPC 帖为空）
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN unlock_day INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN author_kind TEXT NOT NULL DEFAULT 'npc'`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN score_json TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_unlock ON blog_posts(unlock_day)`);

  // 二期·UGC 双重审核 + 每日热度榜（没有 ICP 许可证，UGC 绝不自动公开）
  // 一审 ai_status: AI 自动审核脏话/反社会/反政府（~10s），passed 才对作者可见+动物点赞；NPC 默认 passed
  //   pending=审核中 / passed=通过 / blocked=拦截
  // 二审 feature_date/feature_rank: 管理员人工看综合分后手动入选，次日作为公开榜单 TOP3
  // moderated_text: 管理员改写后的公开正文（作者原文永久保留在 content_json，公开只用改写版）
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN ai_status TEXT NOT NULL DEFAULT 'passed'`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN ai_reason TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN moderated_text TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN moderated_at INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN moderated_by TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN feature_date TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN feature_rank INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }
  // join_contest: 用户发帖时主动勾选「参加每日评选」才为 1，管理员后台只收到勾选过的帖（用户知情同意保障）
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN join_contest INTEGER NOT NULL DEFAULT 0`); } catch { /* already exists */ }
  // growth_schedule: 发帖时预计算好的「涨赞时间点 + 冻结的动物评论(含 reveal 时间)」JSON。
  // 读时按当前时间在内存叠加展示值，GET 不再写库——根除多人刷新的涨赞竞态。
  try { await c.execute(`ALTER TABLE blog_posts ADD COLUMN growth_schedule TEXT NOT NULL DEFAULT ''`); } catch { /* already exists */ }
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_aistatus ON blog_posts(ai_status)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_feature ON blog_posts(feature_date, feature_rank)`);

  // 二期：博客专属用户档案（选的动物形象 + 经验/等级），不碰全局 users 表
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_user_stats (
      user_id TEXT PRIMARY KEY,
      animal_id TEXT NOT NULL DEFAULT '',
      nickname TEXT NOT NULL DEFAULT '',
      xp INTEGER NOT NULL DEFAULT 0,
      level INTEGER NOT NULL DEFAULT 1,
      post_count INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 二期：博客通知（点赞/评论/电台）。发帖时把未来的点赞/评论通知一次性写好，
  // created_at 是「该通知应出现的时间」(reveal ts)；读时只返回 created_at <= now 的，
  // 与 growth_schedule 同一套「发帖冻结、读时按时间揭晓」哲学，无需定时任务。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      post_slug TEXT NOT NULL DEFAULT '',
      from_animal_id TEXT NOT NULL DEFAULT '',
      message_ko TEXT NOT NULL DEFAULT '',
      message_zh TEXT NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_notif_user ON blog_notifications(user_id, created_at DESC)`);

  // 二期：用户在 NPC 帖下的私密评论（只对本人可见，按 user_id 隔离，无公开 UGC = 无 ICP 红线）。
  // author='me' 用户评论 created_at=此刻立即可见；author='animal' 是从安全池选的 NPC 回应，
  // created_at 是未来 reveal ts；读时只返回 created_at <= now，与 growth/通知同一套揭晓哲学，无需定时任务。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS blog_user_comments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      post_slug TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'me',
      animal_id TEXT NOT NULL DEFAULT '',
      ko TEXT NOT NULL DEFAULT '',
      zh TEXT NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_blog_ucomments ON blog_user_comments(user_id, post_slug, created_at)`);

  // 邀请裂变：邀请关系（pending→qualified，被邀请者完成 beginner Day1 转 qualified）
  await c.execute(`
    CREATE TABLE IF NOT EXISTS invitations (
      id TEXT PRIMARY KEY,
      inviter_id TEXT NOT NULL,
      invitee_id TEXT NOT NULL,
      code TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      device_hash TEXT DEFAULT '',
      ip TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      qualified_at INTEGER,
      FOREIGN KEY (inviter_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (invitee_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_invitations_invitee ON invitations(invitee_id)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_invitations_inviter ON invitations(inviter_id, status)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_invitations_dedup ON invitations(inviter_id, device_hash, ip)`);

  // 邀请裂变：奖励记账（每档只发一次；yearly/lifetime 挂账 pending，free/monthly 立即 granted）
  await c.execute(`
    CREATE TABLE IF NOT EXISTS invite_rewards (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      threshold INTEGER NOT NULL,
      days_granted INTEGER NOT NULL,
      reward_type TEXT NOT NULL DEFAULT 'monthly_days',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at INTEGER NOT NULL,
      granted_at INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_invite_rewards_user_threshold ON invite_rewards(user_id, threshold)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_invite_rewards_user ON invite_rewards(user_id, status)`);

  // 邀请裂变：实体礼盒发货（8档抽奖中奖 / 12档满员）。存收货 PII，返回接口须 no-store。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS invite_shipments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      threshold INTEGER NOT NULL,
      box_type TEXT NOT NULL DEFAULT 'standard',
      status TEXT NOT NULL DEFAULT 'pending',
      recipient TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      address TEXT NOT NULL DEFAULT '',
      tracking_no TEXT DEFAULT '',
      detail TEXT DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_invite_shipments_user_threshold ON invite_shipments(user_id, threshold)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_invite_shipments_status ON invite_shipments(status, created_at)`);

  // 错误日志：支付回调失败、关键 DB 写失败等运营告警。管理员在系统监控查看。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS error_logs (
      id TEXT PRIMARY KEY,
      level TEXT NOT NULL DEFAULT 'error',
      source TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      detail TEXT DEFAULT '',
      user_id TEXT DEFAULT '',
      created_at INTEGER NOT NULL
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_error_logs_created ON error_logs(created_at DESC)`);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_error_logs_level ON error_logs(level, created_at DESC)`);

  // 邮箱验证码：邮箱注册/登录用（海外站）。服务端专用，6 位码 + 10 分钟过期 + 一次性消费。
  await c.execute(`
    CREATE TABLE IF NOT EXISTS verification_codes (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      purpose TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      consumed INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_verification_codes_lookup ON verification_codes(email, purpose)`);
  try { await c.execute(`ALTER TABLE verification_codes ADD COLUMN attempts INTEGER DEFAULT 0`); } catch { /* already exists */ }
  // 邮箱唯一：仅约束已填邮箱的行（老库存量 email 多为 ''，不能用普通 UNIQUE）
  await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email != ''`);
  // 手机号唯一：同上，仅约束已填手机的行（防并发/重复注册同号）
  await c.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique ON users(phone) WHERE phone != ''`);

  initialized = true;
        } catch (err) {
          console.error('[db] Init failed:', err);
          // 初始化失败说明当前连接不可用，清状态让下次请求重试
          // 如果是 replica 模式，标记失败让后续自动降级
          if (isReplicaMode) {
            replicaFailed = true;
            isReplicaMode = false;
          }
          client = null;
          initPromise = null;
          initialized = false;
          throw err;
        }
      })();
    }
    await initPromise;
  }

  return {
    exec: async (sql: string, params?: unknown[]) => {
      const key = `db:${sql}:${JSON.stringify(params)}`;
      return cached(key, 30000, async () => {
        const result = await c.execute({ sql, args: params as any[] });
        const columns = result.columns;
        const values = result.rows.map((row: any) =>
          columns.map((col: string) => row[col])
        );
        return [{ columns, values }];
      });
    },
    run: async (sql: string, params?: unknown[]) => {
      const res = await c.execute({ sql, args: params as any[] });
      clearCache();
      return { rowsAffected: Number(res.rowsAffected ?? 0) };
    },
    batch: async (statements: { sql: string; args: unknown[] }[]) => {
      await c.batch(statements as any);
      clearCache();
    },
  };
}
