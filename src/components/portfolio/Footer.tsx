"use client";

import { Github, Linkedin, Heart, FileText, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FooterProps {
  name: string;
  contact: {
    github: string;
    linkedin: string;
    resume: string;
  };
}

export function Footer({ name, contact }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-20 bg-background border-t border-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-4xl font-black text-primary tracking-tighter">
              SYRP<span className="text-foreground">.</span>
            </div>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs">
              AI & Machine Learning Engineer
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-primary/20 hover:text-primary transition-all">
                <Github className="h-6 w-6" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-primary/20 hover:text-primary transition-all">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-primary/20 hover:text-primary transition-all">
                <FileText className="h-6 w-6" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              Back to top
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
          <p className="text-sm font-medium">© {currentYear} {name}. All rights reserved.</p>
          <p className="flex items-center gap-2 text-sm font-medium">
            Developed with <Heart className="h-4 w-4 text-primary fill-primary" /> in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}