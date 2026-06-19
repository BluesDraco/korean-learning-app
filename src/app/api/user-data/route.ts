import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { filterContent } from '@/lib/contentFilter';

// Field-level length limits for user-generated text fields
const FIELD_MAX_LENGTH: Record<string, Record<string, number>> = {
  diary: { title: 100, content: 5000 },
  notes: { content: 2000, title: 100 },
  articles: { original_text: 10000, title: 200 },
  buddyInvites: { intro: 200, learning_goal: 200 },
  sentences: { korean: 500, note: 500 },
};

function checkFieldLengths(table: string, data: Record<string, unknown>): string | null {
  const limits = FIELD_MAX_LENGTH[table];
  if (!limits) return null;
  for (const [field, max] of Object.entries(limits)) {
    const val = data[field];
    if (typeof val === 'string' && val.length > max) {
      return `${field} 超过最大长度限制（${max}字符）`;
    }
  }
  return null;
}

// Tables and fields that should be checked for political sensitive content
const POLITICAL_CHECK_FIELDS: Record<string, string[]> = {
  diary: ['title', 'content'],
  notes: ['title', 'content'],
  sentences: ['korean', 'note'],
  buddyInvites: ['intro', 'learning_goal'],
};

function checkPoliticalFields(table: string, data: Record<string, unknown>): string | null {
  const fields = POLITICAL_CHECK_FIELDS[table];
  if (!fields) return null;
  for (const field of fields) {
    const val = data[field];
    if (typeof val === 'string') {
      const result = filterContent(val, 'user_content');
      if (!result.ok) return result.reason;
    }
  }
  return null;
}

type UserScope = string | string[] | null;
type Writable = 'all' | 'readonly';

const TABLE_COLS: Record<string, { cols: string[]; pk: string; table: string; userScope: UserScope; writable: Writable }> = {
  words: {
    table: 'user_words',
    cols: ['id', 'user_id', 'word', 'pronunciation', 'meaning', 'part_of_speech', 'examples', 'source_entry_id', 'source_video_id', 'source_subtitle_id', 'source', 'source_detail', 'mastery', 'srs_level', 'next_review', 'ease_factor', 'interval', 'correct_count', 'wrong_count', 'created_at', 'last_reviewed'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  reviewSessions: {
    table: 'review_sessions',
    cols: ['id', 'user_id', 'date', 'words_reviewed', 'words_passed', 'duration', 'xp_earned'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  dictationRecords: {
    table: 'dictation_records',
    cols: ['id', 'user_id', 'word_id', 'meaning', 'date', 'correct', 'user_input'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  shadowingRecords: {
    table: 'shadowing_records',
    cols: ['id', 'user_id', 'subtitle_id', 'date', 'score'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  userProfiles: {
    table: 'user_profiles',
    cols: ['id', 'user_id', 'nickname', 'level', 'xp', 'xp_to_next_level', 'streak', 'longest_streak', 'last_study_date', 'target_level', 'daily_goal_minutes', 'daily_goal_words', 'current_unit', 'onboarding_complete', 'created_at', 'is_ambassador', 'ambassador_since', 'ambassador_reason', 'share_enabled', 'share_token'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  dailyLogs: {
    table: 'daily_logs',
    cols: ['id', 'user_id', 'date', 'words_learned', 'words_reviewed', 'dictations_done', 'shadowing_done', 'minutes_studied', 'xp_earned'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  achievements: {
    table: 'achievements',
    cols: ['id', 'user_id', 'type', 'earned_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  settings: {
    table: 'app_settings',
    cols: ['id', 'user_id', 'daily_word_goal', 'review_batch_size', 'default_playback_rate', 'theme'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  wordBooks: {
    table: 'word_books',
    cols: ['id', 'user_id', 'name', 'description', 'word_ids', 'color', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  studyVideos: {
    table: 'study_videos',
    cols: ['id', 'user_id', 'url', 'platform', 'platform_id', 'title', 'thumbnail', 'subtitle_source', 'added_at', 'last_studied_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  studySubtitles: {
    table: 'study_subtitles',
    cols: ['id', 'user_id', 'video_id', 'index', 'start', 'end', 'text', 'text_zh', 'tokens'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  studyLogs: {
    table: 'study_logs',
    cols: ['id', 'user_id', 'action', 'details', 'xp_earned', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  videoStudyLogs: {
    table: 'video_study_logs',
    cols: ['id', 'user_id', 'video_id', 'date', 'duration_sec', 'words_added', 'sentences_looped', 'action'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  userAchievements: {
    table: 'user_achievements',
    cols: ['id', 'user_id', 'achievement_type', 'achieved_at', 'is_card_generated'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  userShareLinks: {
    table: 'user_share_links',
    cols: ['id', 'user_id', 'token', 'expires_at', 'is_active', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  stickerPacks: {
    table: 'sticker_packs',
    cols: ['id', 'name', 'description', 'cover_image', 'published_at', 'is_active'],
    pk: 'id', userScope: null, writable: 'readonly',
  },
  stickers: {
    table: 'stickers',
    cols: ['id', 'pack_id', 'image_url', 'caption_zh', 'caption_ko', 'sort_order'],
    pk: 'id', userScope: null, writable: 'readonly',
  },
  stickerDownloads: {
    table: 'sticker_downloads',
    cols: ['id', 'pack_id', 'user_id', 'downloaded_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  buddyRelations: {
    table: 'buddy_relations',
    cols: ['id', 'user_a_id', 'user_b_id', 'status', 'created_at'],
    pk: 'id', userScope: ['user_a_id', 'user_b_id'], writable: 'all',
  },
  buddyInvites: {
    table: 'buddy_invites',
    cols: ['id', 'user_id', 'invite_token', 'learning_goal', 'level', 'daily_minutes', 'intro', 'expires_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  sentences: {
    table: 'user_sentences',
    cols: ['id', 'user_id', 'korean', 'chinese', 'source_type', 'source_id', 'source_title', 'start_time', 'end_time', 'note', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  articles: {
    table: 'user_articles',
    cols: ['id', 'user_id', 'title', 'original_text', 'translated_text', 'source_type', 'source_url', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  notes: {
    table: 'user_notes',
    cols: ['id', 'user_id', 'title', 'content', 'source_type', 'source_id', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  recordings: {
    table: 'user_recordings',
    cols: ['id', 'user_id', 'type', 'source_id', 'line_id', 'audio_url', 'korean', 'audio_data', 'source_type', 'duration_ms', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  kpopProgress: {
    table: 'user_kpop_progress',
    cols: ['id', 'user_id', 'song_id', 'current_line_index', 'practiced_lines', 'completed_lines', 'total_lines', 'total_recordings', 'total_practice_seconds', 'last_practiced_at', 'status', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  diary: {
    table: 'user_diary',
    cols: ['id', 'user_id', 'title', 'content', 'mood', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  pronunciationAttempts: {
    table: 'user_pronunciation_attempts',
    cols: ['id', 'user_id', 'item_id', 'duration_ms', 'score', 'feedback', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  lessonMastery: {
    table: 'lesson_mastery',
    cols: ['id', 'user_id', 'day_num', 'item_type', 'item_idx', 'status', 'seen_count', 'correct_count', 'wrong_count', 'last_seen_at', 'next_review_at', 'interval', 'ease', 'source'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  learningEvents: {
    table: 'learning_events',
    cols: ['id', 'user_id', 'day_num', 'card_type', 'action', 'detail', 'timestamp'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  userGrammarStates: {
    table: 'user_grammar_states',
    cols: ['id', 'user_id', 'status', 'seen_count', 'correct_count', 'wrong_count', 'last_seen_at', 'next_review_at', 'source', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  userArticleProgress: {
    table: 'user_article_progress',
    cols: ['id', 'user_id', 'article_id', 'status', 'read_sentence_ids', 'saved_sentence_ids', 'saved_word_ids', 'quiz_score', 'quiz_answers', 'output_answer', 'completed_at', 'last_read_at', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  articleLearningEvents: {
    table: 'article_learning_events',
    cols: ['id', 'user_id', 'article_id', 'sentence_id', 'action', 'payload', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  readingProgress: {
    table: 'reading_progress',
    cols: ['id', 'user_id', 'post_id', 'read_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  topikSessions: {
    table: 'topik_sessions',
    cols: ['id', 'user_id', 'mode', 'exam_set_id', 'section', 'score', 'correct_count', 'total_count', 'duration_sec', 'completed_at', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  topikMistakes: {
    table: 'topik_mistakes',
    cols: ['id', 'user_id', 'question_id', 'session_id', 'wrong_count', 'last_wrong_at', 'mastered', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  aiChatMistakes: {
    table: 'ai_chat_mistakes',
    cols: ['id', 'user_id', 'scenario_id', 'scenario_name', 'user_input', 'wrong_part', 'correct_part', 'grammar_error', 'reviewed', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  aiChatNewWords: {
    table: 'ai_chat_new_words',
    cols: ['id', 'user_id', 'ko', 'zh', 'part_of_speech', 'scenario_id', 'created_at'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
};

function toSnake(s: string) {
  return s.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
}

function toSnakeObj(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[toSnake(k)] = v;
  }
  return out;
}

function normalizeSqlValue(value: unknown): unknown {
  if (value === undefined) return null;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
    return JSON.stringify(value);
  }
  return value;
}

function normalizeSqlValues(values: unknown[]): unknown[] {
  return values.map(normalizeSqlValue);
}

function rowToObj(cols: string[], row: unknown[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < cols.length; i++) {
    const camelKey = cols[i].replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    let val = row[i];
    if (['examples', 'word_ids', 'tokens', 'words_added', 'practiced_lines', 'completed_lines', 'read_sentence_ids', 'saved_sentence_ids', 'saved_word_ids', 'quiz_answers'].includes(cols[i]) || ['examples', 'wordIds', 'tokens', 'wordsAdded', 'practicedLines', 'completedLines', 'readSentenceIds', 'savedSentenceIds', 'savedWordIds', 'quizAnswers'].includes(camelKey)) {
      try { val = JSON.parse(val as string); } catch { /* keep raw */ }
    }
    obj[camelKey] = val;
  }
  return obj;
}

/** Build WHERE clause + params for user-scoped tables */
function buildUserClause(scope: UserScope, userId: string): { clause: string; params: unknown[] } {
  if (!scope) return { clause: '', params: [] };
  if (Array.isArray(scope)) {
    return {
      clause: `(${scope.map((col) => `${col} = ?`).join(' OR ')})`,
      params: scope.map(() => userId),
    };
  }
  return { clause: `${scope} = ?`, params: [userId] };
}

/** Only allow keys that exist in the table's column whitelist */
function validateColumns(data: Record<string, unknown>, cols: string[]): string[] {
  const unknown = Object.keys(data).filter((k) => !cols.includes(k));
  if (unknown.length > 0) {
    throw new Error(`Unknown columns: ${unknown.join(', ')}`);
  }
  return Object.keys(data);
}

/** Reject write operations on readonly tables */
function requireWritable(info: { writable: Writable; table: string }) {
  if (info.writable === 'readonly') {
    throw new Error(`Table '${info.table}' is read-only`);
  }
}

const LOGICAL_SINGLETON_TABLES = new Set(['userProfiles', 'settings']);
const USER_OWNED_DETERMINISTIC_TABLES = new Set(['words', 'dailyLogs']);

function resolveStorageId(tableKey: string, id: unknown, userId: string): unknown {
  if (typeof id !== 'string') return id;

  if (LOGICAL_SINGLETON_TABLES.has(tableKey) && id === 'main') {
    return userId;
  }

  if (USER_OWNED_DETERMINISTIC_TABLES.has(tableKey) && !id.startsWith(`${userId}:`)) {
    return `${userId}:${id}`;
  }

  return id;
}

function applyStorageIds(tableKey: string, data: Record<string, unknown>, pk: string, userId: string) {
  if (LOGICAL_SINGLETON_TABLES.has(tableKey)) {
    data[pk] = userId;
    return;
  }

  if (USER_OWNED_DETERMINISTIC_TABLES.has(tableKey) && typeof data[pk] === 'string') {
    data[pk] = resolveStorageId(tableKey, data[pk], userId);
  }
}

function applyUserScopeForWrite(
  tableKey: string,
  data: Record<string, unknown>,
  scope: UserScope,
  userId: string,
) {
  if (scope === 'user_id') {
    data.user_id = userId;
    return;
  }

  if (Array.isArray(scope)) {
    const hasCurrentUser = scope.some((col) => data[col] === userId);
    if (!hasCurrentUser) {
      throw new Error(`Current user must be part of ${tableKey}`);
    }
  }
}

function canReadInviteByToken(tableKey: string, field: string, op: unknown): boolean {
  return tableKey === 'buddyInvites' && field === 'invite_token' && (op === 'eq' || op === undefined || op === null);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();

  let body: { action?: string; table?: string; id?: string; data?: any };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { action, table, id, data } = body;

  if (!table || !TABLE_COLS[table]) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
  }
  if (!action) {
    return NextResponse.json({ error: 'Missing action' }, { status: 400 });
  }

  try {
    const info = TABLE_COLS[table];
    if (!info) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    const { cols, pk, userScope } = info;

    switch (action) {
      case 'getAll': {
        const u = buildUserClause(userScope, auth.userId);
        const sql = `SELECT ${cols.join(', ')} FROM ${info.table}${u.clause ? ` WHERE ${u.clause}` : ''}`;
        const result = await db.exec(sql, u.params);
        const rows = result[0]?.values.map((r: unknown[]) => rowToObj(cols, r)) ?? [];
        return NextResponse.json(rows);
      }

      case 'get': {
        const u = buildUserClause(userScope, auth.userId);
        const sql = `SELECT ${cols.join(', ')} FROM ${info.table} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`;
        const storageId = resolveStorageId(table, id, auth.userId);
        const result = await db.exec(sql, [storageId, ...u.params]);
        const row = result[0]?.values[0];
        return NextResponse.json(row ? rowToObj(cols, row) : null);
      }

      case 'add': {
        requireWritable(info);
        const snakeData = toSnakeObj(data);
        applyStorageIds(table, snakeData, pk, auth.userId);
        applyUserScopeForWrite(table, snakeData, userScope, auth.userId);
        validateColumns(snakeData, cols);
        const lenErr = checkFieldLengths(table, snakeData);
        if (lenErr) return NextResponse.json({ error: lenErr }, { status: 400 });
        const addFilterErr = checkPoliticalFields(table, snakeData);
        if (addFilterErr) return NextResponse.json({ error: addFilterErr }, { status: 400 });
        const colNames = Object.keys(snakeData);
        const placeholders = colNames.map(() => '?');
        const values = normalizeSqlValues(colNames.map((c) => snakeData[c]));
        await db.run(
          `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`,
          values
        );
        return NextResponse.json({ ok: true });
      }

      case 'put': {
        requireWritable(info);
        const idVal = resolveStorageId(table, data[pk] ?? data.id, auth.userId);
        const u = buildUserClause(userScope, auth.userId);
        const deleteSql = u.clause
          ? `DELETE FROM ${info.table} WHERE ${pk} = ? AND ${u.clause}`
          : `DELETE FROM ${info.table} WHERE ${pk} = ?`;
        const deleteParams: unknown[] = u.clause ? [idVal, ...u.params] : [idVal];

        const snakeData = toSnakeObj(data);
        applyStorageIds(table, snakeData, pk, auth.userId);
        applyUserScopeForWrite(table, snakeData, userScope, auth.userId);
        validateColumns(snakeData, cols);
        const colNames = Object.keys(snakeData);
        const placeholders = colNames.map(() => '?');
        const values = normalizeSqlValues(colNames.map((c) => snakeData[c]));

        await db.batch([
          { sql: deleteSql, args: deleteParams },
          { sql: `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`, args: values as unknown[] },
        ]);
        return NextResponse.json({ ok: true });
      }

      case 'update': {
        requireWritable(info);
        const snakeData = toSnakeObj(data);
        delete snakeData[pk];
        if (userScope === 'user_id') {
          delete snakeData.user_id;
        } else if (Array.isArray(userScope)) {
          for (const col of userScope) {
            delete snakeData[col];
          }
        }
        validateColumns(snakeData, cols);
        const updateLenErr = checkFieldLengths(table, snakeData);
        if (updateLenErr) return NextResponse.json({ error: updateLenErr }, { status: 400 });
        const updateFilterErr = checkPoliticalFields(table, snakeData);
        if (updateFilterErr) return NextResponse.json({ error: updateFilterErr }, { status: 400 });
        if (Object.keys(snakeData).length === 0) {
          return NextResponse.json({ ok: true });
        }
        const sets = Object.keys(snakeData).map((c) => `${c} = ?`);
        const values = normalizeSqlValues(Object.keys(snakeData).map((c) => snakeData[c]));
        const u = buildUserClause(userScope, auth.userId);
        await db.run(
          `UPDATE ${info.table} SET ${sets.join(', ')} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`,
          [...values, resolveStorageId(table, id, auth.userId), ...u.params]
        );
        return NextResponse.json({ ok: true });
      }

      case 'delete': {
        requireWritable(info);
        const u = buildUserClause(userScope, auth.userId);
        const sql = `DELETE FROM ${info.table} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`;
        await db.run(sql, [resolveStorageId(table, id, auth.userId), ...u.params]);
        return NextResponse.json({ ok: true });
      }

      case 'bulkPut': {
        requireWritable(info);
        if (!Array.isArray(data)) {
          return NextResponse.json({ error: 'data must be an array' }, { status: 400 });
        }
        const statements: { sql: string; args: unknown[] }[] = [];
        for (const item of data) {
          const snakeData = toSnakeObj(item);
          applyStorageIds(table, snakeData, pk, auth.userId);
          applyUserScopeForWrite(table, snakeData, userScope, auth.userId);
          validateColumns(snakeData, cols);
          const idVal = resolveStorageId(table, snakeData[pk] ?? snakeData.id, auth.userId);
          const u = buildUserClause(userScope, auth.userId);
          const deleteSql = u.clause
            ? `DELETE FROM ${info.table} WHERE ${pk} = ? AND ${u.clause}`
            : `DELETE FROM ${info.table} WHERE ${pk} = ?`;
          const deleteParams: unknown[] = u.clause ? [idVal, ...u.params] : [idVal];
          const colNames = Object.keys(snakeData);
          const placeholders = colNames.map(() => '?');
          const values = normalizeSqlValues(colNames.map((c) => snakeData[c]));
          statements.push({ sql: deleteSql, args: deleteParams });
          statements.push({ sql: `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`, args: values as unknown[] });
        }
        await db.batch(statements);
        return NextResponse.json({ ok: true });
      }

      case 'bulkUpdate': {
        requireWritable(info);
        if (!Array.isArray(data)) {
          return NextResponse.json({ error: 'data must be an array' }, { status: 400 });
        }
        const statements: { sql: string; args: unknown[] }[] = [];
        for (const item of data) {
          const snakeData = toSnakeObj(item);
          const itemId = resolveStorageId(table, snakeData[pk] ?? snakeData.id, auth.userId);
          delete snakeData[pk];
          if (userScope === 'user_id') delete snakeData.user_id;
          if (Object.keys(snakeData).length === 0) continue;
          validateColumns(snakeData, cols);
          const sets = Object.keys(snakeData).map((c) => `${c} = ?`);
          const values = normalizeSqlValues(Object.keys(snakeData).map((c) => snakeData[c]));
          const u = buildUserClause(userScope, auth.userId);
          statements.push({
            sql: `UPDATE ${info.table} SET ${sets.join(', ')} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`,
            args: [...values, itemId, ...u.params],
          });
        }
        if (statements.length > 0) await db.batch(statements);
        return NextResponse.json({ ok: true });
      }

      case 'bulkDelete': {
        requireWritable(info);
        if (!Array.isArray(data)) {
          return NextResponse.json({ error: 'data must be an array' }, { status: 400 });
        }
        const u = buildUserClause(userScope, auth.userId);
        const delSql = `DELETE FROM ${info.table} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`;
        const statements = data.map((itemId: unknown) => ({
          sql: delSql,
          args: [resolveStorageId(table, itemId, auth.userId), ...u.params],
        }));
        if (statements.length > 0) await db.batch(statements);
        return NextResponse.json({ ok: true });
      }

      case 'query': {
        const { field, op, value, orderBy, reverse, limit } = data || {};
        const snField = toSnake(field || '');
        if (!cols.includes(snField)) {
          return NextResponse.json({ error: `Unknown field: ${field}` }, { status: 400 });
        }
        const opMap: Record<string, string> = { eq: '=', lt: '<', lte: '<=', gt: '>', gte: '>=' };
        const skipUserScope = canReadInviteByToken(table, snField, op);
        const u = skipUserScope ? { clause: '', params: [] as unknown[] } : buildUserClause(userScope, auth.userId);
        let sql = `SELECT ${cols.join(', ')} FROM ${info.table}`;
        const params: unknown[] = [];
        const conditions: string[] = [];
        const scopedValue = snField === pk
          ? resolveStorageId(table, value, auth.userId)
          : value;

        if (u.clause) {
          conditions.push(u.clause);
          params.push(...u.params);
        }

        if (op === 'in' && Array.isArray(scopedValue)) {
          if (scopedValue.length === 0) return NextResponse.json([]);
          const resolvedValues = snField === pk
            ? scopedValue.map((v) => resolveStorageId(table, v, auth.userId))
            : scopedValue;
          const placeholders = resolvedValues.map(() => '?').join(', ');
          conditions.push(`${snField} IN (${placeholders})`);
          params.push(...resolvedValues);
        } else if (op && op in opMap) {
          conditions.push(`${snField} ${opMap[op]} ?`);
          params.push(scopedValue);
        } else {
          conditions.push(`${snField} = ?`);
          params.push(scopedValue);
        }

        if (conditions.length > 0) {
          sql += ` WHERE ${conditions.join(' AND ')}`;
        }
        if (orderBy) {
          const snOrderBy = toSnake(orderBy);
          if (!cols.includes(snOrderBy)) {
            return NextResponse.json({ error: `Unknown orderBy field: ${orderBy}` }, { status: 400 });
          }
          sql += ` ORDER BY ${snOrderBy} ${reverse ? 'DESC' : 'ASC'}`;
        }
        if (limit) {
          const n = Number(limit);
          if (!Number.isFinite(n) || n < 1 || n > 200) {
            return NextResponse.json({ error: 'limit must be 1-200' }, { status: 400 });
          }
          sql += ` LIMIT ?`;
          params.push(n);
        }
        const result = await db.exec(sql, params);
        const rows = result[0]?.values.map((r: unknown[]) => rowToObj(cols, r)) ?? [];
        return NextResponse.json(rows);
      }

      case 'list': {
        const { orderBy, reverse, limit } = data || {};
        const u = buildUserClause(userScope, auth.userId);
        let sql = `SELECT ${cols.join(', ')} FROM ${info.table}`;
        const params: unknown[] = [];
        if (u.clause) {
          sql += ` WHERE ${u.clause}`;
          params.push(...u.params);
        }
        if (orderBy) {
          const snOrderBy = toSnake(orderBy);
          if (!cols.includes(snOrderBy)) {
            return NextResponse.json({ error: `Unknown orderBy field: ${orderBy}` }, { status: 400 });
          }
          sql += ` ORDER BY ${snOrderBy} ${reverse ? 'DESC' : 'ASC'}`;
        }
        if (limit) {
          const n = Number(limit);
          if (!Number.isFinite(n) || n < 1 || n > 200) {
            return NextResponse.json({ error: 'limit must be 1-200' }, { status: 400 });
          }
          sql += ` LIMIT ?`;
          params.push(n);
        }
        const result = await db.exec(sql, params);
        const rows = result[0]?.values.map((r: unknown[]) => rowToObj(cols, r)) ?? [];
        return NextResponse.json(rows);
      }

      case 'count': {
        const u = buildUserClause(userScope, auth.userId);
        const sql = `SELECT COUNT(*) FROM ${info.table}${u.clause ? ` WHERE ${u.clause}` : ''}`;
        const result = await db.exec(sql, u.params);
        return NextResponse.json({ count: result[0]?.values[0]?.[0] ?? 0 });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
