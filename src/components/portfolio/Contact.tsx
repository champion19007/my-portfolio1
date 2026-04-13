"use client";

import { SectionHeading } from './SectionHeading';
import { Mail, MapPin, Phone, Github, Linkedin, FileText } from 'lucide-react';

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
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Feel free to reach out for collaborations or opportunities."
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
              <p className="text-muted-foreground text-lg">
                I'm always open to discussing research collaborations, deep learning projects, or engineering roles. Reach out via email or connect with me on professional platforms.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-xl font-medium hover:text-primary transition-colors">{contact.email}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</p>
                    <p className="text-xl font-medium">{contact.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Call Me</p>
                    <p className="text-xl font-medium">{contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-10 rounded-3xl shadow-2xl border border-primary/10 flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-8 text-center">Connect & Resume</h4>
              <div className="grid grid-cols-2 gap-6">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/30 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group">
                  <Github className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-bold">GitHub</span>
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/30 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group">
                  <Linkedin className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-bold">LinkedIn</span>
                </a>
                <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="col-span-2 flex flex-col items-center gap-3 p-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
                  <FileText className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <span className="font-bold text-lg">View Full Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}