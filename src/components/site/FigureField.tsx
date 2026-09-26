'use client';

import { useEffect, useRef } from 'react';

/* The figure that turns beside the hero, and changes when you pick a
   different tab - the same idea matteovincenti.com uses for FIG. 01/02/03.
   Three shapes, each drawn as a few hundred thin strokes with no fill and
   no lighting, so the overlaps alone read as a surface.

   Canvas, not WebGL. Nothing here needs a GPU pipeline, and this page
   already asks enough of the network without a shader toolchain to draw a
   few thousand line segments.

   All three share one projection: rotate about two axes, then a weak
   perspective divide. That is everything a wireframe needs.

   It draws a single still frame for prefers-reduced-motion, and stops
   entirely while the tab is hidden rather than turning in the background
   on someone's battery. */

const TWO_PI = Math.PI * 2;

export type Figure = 'knot' | 'sphere' | 'saddle';

type Pt = [number, number, number];

/* Each shape is a list of polylines in model space. Built once per shape
   and then only rotated, so the per-frame cost is the projection and the
   stroking, not the maths that decides the form. */
function build(shape: Figure): Pt[][] {
  const lines: Pt[][] = [];

  if (shape === 'knot') {
    // trefoil: 2 turns about the axis for every 3 through the hole
    const RINGS = 24, STEPS = 200, P = 2, Q = 3;
    for (let r = 0; r < RINGS; r++) {
      const spread = 0.10 + (r / RINGS) * 0.40;
      const line: Pt[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const u = (i / STEPS) * TWO_PI;
        const cu = Math.cos(Q * u);
        line.push([
          (2 + cu * spread * 2) * Math.cos(P * u),
          (2 + cu * spread * 2) * Math.sin(P * u),
          Math.sin(Q * u) * spread * 2,
        ]);
      }
      lines.push(line);
    }
  }

  if (shape === 'sphere') {
    // great circles at evenly spread tilts - a wireframe globe
    const CIRCLES = 30, STEPS = 140, R = 2.4;
    for (let c = 0; c < CIRCLES; c++) {
      const tilt = (c / CIRCLES) * Math.PI;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const line: Pt[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const a = (i / STEPS) * TWO_PI;
        const x = Math.cos(a) * R, y = Math.sin(a) * R;
        line.push([x * ct, y, x * st]);
      }
      lines.push(line);
    }
  }

  if (shape === 'saddle') {
    /* A hyperboloid of one sheet: two rings joined by STRAIGHT lines with
       a twist between them. The curve you see is an illusion of the
       straight lines crossing - which is why it reads as a star. */
    const LINES = 64, R = 2.3, H = 2.0, TWIST = 2.05;
    for (let i = 0; i < LINES; i++) {
      const a = (i / LINES) * TWO_PI;
      lines.push([
        [Math.cos(a) * R, -H, Math.sin(a) * R],
        [Math.cos(a + TWIST) * R, H, Math.sin(a + TWIST) * R],
      ]);
    }
  }

  return lines;
}

export function FigureField({
  shape,
  className,
}: {
  shape: Figure;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const wanted = useRef<Figure>(shape);
  wanted.current = shape;

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cache = new Map<Figure, Pt[][]>();
    const geometry = (s: Figure) => {
      let g = cache.get(s);
      if (!g) cache.set(s, (g = build(s)));
      return g;
    };

    let w = 0, h = 0;
    const size = () => {
      const rect = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    /* A shape change crossfades rather than cutting, so switching tabs
       feels like the same object rearranging itself. */
    let from: Figure = wanted.current;
    let to: Figure = wanted.current;
    let mix = 1;

    const draw = (t: number) => {
      if (wanted.current !== to) {
        from = to;
        to = wanted.current;
        mix = 0;
      }
      if (mix < 1) mix = Math.min(1, mix + 0.045);

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.30;
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() ||
        '300 78% 68%';

      const ax = t * 0.00019, ay = t * 0.00031;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);

      ctx.lineWidth = 1.15;

      const paint = (s: Figure, strength: number) => {
        if (strength <= 0.003) return;
        const lines = geometry(s);
        for (let li = 0; li < lines.length; li++) {
          const line = lines[li];
          ctx.beginPath();
          for (let i = 0; i < line.length; i++) {
            const [x, y, z] = line[i];
            const y1 = y * cosX - z * sinX;
            let z1 = y * sinX + z * cosX;
            const x1 = x * cosY + z1 * sinY;
            z1 = -x * sinY + z1 * cosY;
            const d = 1 / (1 + z1 * 0.12);
            const sx = cx + x1 * scale * d;
            const sy = cy + y1 * scale * d;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          const fade = 0.10 + (1 - li / lines.length) * 0.34;
          ctx.strokeStyle = `hsl(${accent} / ${fade * strength})`;
          ctx.stroke();
        }
      };

      paint(from, 1 - mix);
      paint(to, mix);
    };

    let raf = 0;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    if (still) draw(0);
    else raf = requestAnimationFrame(loop);

    const onVisible = () => {
      if (still) return;
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) raf = requestAnimationFrame(loop);
    };
    const onResize = () => {
      size();
      if (still) draw(0);
    };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={className} />;
}
