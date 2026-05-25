import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import crypto from 'crypto';

async function main() {
  const [, , username, password] = process.argv;
  if (!username || !password) {
    console.log('用法: npx tsx scripts/seed-admin.ts <用户名> <密码>');
    process.exit(1);
  }

  const url = process.env.TURSO_DATABASE_URL;
  const client = createClient({
    url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
    ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      nickname TEXT DEFAULT '',
      email TEXT DEFAULT '',
      role TEXT DEFAULT 'user',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);

  const existing = await client.execute({
    sql: 'SELECT id FROM users WHERE username = ?',
    args: [username],
  });

  if (existing.rows.length > 0) {
    console.log(`用户 "${username}" 已存在，跳过。`);
  } else {
    const hash = await bcrypt.hash(password, 10);
    const now = Date.now();
    await client.execute({
      sql: 'INSERT INTO users (id, username, password_hash, nickname, email, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: [crypto.randomUUID(), username, hash, '管理员', '', 'admin', now, now],
    });
    console.log(`管理员 "${username}" 创建成功！`);
  }

  client.close();
}

main();
