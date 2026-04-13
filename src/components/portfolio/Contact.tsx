"use client";

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  contact: {
    phone: string;
    email: string;
    location: string;
  };
}

export function Contact({ contact }: ContactProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Ready to build the future together? Let's connect."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
            <p className="text-muted-foreground text-lg">
              I'm always open to discussing research collaborations, deep learning projects, or engineering roles.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-xl font-medium">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</p>
                  <p className="text-xl font-medium">{contact.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Call Me</p>
                  <p className="text-xl font-medium">{contact.phone}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-background p-10 rounded-3xl shadow-2xl border border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Name</label>
                  <Input placeholder="Your Name" required className="h-12 rounded-xl border-primary/20 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Email</label>
                  <Input type="email" placeholder="Your Email" required className="h-12 rounded-xl border-primary/20 focus-visible:ring-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Subject</label>
                <Input placeholder="Regarding..." required className="h-12 rounded-xl border-primary/20 focus-visible:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Message</label>
                <Textarea 
                  placeholder="Your message here..." 
                  className="min-h-[160px] rounded-xl border-primary/20 focus-visible:ring-primary text-lg" 
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl py-8 text-xl font-bold group shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}