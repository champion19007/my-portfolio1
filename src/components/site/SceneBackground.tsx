'use client';

import { useEffect, useRef, useState } from 'react';

/* Both themes have a picture behind them now, and they are different
   pictures: light gets the video of pale crystals over white, dark gets
   the violet crystal still. The still is a placeholder for a clip that is
   coming, so the dark branch is shaped the same way as the light one and
   swapping an <img> for a <video> is the whole change.

   Only the one in use is ever in the DOM. The video is 6 MB and the still
   is 270 KB, and nobody should pay for the theme they are not looking at,
   so the theme is watched rather than both being mounted and hidden. The
   navbar toggle adds and removes a class on <html> and there is no
   provider to subscribe to, which is why this is a MutationObserver.

   The video stands down for prefers-reduced-motion and for browsers
   reporting a metered or slow connection; the still does not, because a
   single image is not motion and costs almost nothing. */
export function SceneBackground() {
  const [dark, setDark] = useState<boolean | null>(null);
  const [motionOk, setMotionOk] = useState(true);
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const thrifty = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''));
    setMotionOk(!reduced && !thrifty);

    const read = () => setDark(document.documentElement.classList.contains('dark'));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  /* Autoplay is refused often enough - a background tab, a battery saver -
     that the promise has to be caught, or a purely decorative thing turns
     into an unhandled rejection in the console. */
  useEffect(() => {
    const el = video.current;
    if (el && dark === false && motionOk) void el.play().catch(() => {});
  }, [dark, motionOk]);

  return (
    <div aria-hidden className="scene">
      {dark === false && motionOk && (
        <video
          ref={video}
          className="scene-media"
          src="/video/light-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      )}
      {dark === true && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="scene-media" src="/img/dark-bg.jpg" alt="" />
      )}
      <div className="scene-scrim" />
    </div>
  );
}
