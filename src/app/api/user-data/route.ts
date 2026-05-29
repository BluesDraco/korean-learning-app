import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

type UserScope = string | string[] | null;

const TABLE_COLS: Record<string, { cols: string[]; pk: string; table: string; userScope: UserScope }> = {
  words: {
    table: 'user_words',
    cols: ['id', 'user_id', 'word', 'pronunciation', 'meaning', 'part_of_speech', 'examples', 'source_entry_id', 'source_video_id', 'source_subtitle_id', 'mastery', 'srs_level', 'next_review', 'ease_factor', 'interval', 'created_at', 'last_reviewed'],
    pk: 'id', userScope: 'user_id',
  },
  reviewSessions: {
    table: 'review_sessions',
    cols: ['id', 'user_id', 'date', 'words_reviewed', 'words_passed', 'duration', 'xp_earned'],
    pk: 'id', userScope: 'user_id',
  },
  dictationRecords: {
    table: 'dictation_records',
    cols: ['id', 'user_id', 'word_id', 'date', 'correct', 'user_input'],
    pk: 'id', userScope: 'user_id',
  },
  shadowingRecords: {
    table: 'shadowing_records',
    cols: ['id', 'user_id', 'subtitle_id', 'date', 'score'],
    pk: 'id', userScope: 'user_id',
  },
  userProfiles: {
    table: 'user_profiles',
    cols: ['id', 'user_id', 'nickname', 'level', 'xp', 'xp_to_next_level', 'streak', 'longest_streak', 'last_study_date', 'target_level', 'daily_goal_minutes', 'daily_goal_words', 'current_unit', 'onboarding_complete', 'created_at', 'is_ambassador', 'ambassador_since', 'ambassador_reason', 'share_enabled', 'share_token'],
    pk: 'id', userScope: 'user_id',
  },
  dailyLogs: {
    table: 'daily_logs',
    cols: ['id', 'user_id', 'date', 'words_learned', 'words_reviewed', 'dictations_done', 'shadowing_done', 'minutes_studied', 'xp_earned'],
    pk: 'id', userScope: 'user_id',
  },
  achievements: {
    table: 'achievements',
    cols: ['id', 'user_id', 'type', 'earned_at'],
    pk: 'id', userScope: 'user_id',
  },
  settings: {
    table: 'app_settings',
    cols: ['id', 'user_id', 'daily_word_goal', 'review_batch_size', 'default_playback_rate', 'theme'],
    pk: 'id', userScope: 'user_id',
  },
  wordBooks: {
    table: 'word_books',
    cols: ['id', 'user_id', 'name', 'description', 'word_ids', 'color', 'created_at', 'updated_at'],
    pk: 'id', userScope: 'user_id',
  },
  studyVideos: {
    table: 'study_videos',
    cols: ['id', 'user_id', 'url', 'platform', 'platform_id', 'title', 'thumbnail', 'subtitle_source', 'added_at', 'last_studied_at'],
    pk: 'id', userScope: 'user_id',
  },
  studySubtitles: {
    table: 'study_subtitles',
    cols: ['id', 'user_id', 'video_id', 'index', 'start', 'end', 'text', 'text_zh', 'tokens'],
    pk: 'id', userScope: 'user_id',
  },
  studyLogs: {
    table: 'study_logs',
    cols: ['id', 'user_id', 'action', 'details', 'xp_earned', 'created_at'],
    pk: 'id', userScope: 'user_id',
  },
  videoStudyLogs: {
    table: 'video_study_logs',
    cols: ['id', 'user_id', 'video_id', 'date', 'duration_sec', 'words_added', 'sentences_looped', 'action'],
    pk: 'id', userScope: 'user_id',
  },
  userAchievements: {
    table: 'user_achievements',
    cols: ['id', 'user_id', 'achievement_type', 'achieved_at', 'is_card_generated'],
    pk: 'id', userScope: 'user_id',
  },
  userShareLinks: {
    table: 'user_share_links',
    cols: ['id', 'user_id', 'token', 'expires_at', 'is_active', 'created_at'],
    pk: 'id', userScope: 'user_id',
  },
  stickerPacks: {
    table: 'sticker_packs',
    cols: ['id', 'name', 'description', 'cover_image', 'published_at', 'is_active'],
    pk: 'id', userScope: null,
  },
  stickers: {
    table: 'stickers',
    cols: ['id', 'pack_id', 'image_url', 'caption_zh', 'caption_ko', 'sort_order'],
    pk: 'id', userScope: null,
  },
  stickerDownloads: {
    table: 'sticker_downloads',
    cols: ['id', 'pack_id', 'user_id', 'downloaded_at'],
    pk: 'id', userScope: 'user_id',
  },
  buddyRelations: {
    table: 'buddy_relations',
    cols: ['id', 'user_a_id', 'user_b_id', 'status', 'created_at'],
    pk: 'id', userScope: ['user_a_id', 'user_b_id'],
  },
  buddyInvites: {
    table: 'buddy_invites',
    cols: ['id', 'user_id', 'invite_token', 'learning_goal', 'level', 'daily_minutes', 'intro', 'expires_at'],
    pk: 'id', userScope: 'user_id',
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

function rowToObj(cols: string[], row: unknown[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < cols.length; i++) {
    const camelKey = cols[i].replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    let val = row[i];
    if (['examples', 'word_ids', 'wordIds'].includes(cols[i]) || camelKey === 'wordIds' || camelKey === 'examples') {
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
      clause: `(${scope.map(() => '?').join(' OR ')})`,
      params: scope.map(() => userId),
    };
  }
  return { clause: `${scope} = ?`, params: [userId] };
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const { action, table, id, data } = await req.json();

  const info = TABLE_COLS[table];
  if (!info) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
  }

  const { cols, pk, userScope } = info;

  try {
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
        const snakeData = toSnakeObj(data);
        if (userScope === 'user_id') {
          snakeData.user_id = auth.userId;
        } else if (Array.isArray(userScope)) {
          // Set first user column as owner; rest come from client
          snakeData[userScope[0]] = auth.userId;
        }
        const colNames = Object.keys(snakeData);
        const placeholders = colNames.map(() => '?');
        const values = colNames.map((c) => snakeData[c]);
        await db.run(
          `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`,
          values
        );
        return NextResponse.json({ ok: true });
      }

      case 'put': {
        const u = buildUserClause(userScope, auth.userId);
        const idVal = data[pk] ?? data.id;
        let deleteSql: string;
        let deleteParams: unknown[];
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
        const colNames = Object.keys(snakeData);
        const placeholders = colNames.map(() => '?');
        const values = colNames.map((c) => snakeData[c]);
        await db.run(
          `INSERT INTO ${info.table} (${colNames.join(', ')}) VALUES (${placeholders.join(', ')})`,
          values
        );
        return NextResponse.json({ ok: true });
      }

      case 'update': {
        const snakeData = toSnakeObj(data);
        delete snakeData[pk];
        if (userScope === 'user_id') {
          delete snakeData.user_id;
        } else if (Array.isArray(userScope)) {
          for (const col of userScope) {
            delete snakeData[col];
          }
        }
        if (Object.keys(snakeData).length === 0) {
          return NextResponse.json({ ok: true });
        }
        const sets = Object.keys(snakeData).map((c) => `${c} = ?`);
        const values = Object.keys(snakeData).map((c) => snakeData[c]);
        const u = buildUserClause(userScope, auth.userId);
        await db.run(
          `UPDATE ${info.table} SET ${sets.join(', ')} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`,
          [...values, id, ...u.params]
        );
        return NextResponse.json({ ok: true });
      }

      case 'delete': {
        const u = buildUserClause(userScope, auth.userId);
        const sql = `DELETE FROM ${info.table} WHERE ${pk} = ?${u.clause ? ` AND ${u.clause}` : ''}`;
        await db.run(sql, [id, ...u.params]);
        return NextResponse.json({ ok: true });
      }

      case 'query': {
        const { field, op, value, orderBy, reverse, limit } = data || {};
        const snField = toSnake(field || '');
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
          sql += ` ORDER BY ${toSnake(orderBy)} ${reverse ? 'DESC' : 'ASC'}`;
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
          sql += ` ORDER BY ${toSnake(orderBy)} ${reverse ? 'DESC' : 'ASC'}`;
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
