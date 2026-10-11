"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Phone } from "lucide-react";
import { site } from "@/config/site";
import { cn, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

/** Mobile booking bar + back-to-top control. Both appear only after scrolling past the first screen. */
export function FloatingActions() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const hideBookingBar = pathname.startsWith("/booking") || pathname.startsWith("/services");

  return (
    <AnimatePresence>
      {visible && (
        <>
          {!hideBookingBar && (
            <motion.div
              key="bar"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "110%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-ink/95 backdrop-blur-md lg:hidden"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="shell flex items-center gap-3 py-3">
                <a href={telHref} aria-label={`Call ${site.business.name}`} className="grid size-12 shrink-0 place-items-center border border-ivory/30 text-ivory">
                  <Phone aria-hidden className="size-5" />
                </a>
                <ButtonLink href="/booking" size="lg" className="flex-1">Book your chair</ButtonLink>
              </div>
            </motion.div>
          )}
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Back to top"
            className={cn(
              "fixed right-5 z-40 grid size-12 place-items-center border border-ivory/25 bg-coal text-ivory transition-colors hover:border-copper hover:text-copper",
              hideBookingBar ? "bottom-6" : "bottom-24 lg:bottom-8",
            )}
          >
            <ArrowUp aria-hidden className="size-5" />
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
