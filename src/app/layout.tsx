import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/portfolio/AppSidebar';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
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
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className="font-body antialiased selection:bg-primary/20 bg-background text-foreground">
        <FirebaseClientProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-background">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto relative no-scrollbar bg-background">
                <div className="min-h-full">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}