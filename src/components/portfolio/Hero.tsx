import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export function Hero({ name, title, description, resumeUrl }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-grid-pattern">
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/15 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-black tracking-[0.2em] uppercase backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Research Roles
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter">
            <span className="text-foreground/90">I am</span><br />
            <span className="text-gradient">Sai Yashwant</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
            <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-tight border-l-4 border-primary pl-6">
              {title}
            </h2>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed font-medium">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Button size="lg" className="rounded-full px-12 py-8 text-xl font-black shadow-2xl shadow-primary/40 group bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              <a href="#projects" className="flex items-center">
                Explore Work
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 py-8 text-xl font-bold border-primary/30 text-foreground hover:bg-primary/5 transition-all">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Download className="mr-2 h-6 w-6" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}