"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/': return 'Dashboard';
      case '/about': return 'About Me';
      case '/projects': return 'Portfolio Projects';
      case '/skills': return 'Expertise';
      case '/services': return 'Professional Offerings';
      case '/contact': return 'Connect';
      default: return 'Portfolio';
    }
  };

  return (
    <nav className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 md:px-6 backdrop-blur-xl transition-all duration-500">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarTrigger className="flex lg:hidden h-9 w-9 text-primary hover:bg-primary/10" />
        <div className="h-4 w-px bg-border/50 lg:hidden mx-1" />
        <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-muted-foreground truncate max-w-[150px] md:max-w-none">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {mounted && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors relative overflow-hidden"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Moon className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        )}

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hidden sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          System Online
        </div>
      </div>
    </nav>
  );
}
