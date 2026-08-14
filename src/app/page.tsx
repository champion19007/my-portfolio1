import { INITIAL_DATA } from './data/initial-data';
import { Hero } from '@/components/portfolio/Hero';

export default function Home() {
  const { hero, contact } = INITIAL_DATA;

  return (
    <main className="relative bg-background">
      <Hero {...hero} resumeUrl={contact.resume} />
    </main>
  );
}
