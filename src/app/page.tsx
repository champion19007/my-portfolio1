import { INITIAL_DATA } from './data/initial-data';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { AIGenerator } from '@/components/portfolio/AIGenerator';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const { hero, about, projects, skills } = INITIAL_DATA;

  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero {...hero} />
      <About {...about} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <AIGenerator />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
