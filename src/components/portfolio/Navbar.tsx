"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/': return 'Dashboard';
      case '/about': return 'About Me';
      case '/projects': return 'Portfolio Projects';
      case '/skills': return 'Expertise';
      case '/contact': return 'Connect';
      default: return 'Portfolio';
    }
  };

  return (
    <nav className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="h-4 w-px bg-border/50 lg:hidden" />
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          Active Now
        </div>
      </div>
    </nav>
  );
}