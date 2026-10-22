/* Replaces the old Tiger service worker on devices that installed it:
   clears its offline copy, removes itself, and sends open tabs to Tigrify. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('tiger-')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const tabs = await self.clients.matchAll({ type: 'window' });
    tabs.forEach((tab) => tab.navigate('https://irfannaaz.github.io/tigrify/'));
  })());
});
