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
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-primary/10 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
          Available for new opportunities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Hi, I&apos;m <span className="text-primary">{name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8">
          {title}
        </h2>
        <p className="max-w-3xl text-xl text-muted-foreground mb-12 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 group bg-primary hover:bg-primary/90">
            <a href="#projects" className="flex items-center">
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg border-primary text-primary hover:bg-primary/5">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}