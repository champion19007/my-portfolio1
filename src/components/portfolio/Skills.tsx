"use client";

import { Badge } from '@/components/ui/badge';
import { Skill } from '@/app/types/portfolio';
import { SectionHeading } from './SectionHeading';
import { Terminal, BrainCircuit, Box, Focus, Database, Globe, Layers } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const categories = [
    { name: 'Programming', icon: <Terminal className="h-5 w-5 text-primary" />, desc: 'Core languages' },
    { name: 'AI / LLM', icon: <BrainCircuit className="h-5 w-5 text-primary" />, desc: 'Frameworks' },
    { name: 'Gen AI / Agentic', icon: <Layers className="h-5 w-5 text-primary" />, desc: 'Next-gen AI' },
    { name: 'MLOps / Cloud', icon: <Box className="h-5 w-5 text-primary" />, desc: 'Infrastructure' },
    { name: 'Web & APIs', icon: <Globe className="h-5 w-5 text-primary" />, desc: 'Deployment' },
    { name: 'Data Tools', icon: <Database className="h-5 w-5 text-primary" />, desc: 'Analytics' },
    { name: 'Domains', icon: <Focus className="h-5 w-5 text-primary" />, desc: 'Specializations' },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Technical Expertise" 
          subtitle="A comprehensive toolkit focused on Artificial Intelligence, Deep Learning, and MLOps."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.name} className="group p-8 rounded-3xl bg-secondary/20 border border-primary/5 hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-background shadow-lg shadow-black/5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{cat.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter(s => s.category === cat.name)
                  .map(skill => (
                    <Badge 
                      key={skill.name} 
                      variant="outline" 
                      className="bg-background/50 backdrop-blur-sm text-foreground/90 border-primary/10 hover:border-primary hover:text-primary transition-all px-4 py-2 h-auto text-sm font-medium"
                    >
                      {skill.name}
                    </Badge>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
