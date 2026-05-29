import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

const TABLE_COLS: Record<string, { cols: string[]; pk: string; table: string }> = {
  words: {
    table: 'user_words',
    cols: ['id', 'user_id', 'word', 'pronunciation', 'meaning', 'part_of_speech', 'examples', 'source_entry_id', 'source_video_id', 'source_subtitle_id', 'mastery', 'srs_level', 'next_review', 'ease_factor', 'interval', 'created_at', 'last_reviewed'],
    pk: 'id',
  },
  reviewSessions: {
    table: 'review_sessions',
    cols: ['id', 'user_id', 'date', 'words_reviewed', 'words_passed', 'duration', 'xp_earned'],
    pk: 'id',
  },
  dictationRecords: {
    table: 'dictation_records',
    cols: ['id', 'user_id', 'word_id', 'date', 'correct', 'user_input'],
    pk: 'id',
  },
  shadowingRecords: {
    table: 'shadowing_records',
    cols: ['id', 'user_id', 'subtitle_id', 'date', 'score'],
    pk: 'id',
  },
  userProfiles: {
    table: 'user_profiles',
    cols: ['id', 'user_id', 'nickname', 'level', 'xp', 'xp_to_next_level', 'streak', 'longest_streak', 'last_study_date', 'target_level', 'daily_goal_minutes', 'daily_goal_words', 'current_unit', 'onboarding_complete', 'created_at', 'is_ambassador', 'ambassador_since', 'ambassador_reason', 'share_enabled', 'share_token'],
    pk: 'id',
  },
  dailyLogs: {
    table: 'daily_logs',
    cols: ['id', 'user_id', 'date', 'words_learned', 'words_reviewed', 'dictations_done', 'shadowing_done', 'minutes_studied', 'xp_earned'],
    pk: 'id',
  },
  achievements: {
    table: 'achievements',
    cols: ['id', 'user_id', 'type', 'earned_at'],
    pk: 'id',
  },
  settings: {
    table: 'app_settings',
    cols: ['id', 'user_id', 'daily_word_goal', 'review_batch_size', 'default_playback_rate', 'theme'],
    pk: 'id',
  },
  wordBooks: {
    table: 'word_books',
    cols: ['id', 'user_id', 'name', 'description', 'word_ids', 'color', 'created_at', 'updated_at'],
    pk: 'id',
  },
  studyVideos: {
    table: 'study_videos',
    cols: ['id', 'user_id', 'url', 'platform', 'platform_id', 'title', 'thumbnail', 'subtitle_source', 'added_at', 'last_studied_at'],
    pk: 'id',
  },
  studySubtitles: {
    table: 'study_subtitles',
    cols: ['id', 'user_id', 'video_id', 'index', 'start', 'end', 'text', 'text_zh', 'tokens'],
    pk: 'id',
  },
  studyLogs: {
    table: 'study_logs',
    cols: ['id', 'user_id', 'action', 'details', 'xp_earned', 'created_at'],
    pk: 'id',
  },
  videoStudyLogs: {
    table: 'video_study_logs',
    cols: ['id', 'user_id', 'video_id', 'date', 'duration_sec', 'words_added', 'sentences_looped', 'action'],
    pk: 'id',
  },
  userAchievements: {
    table: 'user_achievements',
    cols: ['id', 'user_id', 'achievement_type', 'achieved_at', 'is_card_generated'],
    pk: 'id',
  },
  userShareLinks: {
    table: 'user_share_links',
    cols: ['id', 'user_id', 'token', 'expires_at', 'is_active', 'created_at'],
    pk: 'id',
  },
  stickerPacks: {
    table: 'sticker_packs',
    cols: ['id', 'name', 'description', 'cover_image', 'published_at', 'is_active'],
    pk: 'id',
  },
  stickers: {
    table: 'stickers',
    cols: ['id', 'pack_id', 'image_url', 'caption_zh', 'caption_ko', 'sort_order'],
    pk: 'id',
  },
  stickerDownloads: {
    table: 'sticker_downloads',
    cols: ['id', 'pack_id', 'user_id', 'downloaded_at'],
    pk: 'id',
  },
  buddyRelations: {
    table: 'buddy_relations',
    cols: ['id', 'user_a_id', 'user_b_id', 'status', 'created_at'],
    pk: 'id',
  },
  buddyInvites: {
    table: 'buddy_invites',
    cols: ['id', 'user_id', 'invite_token', 'learning_goal', 'level', 'daily_minutes', 'intro', 'expires_at'],
    pk: 'id',
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
    // Convert snake_case back to camelCase for JSON response
    const camelKey = cols[i].replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    let val = row[i];
    // Parse JSON fields
    if (['examples', 'word_ids', 'wordIds'].includes(cols[i]) || camelKey === 'wordIds' || camelKey === 'examples') {
      try { val = JSON.parse(val as string); } catch { /* keep raw */ }
    }
    obj[camelKey] = val;
  }
  return obj;
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

  const { cols, pk } = info;

  try {
    switch (action) {
      case 'getAll': {
        const result = await db.exec(
          `SELECT ${cols.join(', ')} FROM ${info.table} WHERE user_id = ?`,
          [auth.userId]
        );
        const rows = result[0]?.values.map((r: unknown[]) => rowToObj(cols, r)) ?? [];
        return NextResponse.json(rows);
      }

      case 'get': {
        const result = await db.exec(
          `SELECT ${cols.join(', ')} FROM ${info.table} WHERE ${pk} = ? AND user_id = ?`,
          [id, auth.userId]
        );
        const row = result[0]?.values[0];
        return NextResponse.json(row ? rowToObj(cols, row) : null);
      }

      case 'add': {
        const snakeData = toSnakeObj(data);
        snakeData.user_id = auth.userId;
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
        // Upsert — delete old then insert
        await db.run(`DELETE FROM ${info.table} WHERE ${pk} = ? AND user_id = ?`, [data[pk] ?? data.id, auth.userId]);
        const snakeData = toSnakeObj(data);
        snakeData.user_id = auth.userId;
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
        delete snakeData.user_id; // don't overwrite user_id
        if (Object.keys(snakeData).length === 0) {
          return NextResponse.json({ ok: true });
        }
        const sets = Object.keys(snakeData).map((c) => `${c} = ?`);
        const values = Object.keys(snakeData).map((c) => snakeData[c]);
        await db.run(
          `UPDATE ${info.table} SET ${sets.join(', ')} WHERE ${pk} = ? AND user_id = ?`,
          [...values, id, auth.userId]
        );
        return NextResponse.json({ ok: true });
      }

      case 'delete': {
        await db.run(`DELETE FROM ${info.table} WHERE ${pk} = ? AND user_id = ?`, [id, auth.userId]);
        return NextResponse.json({ ok: true });
      }

      case 'query': {
        const { field, op, value, orderBy, reverse, limit } = data || {};
        const snField = toSnake(field || '');
        const opMap: Record<string, string> = { eq: '=', lt: '<', lte: '<=', gt: '>', gte: '>=' };
        let sql = `SELECT ${cols.join(', ')} FROM ${info.table} WHERE user_id = ?`;
        const params: unknown[] = [auth.userId];

        if (op === 'in' && Array.isArray(value)) {
          const placeholders = value.map(() => '?').join(', ');
          sql += ` AND ${snField} IN (${placeholders})`;
          params.push(...value);
        } else if (op && op in opMap) {
          sql += ` AND ${snField} ${opMap[op]} ?`;
          params.push(value);
        } else {
          sql += ` AND ${snField} = ?`;
          params.push(value);
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
        let sql = `SELECT ${cols.join(', ')} FROM ${info.table} WHERE user_id = ?`;
        const params: unknown[] = [auth.userId];
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
        const result = await db.exec(
          `SELECT COUNT(*) FROM ${info.table} WHERE user_id = ?`,
          [auth.userId]
        );
        return NextResponse.json({ count: result[0]?.values[0]?.[0] ?? 0 });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
