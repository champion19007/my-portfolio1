import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { Poppins, Instrument_Serif } from 'next/font/google';
import { LightVideoBackground } from '@/components/portfolio/LightVideoBackground';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

/* One weight, italic only - it is used for exactly one thing: the accent
   line under each section heading. */
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FF0000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Sai Yashwant Reddy Panthy | AI & ML Engineer',
    template: '%s | Sai Yashwant Reddy Panthy'
  },
  description: 'Portfolio of Sai Yashwant Reddy Panthy, an AI & Machine Learning Engineer specializing in RAG applications, ML pipelines, and Agentic AI systems. Published IEEE researcher and hackathon winner.',
  keywords: ['AI Engineer', 'Machine Learning', 'MLOps', 'Computer Vision', 'NLP', 'RAG', 'Agentic AI', 'Sai Yashwant Reddy Panthy', 'Software Engineering'],
  authors: [{ name: 'Sai Yashwant Reddy Panthy' }],
  creator: 'Sai Yashwant Reddy Panthy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saiyashwantreddy.web.app',
    title: 'Sai Yashwant Reddy Panthy | AI & ML Engineer',
    description: 'Engineering production-grade AI-powered analytics solutions. Explore my projects in MLOps, Computer Vision, and Reinforcement Learning.',
    siteName: 'Sai Yashwant Reddy Panthy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Yashwant Reddy Panthy | AI & ML Engineer',
    description: 'AI & Machine Learning Engineer specializing in Computer Vision, NLP, and MLOps.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${serif.variable}`}>
      <body className="font-body antialiased selection:bg-primary/20 app-surface bg-background text-foreground">
        <LightVideoBackground />
        <FirebaseClientProvider>
          {/* The sidebar is gone with the six routes it navigated. `main`
              stays the scroll container rather than letting the body
              scroll, because the nav and the word-by-word reveal both
              listen to it for scroll position. */}
          <main className="relative h-screen overflow-y-auto no-scrollbar app-surface bg-background">
            {children}
          </main>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}