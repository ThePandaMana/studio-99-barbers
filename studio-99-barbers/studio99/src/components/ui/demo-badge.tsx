import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Small label marking placeholder content. Renders nothing once demoMode is false. */
export function DemoBadge({ children = "Demo content", className, force }: { children?: string; className?: string; force?: boolean }) {
  if (!site.demoMode && !force) return null;
  return (
    <span className={cn("inline-flex items-center gap-1.5 border border-dashed border-silver/40 px-2 py-0.5 text-[0.7rem] font-medium tracking-wide text-silver", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-silver/70" />
      {children}
    </span>
  );
}
