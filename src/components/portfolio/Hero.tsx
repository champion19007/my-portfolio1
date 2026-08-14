import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export function Hero({ name, title, description, resumeUrl }: HeroProps) {
  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
          Portfolio Overview
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black leading-[0.95] uppercase tracking-tighter">
          Hi, I'm <span className="text-gradient">Sai</span><br />
          Yashwant Reddy
        </h1>
        
        <p className="text-xl md:text-2xl font-bold text-muted-foreground uppercase tracking-tight">
          {title}
        </p>
        
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Button size="lg" className="rounded-xl px-8 h-14 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 group bg-primary hover:bg-primary/90" asChild>
            <Link href="/projects" className="flex items-center">
              View Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl px-8 h-14 text-sm font-black uppercase tracking-widest border-border hover:bg-secondary/50" asChild>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              CV.PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}