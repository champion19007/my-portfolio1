import Link from 'next/link';
import { ArrowRight, CalendarClock, FileText } from 'lucide-react';
import { Strapline } from './Shell';
import { RevealText } from './RevealText';

/* Centred, like the reference: a bold line, an italic serif line under it
   in the accent colour, a short muted paragraph, then the actions. This is
   the one part of the page with no panel behind it - the video is the
   background here and the type sits straight on it, which is the whole
   reason for having a video at all. */
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
  return (
    <section id="top" className="px-5 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Available for AI &amp; ML roles
        </p>

        <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-foreground md:text-7xl">
          {name}
        </h1>
        <p className="accent-line font-serif mt-4 text-4xl italic md:text-6xl">
          {title}
        </p>

        <RevealText
          text="I build the parts of an AI system that have to keep working after the demo — retrieval that does not quietly return nothing, pipelines that can be re-run without fear, and models that still behave when the data shifts underneath them."
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
          >
            See the work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3.5 text-sm font-black text-foreground backdrop-blur-xl transition-colors hover:border-primary/40"
          >
            <CalendarClock className="h-4 w-4" />
            Book a call
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </div>

        <div className="mt-14">
          <Strapline
            items={['RAG & LLM systems', 'MLOps & CI/CD', 'Computer vision', 'IEEE published']}
          />
        </div>

        <p className="mt-12 text-xs font-semibold text-muted-foreground">
          Or{' '}
          <Link href="/" className="text-primary underline underline-offset-4">
            explore it as a game instead
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
