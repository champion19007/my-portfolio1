import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 space-y-4", centered && "text-center", className)}>
      <div className={cn("flex items-center gap-4 mb-2", centered && "justify-center")}>
        <div className="h-px w-8 bg-primary/40" />
        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Explore</span>
        <div className="h-px w-8 bg-primary/40" />
      </div>
      
      <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
      
      <div className={cn("h-1.5 w-24 bg-primary mt-6 rounded-full", centered && "mx-auto")} />
    </div>
  );
}