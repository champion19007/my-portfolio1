"use client";

import { SectionHeading } from './SectionHeading';
import { Calendar, Briefcase, GraduationCap, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { Research } from '@/app/types/portfolio';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
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
  research?: Research[];
}

export function About({ content, experience, education, research }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="About Me" centered={false} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed mb-12">
                {content}
              </p>

              <h3 className="text-3xl font-black mb-10 flex items-center gap-4 uppercase tracking-tight">
                <span className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </span>
                Professional Journey
              </h3>
              
              <div className="space-y-10 relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-primary/10" />
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-12 group">
                    <div className="absolute left-[13px] top-2 w-[6px] h-[6px] rounded-full bg-primary ring-4 ring-primary/10 group-hover:scale-150 transition-transform" />
                    <div className="p-8 rounded-3xl bg-secondary/10 border border-primary/5 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-2xl font-bold">{exp.title}</h4>
                          <p className="text-primary font-bold uppercase tracking-widest text-xs mt-1">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-background/80 px-4 py-2 rounded-full border border-primary/5 w-fit">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      {exp.bullets && (
                        <ul className="space-y-2 mt-4">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="text-xs md:text-sm text-muted-foreground flex gap-3 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-12">
              {education && (
                <div className="lg:sticky lg:top-32">
                  <h3 className="text-3xl font-black mb-8 flex items-center gap-4 uppercase tracking-tight">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </span>
                    Education
                  </h3>
                  <div className="p-8 rounded-3xl bg-secondary/10 border border-primary/5 shadow-xl shadow-black/5 relative overflow-hidden group mb-12">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <GraduationCap className="h-24 w-24 text-primary" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <h4 className="text-2xl font-bold leading-tight">{education.degree}</h4>
                        <p className="text-primary font-black uppercase tracking-widest text-xs mt-2">{education.institution}</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mt-4">
                          <Calendar className="h-3 w-3" />
                          {education.period}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Highlights</p>
                        <ul className="space-y-4">
                          {education.highlights.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground group/item">
                              <span className="mt-1.5 p-1 rounded-full bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <Award className="h-3 w-3" />
                              </span>
                              <span className="text-sm font-medium leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {research && research.length > 0 && (
                    <>
                      <h3 className="text-3xl font-black mb-8 flex items-center gap-4 uppercase tracking-tight">
                        <span className="p-2 rounded-xl bg-primary/10 text-primary">
                          <BookOpen className="h-6 w-6" />
                        </span>
                        Research
                      </h3>
                      <div className="space-y-6">
                        {research.map((res, i) => (
                          <div key={i} className="p-8 rounded-3xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all">
                            <h4 className="text-lg font-black leading-tight mb-2">{res.title}</h4>
                            <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">{res.conference}</p>
                            <ul className="space-y-2">
                              {res.highlights.map((point, j) => (
                                <li key={j} className="text-xs text-muted-foreground flex gap-2 items-start">
                                  <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
