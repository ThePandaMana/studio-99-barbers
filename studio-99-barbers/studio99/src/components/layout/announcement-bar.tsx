"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { site } from "@/config/site";

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  const { enabled, message, href, linkLabel } = site.announcement;
  if (!enabled || hidden) return null;
  return (
    <div className="relative z-[60] border-b hairline bg-coal text-ivory">
      <div className="shell flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center text-[0.8rem] font-medium uppercase tracking-[0.14em]">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-copper animate-pulse-dot" />
        <p>{message}</p>
        {href && linkLabel && (
          <Link href={href} className="hidden text-copper link-draw sm:inline">
            {linkLabel}
          </Link>
        )}
      </div>
      <button
        type="button"
        onClick={() => setHidden(true)}
        className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center text-mute hover:text-ivory"
        aria-label="Dismiss announcement"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
