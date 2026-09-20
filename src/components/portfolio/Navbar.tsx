"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Gamepad2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState<{ x: number; y: number; nextTheme: 'light' | 'dark' } | null>(null);
  
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

  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const x = e.clientX;
    const y = e.clientY;

    // Start reveal animation
    setReveal({ x, y, nextTheme });

    // Perform the actual theme change mid-animation for a seamless blend
    setTimeout(() => {
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }, 400);

    // Clean up reveal state after animation ends
    setTimeout(() => {
      setReveal(null);
    }, 1100);
  };
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/site': return 'Dashboard';
      case '/about': return 'About Me';
      case '/projects': return 'Portfolio Projects';
      case '/skills': return 'Expertise';
      case '/services': return 'Professional Offerings';
      case '/contact': return 'Connect';
      default: return 'Portfolio';
    }
  };

  return (
    <>
      {/* Circular Reveal Overlay */}
      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ clipPath: `circle(0% at ${reveal.x}px ${reveal.y}px)` }}
            animate={{ clipPath: `circle(150% at ${reveal.x}px ${reveal.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className={`fixed inset-0 z-[100] pointer-events-none ${reveal.nextTheme === 'dark' ? 'bg-[#0a0000]' : 'bg-[#fff5f5]'}`}
          />
        )}
      </AnimatePresence>

      <nav className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 md:px-6 backdrop-blur-xl">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="flex lg:hidden h-9 w-9 text-primary hover:bg-primary/10" />
          <div className="h-4 w-px bg-border/50 lg:hidden mx-1" />
          <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-muted-foreground truncate max-w-[150px] md:max-w-none">
            {getPageTitle()}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* back to the playable version, which is what lives at '/' */}
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-colors"
          >
            <Gamepad2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Play it instead</span>
          </a>

          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleTheme}
              className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors relative overflow-hidden"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
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
    </>
  );
}