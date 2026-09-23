import { cn } from "@/lib/utils";

/**
 * Marks a project as Zaina's own product rather than client work.
 * Uses the brand gradient + an explicit white so it stays legible on any
 * cover image - note `.label-mono` forces a muted grey, so the colour and
 * tracking are set here instead of relying on that class.
 */
export function ProductBadge({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono font-medium uppercase text-white ring-1 ring-inset ring-white/25 shadow-[0_6px_20px_-6px_rgba(224,71,59,0.85)] backdrop-blur-md",
        size === "sm"
          ? "px-2.5 py-1 text-[0.5rem] tracking-[0.14em]"
          : "px-3 py-1.5 text-[0.56rem] tracking-[0.16em]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, #B82E2E 0%, #E0473B 45%, #FF6B4A 100%)",
      }}
    >
      <span
        aria-hidden
        className={cn(
          "rounded-full bg-white",
          size === "sm" ? "size-1" : "size-1.5"
        )}
      />
      Our Product
    </span>
  );
}
