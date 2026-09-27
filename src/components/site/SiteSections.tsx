import {
  Github,
  Mail,
  MapPin,
  CalendarClock,
  Linkedin,
  ExternalLink,
  BrainCircuit,
  Workflow,
  ScanSearch,
  LineChart,
  GraduationCap,
  FileBadge,
} from 'lucide-react';
import { Block, Card, Tag } from './Shell';
import type { PortfolioData } from '@/app/types/portfolio';

/* Each project gets its own gradient so the grid reads as a set of things
   rather than a wall of identical boxes - the reference does the same with
   its product covers. Keyed by the id already in the data. */
const TINTS: Record<string, string> = {
  'pdf-ai': 'from-rose-500/25 to-orange-400/20',
  'mlops-pipelines': 'from-violet-500/25 to-indigo-400/20',
  'stock-forecaster': 'from-emerald-500/25 to-teal-400/20',
  'animal-detection': 'from-amber-500/25 to-rose-400/20',
  'mlops-forge': 'from-slate-500/25 to-zinc-400/20',
  'data-pipeline': 'from-cyan-500/25 to-sky-400/20',
  'cv-mlops': 'from-fuchsia-500/25 to-purple-400/20',
};

const OFFERING_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit,
  Workflow,
  ScanSearch,
  LineChart,
};

export function SiteWork({ projects }: { projects: PortfolioData['projects'] }) {
  return (
    <Block
      id="work"
      title="Selected Work"
      accent="Built end to end. All of it public."
      lead="Seven projects, each with its source open. The three at the top are the ones worth reading the code of."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card
            key={p.id}
            tint={TINTS[p.id] ?? 'from-primary/20 to-accent/10'}
            title={p.title}
            badge={
              <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground backdrop-blur">
                {p.tags[0]}
              </span>
            }
            footer={
              p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap inline-flex items-center gap-2 text-xs font-black text-primary hover:underline"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                  <ExternalLink className="h-3 w-3" />
                </a>
              )
            }
          >
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Block>
  );
}

export function SiteExperience({ about }: { about: PortfolioData['about'] }) {
  const research = about.research?.[0];
  return (
    <Block
      id="experience"
      title="Experience"
      accent="Five roles, one paper, one degree."
      lead={about.content}
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <ol className="relative grid gap-4 border-l border-border/60 pl-6">
          {about.experience.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background/70" />
              <div className="rounded-2xl border border-border/60 bg-background/55 p-5 backdrop-blur-xl">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-black text-foreground">{e.title}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-bold text-primary">{e.company}</p>
                <ul className="mt-3 grid gap-1.5">
                  {(e.bullets ?? [e.description]).map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-muted-foreground">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid content-start gap-5">
          {research && (
            <div className="rounded-3xl border border-primary/25 bg-primary/[0.06] p-6 backdrop-blur-xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
                <FileBadge className="h-3.5 w-3.5" />
                Published research
              </p>
              <h3 className="mt-3 text-lg font-black leading-snug text-foreground">
                {research.title}
              </h3>
              <p className="mt-1 text-xs font-bold text-muted-foreground">
                {research.conference}
              </p>
              <ul className="mt-4 grid gap-2">
                {research.highlights.map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-border/60 bg-background/55 p-6 backdrop-blur-xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5" />
              Education
            </p>
            <h3 className="mt-3 text-base font-black leading-snug text-foreground">
              {about.education.degree}
            </h3>
            <p className="mt-1 text-xs font-bold text-muted-foreground">
              {about.education.institution} &middot; {about.education.period}
            </p>
            <ul className="mt-4 grid gap-2">
              {about.education.highlights.map((h) => (
                <li key={h} className="text-sm leading-relaxed text-muted-foreground">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Block>
  );
}

export function SiteSkills({ skills }: { skills: PortfolioData['skills'] }) {
  const groups = skills.reduce<Record<string, string[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s.name);
    return acc;
  }, {});

  return (
    <Block
      id="skills"
      title="The Toolkit"
      accent="What I actually reach for."
      lead="Grouped by what the work needs rather than by how impressive the list looks."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groups).map(([category, names]) => (
          <div
            key={category}
            className="rounded-3xl border border-border/60 bg-background/55 p-6 backdrop-blur-xl"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-primary">
              {category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {names.map((n) => (
                <Tag key={n}>{n}</Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Block>
  );
}

export function SiteServices({ offerings }: { offerings: PortfolioData['offerings'] }) {
  return (
    <Block
      id="services"
      title="Our Offerings"
      accent="Driven by the problem. Built for production."
      lead="Four things I am asked for most often, and what each one actually includes."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {offerings.map((o) => {
          const Icon = OFFERING_ICONS[o.icon] ?? BrainCircuit;
          return (
            <Card
              key={o.title}
              tint="from-primary/20 via-accent/10 to-transparent"
              title={o.title}
              badge={
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-background/70 text-primary backdrop-blur">
                  <Icon className="h-5 w-5" />
                </span>
              }
            >
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {o.description}
              </p>
              <ul className="mt-5 grid gap-2 text-left">
                {o.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden className="mt-1.5 h-1 w-1 flex-none rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Block>
  );
}

export function SiteContact({ contact }: { contact: PortfolioData['contact'] }) {
  const rows = [
    { icon: CalendarClock, label: 'Book a call', value: 'Pick a time that suits you', href: contact.cal, accent: true },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Github, label: 'GitHub', value: 'github.com/champion19007', href: contact.github },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/saiyashwantreddy', href: contact.linkedin },
  ];

  return (
    <Block
      id="contact"
      title="Get in touch"
      accent="The calendar is the fastest way."
      lead="Open to AI and ML engineering roles, research collaborations, and anything that has to survive contact with production."
    >
      <div className="mx-auto grid max-w-3xl gap-3">
        {rows.map((r) => (
          <a
            key={r.label}
            href={r.href}
            target={r.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={`group flex min-w-0 items-center gap-4 rounded-2xl border p-5 backdrop-blur-xl transition-colors ${
              r.accent
                ? 'border-primary/30 bg-primary/[0.07] hover:border-primary/60'
                : 'border-border/60 bg-background/55 hover:border-primary/40'
            }`}
          >
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-background/70 text-primary">
              <r.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                {r.label}
              </span>
              <span className="block truncate text-sm font-bold text-foreground">{r.value}</span>
            </span>
            <ExternalLink className="h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </a>
        ))}

        <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {contact.location}
        </p>
      </div>
    </Block>
  );
}
