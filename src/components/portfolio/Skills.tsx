import { Badge } from '@/components/ui/badge';
import { Skill } from '@/app/types/portfolio';
import { SectionHeading } from './SectionHeading';
import { Terminal, BrainCircuit, Box, Focus } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const categories = [
    { name: 'Programming', icon: <Terminal className="h-5 w-5 text-primary" /> },
    { name: 'AI & ML', icon: <BrainCircuit className="h-5 w-5 text-primary" /> },
    { name: 'Tools & Platforms', icon: <Box className="h-5 w-5 text-primary" /> },
    { name: 'Domains', icon: <Focus className="h-5 w-5 text-primary" /> },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Expertise & Skills" 
          subtitle="A comprehensive toolkit focused on Artificial Intelligence and Data Engineering."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="p-6 rounded-2xl bg-secondary/20 border border-primary/10 transition-colors hover:bg-secondary/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-background">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(s => s.category === cat.name)
                  .map(skill => (
                    <Badge 
                      key={skill.name} 
                      variant="outline" 
                      className="bg-background text-foreground/80 border-primary/20 hover:border-primary hover:text-primary transition-all px-3 py-1"
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
