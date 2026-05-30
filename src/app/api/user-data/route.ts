import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

type UserScope = string | string[] | null;
type Writable = 'all' | 'readonly';

const TABLE_COLS: Record<string, { cols: string[]; pk: string; table: string; userScope: UserScope; writable: Writable }> = {
  words: {
    table: 'user_words',
    cols: ['id', 'user_id', 'word', 'pronunciation', 'meaning', 'part_of_speech', 'examples', 'source_entry_id', 'source_video_id', 'source_subtitle_id', 'mastery', 'srs_level', 'next_review', 'ease_factor', 'interval', 'created_at', 'last_reviewed'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  reviewSessions: {
    table: 'review_sessions',
    cols: ['id', 'user_id', 'date', 'words_reviewed', 'words_passed', 'duration', 'xp_earned'],
    pk: 'id', userScope: 'user_id', writable: 'all',
  },
  dictationRecords: {
    table: 'dictation_records',
    cols: ['id', 'user_id', 'word_id', 'date', 'correct', 'user_input'],
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
    if (['examples', 'word_ids', 'tokens', 'words_added'].includes(cols[i]) || ['examples', 'wordIds', 'tokens', 'wordsAdded'].includes(camelKey)) {
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

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();

  try {
    const { action, table, id, data } = await req.json();

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
        const result = await db.exec(sql, [id, ...u.params]);
        const row = result[0]?.values[0];
        return NextResponse.json(row ? rowToObj(cols, row) : null);
      }

      case 'add': {
        requireWritable(info);
        const snakeData = toSnakeObj(data);
        if (userScope === 'user_id') {
          snakeData.user_id = auth.userId;
        } else if (Array.isArray(userScope)) {
          snakeData[userScope[0]] = auth.userId;
        }
        validateColumns(snakeData, cols);
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
        const idVal = data[pk] ?? data.id;
        let deleteSql: string;
        let deleteParams: unknown[];
        const u = buildUserClause(userScope, auth.userId);
        if (u.clause) {
          deleteSql = `DELETE FROM ${info.table} WHERE ${pk} = ? AND ${u.clause}`;
          deleteParams = [idVal, ...u.params];
        } else {
          deleteSql = `DELETE FROM ${info.table} WHERE ${pk} = ?`;
          deleteParams = [idVal];
        }
        await db.run(deleteSql, deleteParams);

        const snakeData = toSnakeObj(data);
        if (userScope === 'user_id') {
          snakeData.user_id = auth.userId;
        } else if (Array.isArray(userScope)) {
          snakeData[userScope[0]] = auth.userId;
        }
        validateColumns(snakeData, cols);
        const colNames = Object.keys(snakeData);
        const placeholders = colNames.map(() => '?');
        const values = normalizeSqlValues(colNames.map((c) => snakeData[c]));
        await db.run(
          `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`,
          values
        );
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
        if (Object.keys(snakeData).length === 0) {
          return NextResponse.json({ ok: true });
        }
        const sets = Object.keys(snakeData).map((c) => `${c} = ?`);
        const values = normalizeSqlValues(Object.keys(snakeData).map((c) => snakeData[c]));
        const u = buildUserClause(userScope, auth.userId);
        await db.run(
          `UPDATE ${info.table} SET ${sets.join(', ')} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`,
          [...values, id, ...u.params]
        );
        return NextResponse.json({ ok: true });
      }

      case 'delete': {
        requireWritable(info);
        const u = buildUserClause(userScope, auth.userId);
        const sql = `DELETE FROM ${info.table} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`;
        await db.run(sql, [id, ...u.params]);
        return NextResponse.json({ ok: true });
      }

      case 'query': {
        const { field, op, value, orderBy, reverse, limit } = data || {};
        const snField = toSnake(field || '');
        if (!cols.includes(snField)) {
          return NextResponse.json({ error: `Unknown field: ${field}` }, { status: 400 });
        }
        const opMap: Record<string, string> = { eq: '=', lt: '<', lte: '<=', gt: '>', gte: '>=' };
        const u = buildUserClause(userScope, auth.userId);
        let sql = `SELECT ${cols.join(', ')} FROM ${info.table}`;
        const params: unknown[] = [];
        const conditions: string[] = [];

        if (u.clause) {
          conditions.push(u.clause);
          params.push(...u.params);
        }

        if (op === 'in' && Array.isArray(value)) {
          const placeholders = value.map(() => '?').join(', ');
          conditions.push(`${snField} IN (${placeholders})`);
          params.push(...value);
        } else if (op && op in opMap) {
          conditions.push(`${snField} ${opMap[op]} ?`);
          params.push(value);
        } else {
          conditions.push(`${snField} = ?`);
          params.push(value);
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
          sql += ` LIMIT ?`;
          params.push(limit);
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
          sql += ` LIMIT ?`;
          params.push(limit);
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
