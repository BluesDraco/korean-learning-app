// 持久化会话进度（真题、review、flashcards、reading）。
// 用 localStorage 而不是 sessionStorage：关标签/切 App 后重进能恢复。
// 加 expiresAt 过期字段，避免长期堆积。

interface Wrapped<T> {
  v: T;
  expiresAt: number;
}

export function saveProgress<T>(key: string, value: T, ttlMs: number): void {
  if (typeof window === 'undefined') return;
  try {
    const wrapped: Wrapped<T> = { v: value, expiresAt: Date.now() + ttlMs };
    localStorage.setItem(key, JSON.stringify(wrapped));
  } catch { /* quota exceeded / disabled */ }
}

export function loadProgress<T>(key: string, ttlMs?: number): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const wrapped = JSON.parse(raw) as Wrapped<T>;
    if (!wrapped || typeof wrapped.expiresAt !== 'number') return null;
    if (Date.now() > wrapped.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    // 每次成功读取自动续期：活跃用户进度永不过期，只有真正放弃的才过期
    if (ttlMs && Date.now() + ttlMs * 0.5 > wrapped.expiresAt) {
      wrapped.expiresAt = Date.now() + ttlMs;
      try { localStorage.setItem(key, JSON.stringify(wrapped)); } catch { /* ignore */ }
    }
    return wrapped.v;
  } catch { return null; }
}

export function clearProgress(key: string): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

// 按前缀列举所有未过期条目，用于"继续未完成"入口。过期条目顺手清理。
export function listProgressByPrefix<T>(prefix: string): Array<{ key: string; value: T; expiresAt: number }> {
  if (typeof window === 'undefined') return [];
  const out: Array<{ key: string; value: T; expiresAt: number }> = [];
  try {
    const now = Date.now();
    // Collect all keys first to avoid index-shifting bug when deleting during iteration
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    const toDelete: string[] = [];
    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const wrapped = JSON.parse(raw) as Wrapped<T>;
        if (!wrapped || typeof wrapped.expiresAt !== 'number') continue;
        if (now > wrapped.expiresAt) { toDelete.push(key); continue; }
        out.push({ key, value: wrapped.v, expiresAt: wrapped.expiresAt });
      } catch { /* 单条坏了不影响其它 */ }
    }
    toDelete.forEach(k => localStorage.removeItem(k));
  } catch { /* ignore */ }
  return out;
}

// 常量 TTL
export const TTL_EXAM = 6 * 60 * 60 * 1000;      // 真题/review：6 小时
export const TTL_RESULT = 30 * 24 * 60 * 60 * 1000; // 考试结果：30 天
export const TTL_FLASHCARD = 30 * 24 * 60 * 60 * 1000;  // 词卡/阅读：30 天，每次读取自动续期
