import { INITIAL_DATA } from '../data/initial-data';
import { About } from '@/components/portfolio/About';

export default function AboutPage() {
  const { about } = INITIAL_DATA;

  return (
    <main className="bg-background">
      <About {...about} />
    </main>
  );
}
