import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export function Hero({ name, title, description, resumeUrl }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-grid-pattern">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/15 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Research & Engineering Roles
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
            Hi, I&apos;m <span className="text-gradient">Sai</span>
            <br />
            <span className="text-foreground/90">Yashwant Reddy</span>
          </h1>
          
          <h2 className="text-2xl md:text-5xl font-bold text-muted-foreground mb-10 tracking-tight">
            {title}
          </h2>
          
          <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed mx-auto md:mx-0 font-medium">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Button size="lg" className="rounded-full px-12 py-8 text-xl font-black shadow-2xl shadow-primary/40 group bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
              <a href="#projects" className="flex items-center">
                Explore Projects
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

          <div className="mt-20 flex items-center justify-center md:justify-start gap-10 text-muted-foreground border-t border-primary/10 pt-10">
            <a href="https://github.com/champion19007" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                <Github className="h-6 w-6" />
              </div>
              <span className="font-bold uppercase tracking-widest text-sm">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/saiyashwantreddy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                <Linkedin className="h-6 w-6" />
              </div>
              <span className="font-bold uppercase tracking-widest text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
