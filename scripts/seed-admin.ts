import initSqlJs from 'sql.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

async function main() {
  const [,, username, password] = process.argv;
  if (!username || !password) {
    console.log('用法: npx tsx scripts/seed-admin.ts <用户名> <密码>');
    process.exit(1);
  }

  const DB_PATH = path.join(process.cwd(), 'data', 'app.db');
  const SQL = await initSqlJs();

  let db;
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } catch {
    db = new SQL.Database();
  }

  db.run('PRAGMA foreign_keys=ON');
  db.run(`
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

  const existing = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length > 0 && existing[0].values.length > 0) {
    console.log(`用户 "${username}" 已存在，跳过。`);
  } else {
    const hash = await bcrypt.hash(password, 10);
    const now = Date.now();
    db.run(
      'INSERT INTO users (id, username, password_hash, nickname, email, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [crypto.randomUUID(), username, hash, '管理员', '', 'admin', now, now]
    );
    const data = db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
    console.log(`管理员 "${username}" 创建成功！`);
  }

  db.close();
}

main();
