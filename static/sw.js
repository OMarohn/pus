importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  console.log('na fein WS/WB ist geladen')
  const staticRoutes = [
    'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://unpkg.com/animate.css@3.5.1/animate.min.css',
    'https://code.jquery.com/jquery-3.1.1.slim.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://www.google.com/recaptcha/api.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js'

  ];
  for (let i = 0; i < staticRoutes.length; i++) {
    workbox.routing.registerRoute(
      staticRoutes[i],
      workbox.strategies.staleWhileRevalidate(),
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

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

console.log('Hallo SW aus static/MAIN ist da !');
