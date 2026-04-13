import { INITIAL_DATA } from './data/initial-data';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const { hero, about, projects, skills, contact } = INITIAL_DATA;

  return (
    <main className="min-h-screen relative bg-background">
      <Navbar />
      <Hero {...hero} resumeUrl={contact.resume} />
      <About {...about} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact contact={contact} />
      <Footer name={hero.name} contact={contact} />
      <Toaster />
    </main>
  );
}