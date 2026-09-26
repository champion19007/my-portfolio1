'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CalendarClock, FileText } from 'lucide-react';
import { FigureField, type Figure } from './FigureField';
import { RevealText } from './RevealText';

/* Laid out the way matteovincenti.com lays out its first screen: a hairline
   rule with a micro label above the heading, a large statement on the left,
   one oversized italic word carrying it, and a figure turning on the right
   that changes when you pick a different tab.

   The tabs are not decoration - they are the three kinds of work, and each
   one says its own sentence. Choosing one switches the figure with it, so
   the shape is captioned rather than being scenery. */

const TABS: { id: Figure; n: string; label: string; line: string }[] = [
  {
    id: 'knot',
    n: '01',
    label: 'RETRIEVAL',
    line: 'RAG and LLM systems where the retrieval is the hard part — and where returning nothing is treated as a failure, not an empty result.',
  },
  {
    id: 'sphere',
    n: '02',
    label: 'PIPELINES',
    line: 'MLOps and CI/CD that can be re-run without fear: reproducible builds, automated retraining, and drift caught before anyone files a ticket.',
  },
  {
    id: 'saddle',
    n: '03',
    label: 'VISION',
    line: 'Computer vision that runs where it has to — real-time detection on live streams, and on embedded hardware that will not forgive a slow model.',
  },
];

export function SiteHero({
  name,
  title,
  resumeUrl,
  calUrl,
}: {
  name: string;
  title: string;
  resumeUrl: string;
  calUrl: string;
}) {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="top" className="relative px-5 pb-16 pt-10 md:px-8 md:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* the rule-and-label the reference opens with */}
        <div className="flex items-center justify-between gap-6 border-b border-border/50 pb-5">
          <p className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span aria-hidden className="h-px w-10 bg-primary" />
            Available for AI &amp; ML roles
          </p>
          <p className="hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground sm:block">
            Mumbai, India
            <br />
            Models. Pipelines. Production.
          </p>
        </div>

        <div className="grid items-center gap-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          <div className="min-w-0">
            <h1 className="text-[2.6rem] font-black uppercase leading-[0.92] tracking-tight text-foreground sm:text-6xl">
              {name.split(' ').slice(0, 2).join(' ')}
              <br />
              {name.split(' ').slice(2).join(' ')}
            </h1>

            {/* The one oversized word the screen hangs on. It is the
                claim the rest of the page then has to back up. */}
            <p className="accent-line font-serif -ml-1 mt-2 text-6xl italic leading-[0.95] sm:text-8xl">
              Production.
            </p>

            <p className="mt-6 max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              {title}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                See the work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-6 py-3.5 text-sm font-black text-foreground backdrop-blur-xl transition-colors hover:border-primary/50"
              >
                <CalendarClock className="h-4 w-4" />
                Book a call
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          {/* the figure, and the tabs that caption it */}
          <div className="relative min-w-0">
            <p className="absolute left-0 top-0 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Fig. {tab.n}
            </p>
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              <span
                aria-hidden
                className="absolute inset-[6%] rounded-full border border-border/40"
              />
              <FigureField shape={tab.id} className="relative h-full w-full" />
            </div>

            <div className="mt-2 flex gap-5 border-t border-border/50 pt-3">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`-mt-px border-t pt-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    i === active
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.n} {t.label}
                </button>
              ))}
            </div>

            <RevealText
              key={tab.id}
              text={tab.line}
              className="mt-4 max-w-md text-sm leading-relaxed text-foreground"
            />
          </div>
        </div>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Or{' '}
          <Link href="/" className="text-primary underline underline-offset-4">
            explore it as a game
          </Link>
        </p>
      </div>
    </section>
  );
}
