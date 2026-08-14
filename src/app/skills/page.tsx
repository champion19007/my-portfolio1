import { INITIAL_DATA } from '../data/initial-data';
import { Skills } from '@/components/portfolio/Skills';

export default function SkillsPage() {
  const { skills } = INITIAL_DATA;

  return (
    <main className="bg-background">
      <Skills skills={skills} />
    </main>
  );
}
