import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  profileImage: string;
}

export function Hero({ name, title, description, profileImage }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-accent/20 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="relative mb-8 p-1 rounded-full bg-gradient-to-tr from-primary to-accent">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background">
            <Image 
              src={profileImage} 
              alt={name} 
              fill 
              className="object-cover"
              data-ai-hint="professional headshot"
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Hi, I&apos;m <span className="text-primary">{name}</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">
          {title}
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-10">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 group">
            <a href="#projects" className="flex items-center">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
}
