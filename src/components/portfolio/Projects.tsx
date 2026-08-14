"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/app/types/portfolio';
import { SectionHeading } from './SectionHeading';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Engineering Portfolio" 
          subtitle="Research-driven projects in MLOps, Computer Vision, and Reinforcement Learning."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group flex flex-col overflow-hidden border border-primary/5 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 bg-card">
              <CardHeader className="flex-1 p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map(tag => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
