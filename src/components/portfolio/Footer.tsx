import { Github, Linkedin, Heart, FileText } from 'lucide-react';

interface FooterProps {
  name: string;
  contact: {
    github: string;
    linkedin: string;
    resume: string;
  };
}

export function Footer({ name, contact }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              SYRP
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              AI & ML Engineer
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <Github className="h-6 w-6" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <FileText className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
          <p>© {currentYear} {name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with precision <Heart className="h-4 w-4 text-primary fill-primary" /> in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}