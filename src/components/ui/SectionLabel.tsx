import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
  tick = true,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tick?: boolean;
}) {
  return (
    <span className={cn("label-mono inline-flex items-center gap-2.5", className)}>
      {tick && <span className="size-1.5 bg-signal" aria-hidden />}
      {index && <span className="text-paper/80">{index}</span>}
      {index && <span className="text-muted/50">-</span>}
      <span>{children}</span>
    </span>
  );
}
