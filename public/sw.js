// v24 — 纯自杀。不拦截任何请求, 激活后清缓存+卸载自身。
// 没有 skipWaiting, 不触发 controllerchange, 不产生 reload 循环。
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    .then(() => self.registration.unregister())
  );
});
