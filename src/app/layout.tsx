import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/portfolio/AppSidebar';
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
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden bg-background">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto relative no-scrollbar">
              <div className="min-h-full">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}