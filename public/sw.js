const CACHE_NAME = 'korean-learn-v20';
const STATIC_EXTS = /\.(js|css|png|jpg|svg|ico|woff2?|ttf)$/;
const OFFLINE_URL = '/offline.html';

// 只缓存「同源 + 状态 200 + 非 opaque」的响应。
// 旧版直接 cache.put 任何响应(含 404/500/半截),坏文件被永久缓存 = 冷启动白屏元凶。
function isCacheable(response) {
  return response && response.status === 200 && response.type === 'basic';
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // 升版本(v18→v19)时清掉所有旧缓存,把旧 SW 缓存的坏文件一次性清干净
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 静态资源:stale-while-revalidate —— 先给缓存(秒开),同时后台拉新的更新缓存,
  // 下次冷启动就是新文件。彻底告别 cache-first「永不更新 + 坏文件锁死」。
  if (STATIC_EXTS.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const network = fetch(event.request).then((response) => {
            if (isCacheable(response)) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached); // 网络失败且无缓存时返回 undefined,浏览器按正常失败处理
          return cached || network;
        })
      )
    );
    return;
  }

  // 导航请求(HTML):network-first + 3s 超时兜底。
  // 旧版 fetch 无超时,网络卡住时会无限等 = 另一种白屏。超时/失败都回离线页。
  if (event.request.mode === 'navigate') {
    event.respondWith(
      new Promise((resolve) => {
        let done = false;
        const timer = setTimeout(() => {
          if (!done) { done = true; caches.match(OFFLINE_URL).then(resolve); }
        }, 3000);
        fetch(event.request).then((response) => {
          if (!done) { done = true; clearTimeout(timer); resolve(response); }
        }).catch(() => {
          if (!done) { done = true; clearTimeout(timer); caches.match(OFFLINE_URL).then(resolve); }
        });
      })
    );
    return;
  }

  // API / RSC: network-only (不缓存)
});
