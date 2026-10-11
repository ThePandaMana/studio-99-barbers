"use client";

import { useEffect, useState } from "react";
import { formatHours, getOpenState } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** "Open now / Closed" in the shop's time zone. Renders after mount to avoid hydration mismatch. */
export function OpenStatus({ className }: { className?: string }) {
  const [state, setState] = useState<ReturnType<typeof getOpenState> | null>(null);
  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!state) return <span className={cn("inline-block h-5", className)} aria-hidden />;
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span aria-hidden className={cn("size-2 rounded-full", state.isOpen ? "bg-copper animate-pulse-dot" : "bg-mute/60")} />
      <span>
        {state.isOpen ? "Open now" : "Closed now"}
        {state.today && <span className="text-mute">, today {formatHours(state.today).toLowerCase()}</span>}
      </span>
    </span>
  );
}
