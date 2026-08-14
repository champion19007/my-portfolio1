import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-16 space-y-3 md:space-y-4", centered && "text-center", className)}>
      <div className={cn("flex items-center gap-3 mb-1 md:mb-2", centered && "justify-center")}>
        <div className="h-px w-6 md:w-8 bg-primary/40" />
        <span className="text-primary font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px]">Explore</span>
        {centered && <div className="h-px w-6 md:w-8 bg-primary/40" />}
      </div>
      
      <h2 className="text-3xl md:text-6xl font-black text-foreground uppercase tracking-tight">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-xl max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0">
          {subtitle}
        </p>
      )}
      
      <div className={cn("h-1.5 w-20 md:w-24 bg-primary mt-4 md:mt-6 rounded-full", centered && "mx-auto")} />
    </div>
  );
}
