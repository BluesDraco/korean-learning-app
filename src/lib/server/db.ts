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
