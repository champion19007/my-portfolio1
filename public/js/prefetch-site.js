/* ============================================================
   prefetch-site.js — warm the written site while the game is idle.

   The game and the written site are two doors into the same place, and
   most people who open one open the other. The game finishes loading its
   own assets and then sits there: someone is reading the menu, or
   walking around, and the network is doing nothing at all. That idle
   stretch is free bandwidth, and the site on the other side of the
   "Normal site" button is 22 MB of video that otherwise starts
   downloading from cold the moment they arrive.

   So this fetches it during the quiet, into the HTTP cache. Nothing is
   kept in memory - each response is drained and dropped, and what
   remains is the cache entry, which is what /site's own <video> requests
   hit when it opens.

   It starts on 'tco-ready', which game.js fires when the loading screen
   comes down. Not before: the game's own stages are streaming until
   then, and racing them would make the thing the visitor is actually
   looking at slower in order to speed up a page they have not asked for
   yet.
   ============================================================ */
(function () {
  'use strict';

  /* Measured, not estimated - these are the files on disk. Sizes are in
     MB, `fold` is whether it is the first thing you see in that theme. */
  var VIDEOS = [
    { url: '/site/portfolio/videos/hero.mp4',                             mb: 11.81, theme: 'dark',  fold: true  },
    { url: '/site/portfolio/videos/Illustration_1_anubis.mp4',            mb: 0.65,  theme: 'dark',  fold: false },
    { url: '/site/portfolio/videos/Coin.mp4',                             mb: 0.29,  theme: 'dark',  fold: false },
    { url: '/site/portfolio/videos/Illustration_3_anubis.mp4',            mb: 0.85,  theme: 'dark',  fold: false },
    { url: '/site/portfolio/videos/Headervideo.f31b35a8331a4491b12b.mp4', mb: 4.82,  theme: 'light', fold: true  },
    { url: '/site/portfolio/videos/cardvideo1.b78645fda63acc4bf351.mp4',  mb: 0.82,  theme: 'light', fold: false },
    { url: '/site/portfolio/videos/cardvideo2.9be2d42e7cd327fd10a8.mp4',  mb: 1.91,  theme: 'light', fold: false },
    { url: '/site/portfolio/videos/cardvideo3.49ae60448d7c0aec2779.mp4',  mb: 0.90,  theme: 'light', fold: false },
  ];

  /* The page and everything that blocks its first paint. Together well
     under a megabyte, and warming them is what makes /site appear at
     once rather than after a round trip. */
  var DOCS = [
    '/site/index.html',
    '/site/portfolio/css/portfolio.css',
    '/site/portfolio/css/dark-theme.css',
    '/site/portfolio/css/light-theme.css',
    '/site/portfolio/css/responsive.css',
    '/site/portfolio/js/jquery-3.7.1.min.js',
    '/site/portfolio/js/swiper-bundle.min.js',
    '/site/portfolio/js/portfolio.js',
    '/site/portfolio/js/media-lazy.js',
  ];

  /* /site reads this key to decide which half of itself to show, and
     falls back to dark. Reading the same key is what lets the plan fetch
     the theme they will actually land in rather than guessing. */
  function landingTheme() {
    try {
      var t = localStorage.getItem('portfolio_theme');
      if (t === 'light' || t === 'dark') return t;
    } catch (e) {}
    return 'dark';
  }

  /* navigator.connection is Chromium-only; Safari and Firefox report
     nothing at all, so every field here can be undefined and the plan
     has to read it as "unknown", not as "fine". */
  function connection() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    return {
      saveData: c.saveData === true,
      effectiveType: c.effectiveType || null,   // 'slow-2g' | '2g' | '3g' | '4g' | null
      downlinkMbps: typeof c.downlink === 'number' ? c.downlink : null,
      known: !!c.effectiveType,
    };
  }

  /* ----------------------------------------------------------
     TODO(human)

     Decide what actually gets warmed, and in what order.

     Return an array of URL strings. Return [] to prefetch nothing.

     Arguments:
       net    - { saveData, effectiveType, downlinkMbps, known } as above
       theme  - 'dark' or 'light': the theme /site will open in
       videos - the VIDEOS array above: { url, mb, theme, fold }
       docs   - the DOCS array above: the page, its CSS and its JS

     Worth weighing:
       - hero.mp4 is 11.81 MB on its own, more than half of all the video
         on the site, and it is the first thing a dark-theme visitor sees.
       - The whole catalogue is 22 MB. Some of these visitors are on a
         phone plan, and none of them asked for the written site yet.
       - Things are fetched in the order returned, one at a time, so the
         order is the priority. What should arrive first?
       - Is there a connection where the right answer is the documents
         only, or nothing at all?
     ---------------------------------------------------------- */
  function planPrefetch(net, theme, videos, docs) {

  }

  /* ---------------------------------------------------------- */

  /* Drained chunk by chunk and discarded. The point is the cache entry,
     not the bytes - holding a 12 MB arrayBuffer to throw it away would
     be the same download and a large allocation on top. */
  function warm(url, signal) {
    return fetch(url, { signal: signal, credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok || !res.body) return;
        var reader = res.body.getReader();
        return (function pump() {
          return reader.read().then(function (r) {
            return r.done ? undefined : pump();
          });
        })();
      })
      .catch(function () {
        /* A prefetch is an optimisation, and an optimisation that fails
           is not an error anyone should hear about. */
      });
  }

  function start() {
    var plan = planPrefetch(connection(), landingTheme(), VIDEOS, DOCS);
    if (!plan || !plan.length) return;

    var ac = typeof AbortController === 'function' ? new AbortController() : null;
    var signal = ac ? ac.signal : undefined;

    /* If they click through mid-prefetch, /site is loading for real and
       these background fetches are now competing with the page the
       visitor is looking at. Drop them. */
    addEventListener('pagehide', function () { if (ac) ac.abort(); });

    var i = 0;
    (function next() {
      if (i >= plan.length) return;
      var url = plan[i++];
      warm(url, signal).then(function () {
        /* One at a time, and yielding between them. Eight parallel
           fetches would saturate the connection the game is still using
           for anything it streams later, and would arrive in no
           particular order - which defeats the point of an order. */
        setTimeout(next, 0);
      });
    })();
  }

  /* game.js fires this when the loading screen comes down. The timeout
     is the safety net: if the game fails to boot at all, the written
     site is exactly where that visitor is about to go. */
  var fired = false;
  function once() {
    if (fired) return;
    fired = true;
    if (typeof requestIdleCallback === 'function') requestIdleCallback(start, { timeout: 2000 });
    else setTimeout(start, 500);
  }
  addEventListener('tco-ready', once);
  setTimeout(once, 15000);
})();
