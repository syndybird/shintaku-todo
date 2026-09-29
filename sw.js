/* SHINTAKU ToDo Service Worker
 * 画面ファイルだけを保存して起動を速くする（データはいつもサーバーから取得）
 * 画面を更新したら VERSION を上げる */
const VERSION = 'shintaku-todo-v1.18';
const SHELL = ['./', './index.html', './manifest.webmanifest', './logo.png', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // APIやフォントは素通し
  // 画面は「ネット優先・だめなら保存分」。更新がすぐ反映され、電波が弱くても開ける
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
