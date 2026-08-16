import { INITIAL_DATA } from '../data/initial-data';
import { Skills } from '@/components/portfolio/Skills';
import { Navbar } from '@/components/portfolio/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Expertise',
  description: 'A comprehensive toolkit focused on Artificial Intelligence, Deep Learning, and MLOps infrastructure.',
};

export default function SkillsPage() {
  const { skills } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="p-6 md:p-12">
        <Skills skills={skills} />
      </div>
    </div>
  );
}
