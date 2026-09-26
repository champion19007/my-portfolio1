'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/* The reference's signature move: a paragraph starts dim and fills in word
   by word as it crosses the screen, so the sentence is still arriving
   while you read it.

   It is done on scroll rather than on a timer, because a timer would
   either finish before a slow reader arrives or still be running when a
   fast one has left. The progress of the block through a band in the
   middle of the viewport drives how many words are lit.

   Everything is written straight to style on each word rather than through
   React state: one paragraph is thirty-odd words and this runs on every
   scroll frame, so a re-render per word per frame is the one thing it
   cannot afford. For prefers-reduced-motion the whole thing is simply lit
   from the start - the words are the content, and none of this is. */
export function RevealText({
  text,
  className,
  as: Tag = 'p',
}: {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'div';
}) {
  const host = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>('.reveal-word'));
    if (!words.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => (w.style.opacity = '1'));
      return;
    }

    const scroller = document.querySelector('main') ?? window;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      /* 0 when the block's top is still below three quarters of the
         screen, 1 once it has climbed past a quarter. */
      const raw = (vh * 0.78 - r.top) / (vh * 0.52);
      const progress = Math.min(1, Math.max(0, raw));
      const lit = progress * words.length;

      words.forEach((w, i) => {
        const amount = Math.min(1, Math.max(0, lit - i));
        w.style.opacity = String(0.22 + amount * 0.78);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [text]);

  return (
    <Tag
      ref={host as React.Ref<never>}
      className={cn(className)}
      /* The whole string is still in the DOM as text, so it is one
         paragraph to a screen reader and to anyone who copies it. */
    >
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-word" style={{ opacity: 0.22 }}>
          {word}
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
