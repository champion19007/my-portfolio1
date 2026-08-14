import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 space-y-3", centered && "text-center", className)}>
      <div className={cn("flex items-center gap-3 mb-1", centered && "justify-center")}>
        <div className="h-px w-6 bg-primary/40" />
        <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Reference</span>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
      
      <div className={cn("h-1 w-12 bg-primary mt-4 rounded-full", centered && "mx-auto")} />
    </div>
  );
}