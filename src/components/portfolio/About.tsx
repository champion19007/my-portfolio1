import { SectionHeading } from './SectionHeading';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  highlights: string[];
}

interface AboutProps {
  content: string;
  experience: Experience[];
  education?: Education;
}

export function About({ content, experience, education }: AboutProps) {
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

          {education && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <GraduationCap className="text-primary" />
                Education
              </h3>
              <div className="p-6 rounded-2xl bg-secondary/10 border border-primary/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-bold">{education.degree}</h4>
                    <p className="text-primary font-medium">{education.institution}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full w-fit">
                    <Calendar className="h-3 w-3" />
                    {education.period}
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {education.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Briefcase className="text-primary" />
            Work Experience
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
