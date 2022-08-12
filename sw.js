const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v2");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/images/websiteicon.png",
      "/scripts/networkstatus.js",
      "/scripts/infoToggle.js",
      "/styles/style.css",
      "/index.html",
    ])
  );
});

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  
  try {
    return fetch(request);
  }
  catch(error) {
    return new Response('There was a network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});