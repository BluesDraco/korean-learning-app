interface Bucket {
  count: number;
  resetAt: number;
  blockedUntil: number;
}

const store = new Map<string, Bucket>();

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 5 * 60 * 1000;       // 5 minutes
const BLOCK_MS = 15 * 60 * 1000;       // 15 minutes

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, b] of store) {
    if (now > b.blockedUntil && now > b.resetAt) store.delete(key);
  }
}, 10 * 60 * 1000).unref();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  let bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS, blockedUntil: 0 };
    store.set(key, bucket);
  }

  if (now < bucket.blockedUntil) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.blockedUntil - now) / 1000) };
  }

  bucket.count++;

  if (bucket.count > MAX_ATTEMPTS) {
    bucket.blockedUntil = now + BLOCK_MS;
    return { allowed: false, retryAfterSeconds: Math.ceil(BLOCK_MS / 1000) };
  }

  return { allowed: true };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}
