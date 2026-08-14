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
    <section id="contact" className="py-24 min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Direct Connection" 
          subtitle="Open for research collaborations, engineering roles, and deep learning projects."
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card p-12 rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-colors">
              <h3 className="text-4xl font-black mb-8">Let's Build Together</h3>
              <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
                I focus on research-backed solutions for complex AI challenges. Whether it's Computer Vision, NLP, or MLOps infrastructure, I'm always eager to discuss innovative projects.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-6 group p-6 rounded-3xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold truncate">{contact.email}</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-secondary/50 border border-transparent transition-all">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm font-bold">{contact.location}</p>
                  </div>
                </div>

                <a href={`tel:${contact.phone}`} className="flex items-center gap-6 group p-6 rounded-3xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-sm font-bold">{contact.phone}</p>
                  </div>
                </a>

                <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group p-6 rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90">
                  <div className="p-4 rounded-2xl bg-white/20">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Full CV</p>
                    <p className="text-sm font-bold flex items-center gap-2">View Resume <ExternalLink className="h-3 w-3" /></p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-12 rounded-[2.5rem] flex flex-col justify-between border-primary/5 hover:border-primary/20 transition-colors">
              <div>
                <h4 className="text-2xl font-black mb-6 uppercase tracking-tighter">Social Links</h4>
                <p className="text-muted-foreground font-medium mb-10">Follow my research and code updates on these platforms.</p>
              </div>
              
              <div className="space-y-4">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl bg-secondary/50 border border-primary/10 hover:border-primary/40 transition-all group">
                  <div className="flex items-center gap-4">
                    <Github className="h-6 w-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-sm">GitHub</span>
                  </div>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl bg-secondary/50 border border-primary/10 hover:border-primary/40 transition-all group">
                  <div className="flex items-center gap-4">
                    <Linkedin className="h-6 w-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-sm">LinkedIn</span>
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