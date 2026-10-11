import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Typographic logo built from config. Swap for an <Image> if a client supplies a logo file. */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const { top, mark, bottom } = site.business.wordmark;
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-ivory", className)}>
      <span
        aria-hidden
        className={cn("display leading-none text-copper", size === "lg" ? "text-[4.5rem]" : "text-[2.35rem]")}
      >
        {mark}
      </span>
      <span
        aria-hidden
        className={cn(
          "flex flex-col border-l border-ivory/25 pl-2.5 font-display font-bold uppercase leading-[0.95] tracking-[0.18em]",
          size === "lg" ? "text-xl" : "text-[0.8rem]",
        )}
      >
        <span>{top}</span>
        <span>{bottom}</span>
      </span>
      <span className="sr-only">{site.business.name}</span>
    </span>
  );
}
