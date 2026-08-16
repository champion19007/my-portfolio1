import { INITIAL_DATA } from '../data/initial-data';
import { About } from '@/components/portfolio/About';
import { Navbar } from '@/components/portfolio/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about the professional journey, education, and research of Sai Yashwant Reddy Panthy in the field of AI and Machine Learning.',
};

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
