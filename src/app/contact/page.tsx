import { INITIAL_DATA } from '../data/initial-data';
import { Contact } from '@/components/portfolio/Contact';

export default function ContactPage() {
  const { contact } = INITIAL_DATA;

  return (
    <main className="bg-background">
      <Contact contact={contact} />
    </main>
  );
}
