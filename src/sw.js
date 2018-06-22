importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

  console.log('WB geladen')
  workbox.googleAnalytics.initialize();
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  const staticRoutes = [
    'https://cdn.polyfill.io/v2/polyfill.min.js',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css',
    'https://unpkg.com/animate.css@3.5.1/animate.min.css',
    'https://code.jquery.com/jquery-3.1.1.slim.min.js',
    'https://www.google.com/recaptcha/api.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js'
  ];
  for (let i = 0; i < staticRoutes.length; i++) {
    workbox.routing.registerRoute(
      staticRoutes[i],
      workbox.strategies.cacheFirst({
        cacheName: 'stuff'
      }),
    );
  }

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 120,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:json)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'data'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        })
      ]
    })
  );

  // WebPush
  self.addEventListener('push', pushEvent => {
    const data = pushEvent.data.json()
    console.log('Event ', data)

    pushEvent.waitUntil(
      self.registration.showNotification(data.title, {
        data: { url: data.url },
        body: 'Demo PUS',
        icon:
          'data:image/gif;base64,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'
      })
    )
  })

  self.addEventListener('notificationclick', function(clickEvent) {
    clickEvent.notification.close()
    if (clickEvent.notification.data.url) {
      clickEvent.waitUntil(clients.openWindow(clickEvent.notification.data.url));
    }
  })

} else {
  console.log(`Kein Serviceworker geladen!`);
}
