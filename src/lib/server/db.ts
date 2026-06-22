import { createClient, type Client } from '@libsql/client';
import path from 'path';
import { mkdirSync } from 'fs';
import { cached, clearCache } from '@/lib/cache';

let client: Client | null = null;
let initialized = false;
let initPromise: Promise<void> | null = null;

function getClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const localDbDir = path.resolve(process.cwd(), 'data');
  const localDbPath = path.resolve(localDbDir, 'app.db');

  mkdirSync(localDbDir, { recursive: true });

  // Use file: + absolute path so libsql resolves the file correctly regardless of CWD
  const dbUrl = url || `file:${localDbPath}`;
  console.log('[db] Connecting to:', dbUrl);

  client = createClient({
    url: dbUrl,
    ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  });

  return client;
}

export async function getDb() {
  const c = getClient();

  if (!initialized) {
    if (!initPromise) {
      initPromise = (async () => {
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
          completed_at INTEGER,
          last_read_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_article_progress_user ON user_article_progress(user_id)`);

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

      // ── Reading progress (hot posts / reading articles) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS reading_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          post_id TEXT NOT NULL,
          read_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      await c.execute(`CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id)`);

      // ── Word lookup cache (global, shared across all users) ──
      await c.execute(`
        CREATE TABLE IF NOT EXISTS word_lookup_cache (
          word TEXT PRIMARY KEY,
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

  // Migration: add correct_count / wrong_count to user_words
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN correct_count INTEGER DEFAULT 0`); } catch { /* already exists */ }
  try { await c.execute(`ALTER TABLE user_words ADD COLUMN wrong_count INTEGER DEFAULT 0`); } catch { /* already exists */ }

  initialized = true;
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
      await c.execute({ sql, args: params as any[] });
      clearCache();
    },
    batch: async (statements: { sql: string; args: unknown[] }[]) => {
      await c.batch(statements as any);
      clearCache();
    },
  };
}
