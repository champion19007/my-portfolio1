import { INITIAL_DATA } from '../data/initial-data';
import { About } from '@/components/portfolio/About';
import { Navbar } from '@/components/portfolio/Navbar';

export default function AboutPage() {
  const { about } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="p-6 md:p-12">
        <About {...about} />
      </div>
    </div>
  );
}