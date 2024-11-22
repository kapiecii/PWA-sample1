const CACHE_NAME = 'todo-cache-v3';
const urlsToCache = [
  './',                // ルートパス
  './style.css',       // スタイルシート
  './app.js',          // アプリのJavaScript
  './manifest.json',   // マニフェスト
  './icon-192x192.png',// アイコン
  './icon-512x512.png' // アイコン
];

// キャッシュするリソースを登録
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// キャッシュされたリソースを提供
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
