'use client';

import { useEffect, useRef, useState } from 'react';

/* The light theme's background is a video - pale low-poly crystals drifting
   over white. It is 6 MB, which is far too much to spend on someone who
   never sees it, and most never will: the site opens in dark mode. So the
   element is only mounted once the document is actually light, which is
   also when the download starts.

   The theme is watched rather than subscribed to. The toggle in the navbar
   adds and removes a class on <html> and there is no provider to listen to,
   so a MutationObserver on that one attribute is the honest way to follow
   it - and it keeps working if the theme is ever changed from anywhere else.

   It stands down entirely for anyone who has asked for less motion, and for
   anyone whose browser reports a metered or slow connection. In those cases
   the flat tint underneath is the background, which is most of what the
   clip is made of anyway, so nothing looks broken. */
export function LightVideoBackground() {
  const [active, setActive] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const thrifty = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''));
    if (reduced || thrifty) return;

    const read = () => setActive(!document.documentElement.classList.contains('dark'));
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  /* Autoplay is refused often enough - a background tab, a battery-saver
     setting - that the promise has to be caught, or it surfaces as an
     unhandled rejection in the console for something entirely cosmetic. */
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active) void el.play().catch(() => {});
    else el.pause();
  }, [active]);

  return (
    <div aria-hidden className="lightbg">
      {active && (
        <video
          ref={video}
          className="lightbg-video"
          src="/video/light-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      )}
      {/* The clip carries near-black facet edges. Body text has to win over
          them, so the picture is read through a scrim rather than directly:
          heavier at the top and bottom, where the navbar and the footer sit,
          and thinnest through the middle where the cards do the work. */}
      <div className="lightbg-scrim" />
    </div>
  );
}
