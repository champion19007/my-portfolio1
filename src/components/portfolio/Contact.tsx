"use client";

import { SectionHeading } from './SectionHeading';
import { Mail, MapPin, Phone, Github, Linkedin, FileText, ExternalLink } from 'lucide-react';

interface ContactProps {
  contact: {
    phone: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    resume: string;
  };
}

export function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="py-12 md:py-24 min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Direct Connection" 
          subtitle="Open for research collaborations, engineering roles, and deep learning projects."
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-colors">
              <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-8">Let's Build Together</h3>
              <p className="text-muted-foreground text-base md:text-xl mb-10 md:mb-12 leading-relaxed">
                I focus on research-backed solutions for complex AI challenges. Whether it's Computer Vision, NLP, or MLOps infrastructure, I'm always eager to discuss innovative projects.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 md:gap-6 group p-4 md:p-6 rounded-2xl md:rounded-3xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xs md:text-sm font-bold truncate">{contact.email}</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-secondary/50 border border-transparent transition-all">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xs md:text-sm font-bold">{contact.location}</p>
                  </div>
                </div>

                <a href={`tel:${contact.phone}`} className="flex items-center gap-4 md:gap-6 group p-4 md:p-6 rounded-2xl md:rounded-3xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-xs md:text-sm font-bold">{contact.phone}</p>
                  </div>
                </a>

                <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group p-4 md:p-6 rounded-2xl md:rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/20">
                    <FileText className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Full CV</p>
                    <p className="text-xs md:text-sm font-bold flex items-center gap-2">View Resume <ExternalLink className="h-3 w-3" /></p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between border-primary/5 hover:border-primary/20 transition-colors">
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase tracking-tighter">Social Links</h4>
                <p className="text-sm md:text-base text-muted-foreground font-medium mb-8 md:mb-10">Follow my research and code updates on these platforms.</p>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/50 border border-primary/10 hover:border-primary/40 transition-all group">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Github className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-xs md:text-sm">GitHub</span>
                  </div>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/50 border border-primary/10 hover:border-primary/40 transition-all group">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-xs md:text-sm">LinkedIn</span>
                  </div>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
