"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2, Copy, CheckCircle } from 'lucide-react';
import { generateProjectSummary } from '@/ai/flows/ai-generate-project-summary';
import { SectionHeading } from './SectionHeading';
import { useToast } from '@/hooks/use-toast';

export function AIGenerator() {
  const [rawNotes, setRawNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ summary: string; achievements: string[] } | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!rawNotes.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter some raw notes about your project.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const output = await generateProjectSummary({ rawNotes });
      setResult(output);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to your clipboard.",
    });
  };

  return (
    <section id="ai-tool" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="AI Content Assistant" 
          subtitle="Transform your messy project notes into professional summaries and highlights."
        />
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl bg-secondary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Project Brief Generator</CardTitle>
                  <CardDescription>Enter your project details and let AI do the heavy lifting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Raw Project Notes</label>
                  <Textarea 
                    placeholder="e.g., built a shopping cart app using nextjs, had issues with state management but fixed it using context api, added stripe payments and auth with clerk..."
                    value={rawNotes}
                    onChange={(e) => setRawNotes(e.target.value)}
                    className="min-h-[150px] rounded-xl border-primary/20 focus-visible:ring-primary bg-background"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading}
                  className="w-full rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Crafting your brief...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Professional Brief
                    </>
                  )}
                </Button>

                {result && (
                  <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 rounded-2xl bg-background border border-primary/20">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Project Summary
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.summary)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-lg italic leading-relaxed text-muted-foreground">
                        &quot;{result.summary}&quot;
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-background border border-primary/20">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Key Achievements
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.achievements.join('\n'))}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <ul className="space-y-3">
                        {result.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
