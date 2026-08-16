import { INITIAL_DATA } from '../data/initial-data';
import { Offerings } from '@/components/portfolio/Offerings';
import { Navbar } from '@/components/portfolio/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Offerings',
  description: 'Specialized AI, ML, and MLOps services offered by Sai Yashwant Reddy Panthy as a freelancer or professional engineer.',
};

export default function ServicesPage() {
  const { offerings } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="p-6 md:p-12">
        <Offerings offerings={offerings} />
      </div>
    </div>
  );
}
