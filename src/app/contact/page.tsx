import { INITIAL_DATA } from '../data/initial-data';
import { Contact } from '@/components/portfolio/Contact';
import { Navbar } from '@/components/portfolio/Navbar';

export default function ContactPage() {
  const { contact } = INITIAL_DATA;

  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="p-6 md:p-12">
        <Contact contact={contact} />
      </div>
    </div>
  );
}