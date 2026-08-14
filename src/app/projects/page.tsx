import { INITIAL_DATA } from '../data/initial-data';
import { Projects } from '@/components/portfolio/Projects';

export default function ProjectsPage() {
  const { projects } = INITIAL_DATA;

  return (
    <main className="bg-background">
      <Projects projects={projects} />
    </main>
  );
}
