import { createClient, type Client } from '@libsql/client';
import path from 'path';

let client: Client | null = null;

function getClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;

  client = createClient({
    url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
    ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  });

  return client;
}

export async function getDb() {
  const c = getClient();

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
    CREATE TABLE IF NOT EXISTS study_logs (
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
      created_at INTEGER NOT NULL,
      FOREIGN KEY (target_user_id) REFERENCES users(id)
    )
  `);
  await c.execute(`CREATE INDEX IF NOT EXISTS idx_announcements_created ON announcements(created_at DESC)`);

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

  return {
    exec: async (sql: string, params?: unknown[]) => {
      const result = await c.execute({ sql, args: params as any[] });
      const columns = result.columns;
      const values = result.rows.map((row: any) =>
        columns.map((col: string) => row[col])
      );
      return [{ columns, values }];
    },
    run: async (sql: string, params?: unknown[]) => {
      await c.execute({ sql, args: params as any[] });
    },
  };
}
