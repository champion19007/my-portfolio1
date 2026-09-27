'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, Gamepad2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Offerings' },
];

/* A floating pill instead of a sidebar. The old layout gave a fixed rail a
   fifth of the width on every route, which is a lot of the picture to
   spend on navigation for a page you scroll, and it cropped the video into
   a letterbox. Six routes became four anchors.

   The theme is still a class on <html> and a key in localStorage, because
   LightVideoBackground watches that class and nothing else. What changed
   is the default - light, which is the one with the video in it. */
export function SiteNav() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* private mode: the choice simply will not be remembered */
    }
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 md:px-6 md:pt-6">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-3">
        {/* The wordmark sits outside the pill, as it does on the reference */}
        <a href="#top" className="mr-auto flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-[11px] font-black text-primary-foreground">
            SY
          </span>
          <span className="whitespace-nowrap text-sm font-black tracking-tight sm:text-base lg:text-lg">
            Sai Yashwant
          </span>
        </a>

        <ul
          className={cn(
            'hidden items-center gap-1 rounded-full lg:flex',
            'border border-border/60 bg-background/75 px-2 py-1.5 backdrop-blur-2xl',
            'shadow-[0_10px_40px_-16px_rgba(0,0,0,0.4)]'
          )}
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* The reference's one glowing pill. Here it is the booking link,
            because that is the only thing on the page that asks for a
            reply rather than offering something to read. */}
        {/* The reference's one glowing pill. Here it is the booking link,
            because it is the only thing on the page that asks for a reply
            rather than offering something to read. */}
        <a
          href="#contact"
          className="relative hidden whitespace-nowrap rounded-full bg-foreground px-4 py-3 text-xs font-black tracking-wide text-background shadow-[0_0_28px_-6px_hsl(var(--primary))] transition-transform hover:scale-[1.03] sm:inline-flex sm:items-center"
        >
          <span
            aria-hidden
            className="absolute inset-x-7 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          Book a call
        </a>

        <Link
          href="/"
          aria-label="Play the portfolio as a game"
          title="Play it instead"
          className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
        >
          <Gamepad2 className="h-4 w-4" />
        </Link>

        <button
          onClick={toggle}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 w-full max-w-5xl rounded-3xl border border-border/60 bg-background/95 p-2 backdrop-blur-2xl lg:hidden">
          <ul className="grid gap-1">
            {[...LINKS, { href: '#contact', label: 'Contact' }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
