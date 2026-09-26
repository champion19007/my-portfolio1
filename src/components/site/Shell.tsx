import { cn } from '@/lib/utils';
import { RevealText } from './RevealText';

/* The page is built the way factorlab.in is: each section is its own large
   rounded block, inset from the page edge, with a centred heading, an
   italic serif line under it in the accent colour, and a short muted lead.
   Cards inside carry a tinted header above a centred title.

   The one deliberate departure is that the blocks are translucent rather
   than solid. Solid panels would cover the video completely and there
   would be no point having it; at 55% with a blur behind them they read as
   frosted glass and the clip still drifts through. */

export function Block({
  id,
  title,
  accent,
  lead,
  children,
  className,
}: {
  id?: string;
  title: string;
  accent?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 min-w-0 px-3 md:px-6">
      <div
        className={cn(
          'mx-auto w-full max-w-6xl rounded-[2rem] md:rounded-[2.75rem]',
          'border border-border/60 bg-background/55 backdrop-blur-2xl',
          'shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)]',
          'px-5 py-16 md:px-12 md:py-24',
          className
        )}
      >
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="t-h2 balance font-black tracking-tight text-foreground">
            {title}
          </h2>
          {accent && (
            <p className="accent-line t-accent balance font-serif mt-3 italic">
              {accent}
            </p>
          )}
          {lead && (
            <RevealText
              text={lead}
              className="t-lead balance mx-auto mt-7 max-w-2xl leading-relaxed text-foreground"
            />
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

/* A card with a tinted header above the words, which is what gives the
   reference page its rhythm - a grid reads as a set of objects rather than
   a list of paragraphs. `tint` is a pair of tailwind gradient stops. */
export function Card({
  tint,
  badge,
  title,
  children,
  footer,
  className,
}: {
  tint: string;
  badge?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border/60',
        'bg-background/60 backdrop-blur-xl transition-colors hover:border-primary/40',
        className
      )}
    >
      <div
        className={cn(
          'relative grid h-28 place-items-center bg-gradient-to-br md:h-32',
          tint
        )}
      >
        {badge}
      </div>
      <div className="flex flex-1 flex-col p-6 text-center md:p-7">
        <h3 className="break-words text-lg font-black tracking-tight text-foreground md:text-xl">
          {title}
        </h3>
        {children}
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </article>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
      {children}
    </li>
  );
}

/* The small centred row of labels the reference uses under its hero, to
   say what it does without making a section out of it. */
export function Strapline({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <span aria-hidden className="text-primary">
            ✳
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
