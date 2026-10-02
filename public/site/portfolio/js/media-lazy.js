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
   `autoplay`, and this file decides when to put them back. Every one of
   them already had a `poster`, so there is an image in place the whole
   time and nothing looks empty while it waits.

   On a desktop it puts all of them back at once, in order, because the
   reasoning above is about a phone's data plan and a phone's memory. On
   a desktop the deferral is simply felt as lag: you scroll, and the
   section you arrive at is still buffering. So that machine takes the
   lot up front and scrolls through a page that is already there.

   Everywhere else - a phone, a metered connection, anything reporting 2g
   or saveData - a video is put back when it is both inside a view that is
   actually displayed and near the viewport.

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

  /* Is this a machine that can simply have all of it?

     The deferral below exists because the page is 22 MB of video and six
     of the nine are below the fold. That reasoning holds on a phone, on a
     metered connection, and nowhere else. On a desktop the deferral is
     the thing you feel: each video starts downloading as it scrolls into
     view, so scrolling is punctuated by sections that are still buffering
     when you reach them.

     A fine primary pointer plus a wide window is a mouse on a real
     screen. saveData and effectiveType are Chromium-only and undefined
     everywhere else, so they can only ever veto - absence is not
     evidence of a fast connection, but presence of "2g" is evidence of a
     slow one. */
  function isDesktop() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    if (c.saveData === true) return false;
    if (/^(slow-2g|2g|3g)$/.test(c.effectiveType || '')) return false;
    if (!window.matchMedia) return false;
    return matchMedia('(pointer: fine)').matches && innerWidth >= 1024;
  }

  /* Load everything, now, one at a time.

     One at a time and not all nine at once: nine parallel downloads share
     the same pipe, so the hero - the one thing somebody is actually
     looking at - would finish last instead of first. Sequential means the
     top of the page plays immediately and the rest fill in behind, which
     is the whole point.

     The queue advances on canplaythrough, the event that means "enough of
     this is buffered to play it through", with a timeout in case a video
     stalls or the browser never gets around to firing it. A stalled file
     must not hold up the other eight. */
  function eager(pending) {
    var here = [], there = [];
    for (var i = 0; i < pending.length; i++) {
      (isDisplayed(pending[i]) ? here : there).push(pending[i]);
    }
    /* The displayed theme first, in document order. The other theme's
       half of the page is real and one toggle away, so it is fetched too
       - just last, behind everything anyone can currently see. */
    var queue = here.concat(there);

    var n = 0;
    (function next() {
      if (n >= queue.length) return;
      var v = queue[n++];
      var moved = false;
      function go() {
        if (moved) return;
        moved = true;
        v.removeEventListener('canplaythrough', go);
        v.removeEventListener('error', go);
        setTimeout(next, 0);
      }
      v.addEventListener('canplaythrough', go);
      v.addEventListener('error', go);
      setTimeout(go, 6000);
      load(v);
    })();
  }

  function watch() {
    var all = document.querySelectorAll('video');
    var pending = [];
    for (var i = 0; i < all.length; i++) {
      if (sourceFor(all[i])) pending.push(all[i]);
    }
    if (!pending.length) return;

    /* On a desktop there is nothing to defer: take the lot and skip the
       scroll machinery entirely. */
    if (isDesktop()) { eager(pending); return; }

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
