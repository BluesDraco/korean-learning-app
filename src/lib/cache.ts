const cache = new Map<string, { data: unknown; expiry: number }>();
const inflight = new Map<string, Promise<unknown>>();

let trimCounter = 0;

export async function cached<T>(key: string, ttlMs: number, fetch: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  if (existing && existing.expiry > Date.now()) {
    return existing.data as T;
  }

  const prev = inflight.get(key);
  if (prev) return prev as Promise<T>;

  const promise = fetch()
    .then((data) => {
      cache.set(key, { data, expiry: Date.now() + ttlMs });
      inflight.delete(key);
      if (++trimCounter % 10 === 0) trim();
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      const stale = cache.get(key);
      if (stale) {
        stale.expiry = Date.now() + 5000;
        return stale.data as T;
      }
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}

export function clearCache() {
  cache.clear();
}

function trim() {
  if (cache.size <= 500) return;
  const entries = [...cache.entries()].sort((a, b) => b[1].expiry - a[1].expiry);
  cache.clear();
  for (const [k, v] of entries.slice(0, 400)) cache.set(k, v);
}
