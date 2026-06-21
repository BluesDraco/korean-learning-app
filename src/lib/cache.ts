const cache = new Map<string, { data: unknown; expiry: number; stale?: unknown }>();
const inflight = new Map<string, Promise<unknown>>();

export async function cached<T>(key: string, ttlMs: number, fetch: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  // Serve fresh cache
  if (existing && existing.expiry > Date.now()) {
    return existing.data as T;
  }

  // Deduplicate concurrent requests
  const prev = inflight.get(key);
  if (prev) return prev as Promise<T>;

  const promise = fetch()
    .then((data) => {
      cache.set(key, { data, expiry: Date.now() + ttlMs });
      inflight.delete(key);
      trim();
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      // On fetch failure, serve stale cache if available
      const stale = cache.get(key);
      if (stale) {
        stale.expiry = Date.now() + 5000; // Extend 5s to avoid hammering
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
