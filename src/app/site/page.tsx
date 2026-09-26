import type { Metadata } from 'next';
import { INITIAL_DATA } from '../data/initial-data';
import { SiteNav } from '@/components/site/SiteNav';
import { SiteHero } from '@/components/site/SiteHero';
import {
  SiteWork,
  SiteExperience,
  SiteSkills,
  SiteServices,
  SiteContact,
} from '@/components/site/SiteSections';

export const metadata: Metadata = {
  title: 'AI & ML Engineer Portfolio',
  description:
    'Sai Yashwant Reddy Panthy — AI & ML engineer. RAG and LLM systems, MLOps pipelines, computer vision. IEEE published.',
};

/* The written portfolio, which used to be six routes behind a sidebar and
   is now one page you scroll. The sections kept their names so the old
   URLs can redirect to them as anchors. */
export default function SitePage() {
  const { hero, contact, about, projects, skills, offerings } = INITIAL_DATA;

  return (
    <>
      <SiteNav />
      <SiteHero
        name={hero.name}
        title={hero.title}
        resumeUrl={contact.resume}
        calUrl={contact.cal}
      />
      <div className="space-y-4 pb-6 md:space-y-6 md:pb-10">
        <SiteWork projects={projects} />
        <SiteExperience about={about} />
        <SiteSkills skills={skills} />
        <SiteServices offerings={offerings} />
        <SiteContact contact={contact} />
      </div>
      <footer className="px-5 pb-12 text-center text-xs font-semibold text-muted-foreground">
        <p>© {new Date().getFullYear()} Sai Yashwant Reddy Panthy</p>
      </footer>
    </>
  );
}
