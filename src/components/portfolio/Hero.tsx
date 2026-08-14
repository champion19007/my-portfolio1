import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export function Hero({ name, title, description, resumeUrl }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for AI & ML Opportunities
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1]">
            Hi, I'm <span className="text-gradient">Sai</span><br />
            <span className="text-foreground/80">Yashwant Reddy Panthy</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-8">
            {title}
          </h2>
          
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed mx-auto md:mx-0">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-2xl shadow-primary/30 group bg-primary hover:bg-primary/90" asChild>
              <Link href="/projects" className="flex items-center">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg border-primary/50 text-foreground hover:bg-primary/5" asChild>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center md:justify-start gap-8 text-muted-foreground">
            <a href="https://github.com/champion19007" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/saiyashwantreddy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}