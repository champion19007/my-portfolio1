"use client";

import { Offering } from '@/app/types/portfolio';
import { SectionHeading } from './SectionHeading';
import { BrainCircuit, Workflow, ScanSearch, LineChart, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OfferingsProps {
  offerings: Offering[];
}

const iconMap: Record<string, any> = {
  BrainCircuit,
  Workflow,
  ScanSearch,
  LineChart
};

export function Offerings({ offerings }: OfferingsProps) {
  return (
    <section id="offerings" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Professional Offerings" 
          subtitle="How I help businesses and teams leverage AI, Machine Learning, and automated infrastructure."
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offerings.map((offering, idx) => {
            const Icon = iconMap[offering.icon] || Zap;
            return (
              <div 
                key={idx} 
                className="group p-8 rounded-[2.5rem] bg-secondary/10 border border-primary/5 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="h-32 w-32 text-primary" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter uppercase">{offering.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
                    {offering.description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {offering.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-semibold text-foreground/80 group/item">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 font-bold uppercase tracking-widest text-[10px]" asChild>
                    <Link href="/contact">Inquire about this service</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-br from-red-600/10 to-red-600/5 border border-primary/10 text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter">Ready to start a project?</h3>
          <p className="text-muted-foreground text-lg mb-10 font-medium">
            I'm currently available for freelance engagements and full-time engineering roles in AI, MLOps, and Data Science.
          </p>
          <Button size="lg" className="rounded-full px-12 py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30" asChild>
            <Link href="/contact">Let's Talk Business</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
