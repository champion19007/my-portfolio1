/* ============================================================
   media-lazy.js — load a video when it is actually going to be seen.

   The page measured 20.3 MB on first load, and 20.28 MB of that was
   video. None of it was necessary up front:

     - Every <video> carried `autoplay`, and autoplay downloads the whole
       file regardless of what `preload` says. `preload="metadata"` on all
       nine of them bought nothing.
     - The page holds two complete views, #portfolio-dark and
       #portfolio-light, and only one is ever displayed. `display: none`
       does not stop a video loading, so whichever theme you opened, you
       also paid for the other one's videos - about 8 MB of them.
     - Six of the nine are below the fold and most visitors never scroll
       to all of them.

   So the markup now carries `data-src` instead of `src` and no
   `autoplay`, and this file puts them back when a video is both inside a
   view that is actually displayed and near the viewport. Every one of
   them already had a `poster`, so there is an image in place the whole
   time and nothing looks empty while it waits.

   Nothing here is undone if the generator is run again - it would
   overwrite index.html and hand the videos back their `src`, at which
   point the page simply behaves as it did before.
   ============================================================ */
(function () {
  'use strict';

  var MARGIN = 300; // start fetching a little before it scrolls in

  /* Deliberately not IntersectionObserver. An observer only reports a
     box that the compositor is actually laying out, which makes it
     quietly conditional on things that have nothing to do with the page
     - and a <video> with no src has no intrinsic size, so several of
     these start life as zero-area elements an observer would never
     report at all. Measuring the geometry directly on scroll answers the
     one question being asked, in every browser, with no such edge. */

  function sourceFor(video) {
    if (video.dataset.src) return true;
    return !!video.querySelector('source[data-src]');
  }

  /* A video with no src may collapse to zero height, and a zero-height
     box is never "near the viewport" no matter where it sits. So the
     position is taken from the nearest ancestor that does have a box. */
  function boxFor(video) {
    var el = video;
    for (var i = 0; i < 4 && el; i++) {
      var r = el.getBoundingClientRect();
      if (r.height > 4 && r.width > 4) return el;
      el = el.parentElement;
    }
    return video.parentElement || video;
  }

  function isDisplayed(video) {
    /* offsetParent is null for anything inside display:none, which is
       exactly how the hidden theme's half of the page sits. Position
       fixed elements report null too, hence the second test. */
    if (video.offsetParent !== null) return true;
    return video.getClientRects().length > 0;
  }

  function isNear(video) {
    var r = boxFor(video).getBoundingClientRect();
    if (!r.width && !r.height) return false;
    return r.top < window.innerHeight + MARGIN && r.bottom > -MARGIN;
  }

  function load(video) {
    if (video.dataset.loaded === '1') return;

    var wanted = false;
    if (video.dataset.src) {
      video.src = video.dataset.src;
      wanted = true;
    }
    var sources = video.querySelectorAll('source[data-src]');
    for (var i = 0; i < sources.length; i++) {
      sources[i].src = sources[i].dataset.src;
      wanted = true;
    }
    if (!wanted) return;

    video.dataset.loaded = '1';
    video.preload = 'auto';
    video.load();

    /* Autoplay is refused often enough - a battery saver, a background
       tab - that the promise has to be caught, or a decorative loop
       becomes an unhandled rejection in the console. */
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  function watch() {
    var all = document.querySelectorAll('video');
    var pending = [];
    for (var i = 0; i < all.length; i++) {
      if (sourceFor(all[i])) pending.push(all[i]);
    }
    if (!pending.length) return;

    var queued = false;

    function sweep() {
      queued = false;
      for (var j = pending.length - 1; j >= 0; j--) {
        var v = pending[j];
        if (v.dataset.loaded === '1') {
          pending.splice(j, 1);
          continue;
        }
        if (!isDisplayed(v)) continue; // the other theme
        if (!isNear(v)) continue;
        load(v);
        pending.splice(j, 1);
      }
      if (!pending.length) stop();
    }

    /* Scroll fires far faster than anything needs to be measured, and
       reading geometry inside the handler would force layout on every
       one of them, so a burst is collapsed into one measurement.

       A timer rather than requestAnimationFrame: rAF is tied to painting
       and stops entirely in a background tab, which would leave a video
       that scrolled into view during a theme change or a resize waiting
       indefinitely. Nothing here is being drawn - it is deciding whether
       to start a download - so it has no reason to wait for a frame. */
    function schedule() {
      if (queued) return;
      queued = true;
      setTimeout(sweep, 60);
    }

    function stop() {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      themeWatch.disconnect();
    }

    /* Switching theme swaps which half of the page is displayed, without
       any scrolling, so the newly shown videos need their own nudge. */
    var themeWatch = new MutationObserver(schedule);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    themeWatch.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
      subtree: true,
    });

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });

    sweep();
    /* The generated JS sizes some of these boxes after load, so measure
       again once that has settled rather than only at DOMContentLoaded. */
    addEventListener('load', schedule);
    setTimeout(schedule, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watch);
  } else {
    watch();
  }
})();
