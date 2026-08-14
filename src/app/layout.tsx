import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { INITIAL_DATA } from './data/initial-data';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'SYRP | AI & ML Engineer',
  description: 'AI & Machine Learning Engineer specializing in Computer Vision, NLP, and MLOps. Explore Sai Yashwant Reddy Panthy\'s engineering portfolio.',
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
      <body className="font-body antialiased selection:bg-primary/20 bg-background text-foreground transition-colors duration-300">
        <div className="fixed inset-0 -z-20 bg-grid-pattern opacity-20 pointer-events-none" />
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <Footer name={INITIAL_DATA.hero.name} contact={INITIAL_DATA.contact} />
        <Toaster />
      </body>
    </html>
  );
}