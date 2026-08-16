"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/app/types/portfolio';
import { SectionHeading } from './SectionHeading';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

interface ProjectsProps {
  projects: (Project & { image?: string })[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Engineering Portfolio" 
          subtitle="Research-driven projects in MLOps, Computer Vision, and Reinforcement Learning."
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(img => img.id === project.image);
            return (
              <Card key={project.id} className="group flex flex-col overflow-hidden border border-primary/5 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 bg-card rounded-[2rem]">
                <div className="relative aspect-video w-full overflow-hidden">
                  {projectImage ? (
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={projectImage.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/20 text-4xl font-black">
                      CODE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader className="flex-1 p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary text-[10px] uppercase font-black tracking-tighter border border-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors leading-tight font-black uppercase">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed line-clamp-4 text-sm font-medium">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="pt-0 pb-8 px-8 gap-3">
                  {project.repoUrl && (
                    <Button size="sm" variant="default" asChild className="w-full rounded-xl bg-primary hover:bg-primary/90 transition-all font-bold group-hover:shadow-lg shadow-primary/20">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Repository
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" asChild className="w-full rounded-xl border-primary/20 hover:border-primary/50 font-bold transition-all">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
