const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'app.js',
    'css/materialize.css',
    'css/materialize.min.css',
    'css/style.css',
    'js/init.js',
    'js/materialize.js',
    'js/materialize.min.js',
    'manifest.webmanifest'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('evento de ativação');
});

