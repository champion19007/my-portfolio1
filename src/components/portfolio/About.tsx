import { SectionHeading } from './SectionHeading';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface AboutProps {
  content: string;
  experience: Experience[];
}

export function About({ content, experience }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="About Me" centered={false} />
          
          <div className="mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content}
            </p>
          </div>
          
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Briefcase className="text-primary" />
            Professional Journey
          </h3>
          
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-[-2rem] before:w-[2px] before:bg-primary/20 last:before:hidden">
                <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-primary" />
                <div className="p-6 rounded-2xl bg-secondary/10 border border-primary/5 hover:border-primary/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full w-fit">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
