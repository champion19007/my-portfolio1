import { INITIAL_DATA } from '../data/initial-data';
import { Hero } from '@/components/portfolio/Hero';
import { Navbar } from '@/components/portfolio/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & ML Engineer Portfolio',
  description: 'Welcome to the portfolio of Sai Yashwant Reddy Panthy. Specializing in RAG applications, ML pipelines, and Agentic AI systems.',
};

export default function Home() {
  const { hero, contact } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <Hero {...hero} resumeUrl={contact.resume} />
      </div>
    </div>
  );
}
