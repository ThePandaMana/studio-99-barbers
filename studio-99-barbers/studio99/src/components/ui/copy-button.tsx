"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={cn("inline-flex min-h-9 items-center gap-1.5 text-sm text-mute transition-colors hover:text-ivory", className)}
    >
      {state === "copied" ? <Check aria-hidden className="size-4 text-copper" /> : <Copy aria-hidden className="size-4" />}
      <span>{state === "copied" ? "Copied" : state === "error" ? "Copy failed — select the text instead" : label}</span>
      <span className="sr-only" aria-live="polite">{state === "copied" ? `${label}: copied to clipboard` : ""}</span>
    </button>
  );
}
