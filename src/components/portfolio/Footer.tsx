import { Rocket, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <Rocket className="h-6 w-6" />
            DevLaunch
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
          <p>© {currentYear} DevLaunch Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Alex Dev
          </p>
        </div>
      </div>
    </footer>
  );
}
