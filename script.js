var staticAssetsCacheName = 'todo-assets-v3';
var dynamicCacheName = 'todo-dynamic-v3';

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticAssetsCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/2_cyberroomfortis.png',
                '/original-adb8eff4f5988e4cd53970eaa10544b8.png',
                '/primery-sajtov-vizitok1-min.png',
                '/i.jpg',
                // Добавьте другие необходимые статики, например, Bootstrap, если он локальный
            ]);
        }).catch((error) => {
            console.log('Error caching static assets:', error);
        })
    );
});

self.addEventListener('activate', function (event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return (cacheName.startsWith('todo-')) && cacheName !== staticAssetsCacheName;
                })
                .map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).catch((error) => {
            console.log('Some error occurred while removing existing cache:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
                .then((fetchResponse) => {
                    return cacheDynamicRequestData(dynamicCacheName, event.request, fetchResponse.clone());
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        })
    );
});

function cacheDynamicRequestData(dynamicCacheName, request, fetchResponse) {
    return caches.open(dynamicCacheName)
        .then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
        }).catch((error) => {
            console.log(error);
        });
}