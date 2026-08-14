"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-background/80 backdrop-blur-xl shadow-2xl border-b border-primary/10" : "bg-background"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
          SYRP<span className="text-foreground">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-xs font-black uppercase tracking-widest transition-colors",
                pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-primary/10 text-primary transition-colors border border-primary/5"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <Button className="rounded-full px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 font-bold" asChild>
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-secondary text-primary"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="flex flex-col p-8 space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-xl font-black uppercase tracking-widest p-2",
                  pathname === link.href ? "text-primary" : "hover:text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full rounded-2xl py-8 text-xl font-black" asChild>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Me</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
