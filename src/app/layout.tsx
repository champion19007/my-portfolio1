import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { INITIAL_DATA } from './data/initial-data';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'DevLaunch Portfolio | Professional Developer Showcase',
  description: 'A professional developer portfolio showcasing innovative projects and skills.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 bg-background text-foreground">
        <Navbar />
        <div className="pt-20 min-h-[calc(100vh-80px)]">
          {children}
        </div>
        <Footer name={INITIAL_DATA.hero.name} contact={INITIAL_DATA.contact} />
        <Toaster />
      </body>
    </html>
  );
}
