import { INITIAL_DATA } from '../data/initial-data';
import { Projects } from '@/components/portfolio/Projects';
import { Navbar } from '@/components/portfolio/Navbar';

export default function ProjectsPage() {
  const { projects } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="p-6 md:p-12">
        <Projects projects={projects} />
      </div>
    </div>
  );
}