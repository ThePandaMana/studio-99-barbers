"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { navigation, site } from "@/config/site";
import { cn, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "./wordmark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [panelTop, setPanelTop] = useState(0);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Body scroll lock, Escape to close, focus trap inside the open panel.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button"));
        const all = toggleRef.current ? [toggleRef.current, ...items] : items;
        const firstEl = all[0];
        const lastEl = all[all.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-500",
        scrolled || open ? "border-b hairline bg-ink/95 backdrop-blur-md" : "border-b border-transparent bg-ink/0",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${site.business.name} — home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("py-2 text-[0.92rem] font-medium transition-colors", active ? "text-ivory" : "text-mute hover:text-ivory")}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute -bottom-1 left-0 right-0 h-px bg-copper"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/booking" className="hidden sm:inline-flex">
            Book now
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => {
              // Anchor the panel under the header's current bottom edge (announcement bar may be above it).
              setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center text-ivory lg:hidden"
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: panelTop }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex-1 pt-6">
              <ul className="border-t hairline">
                {navigation.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      className="border-b hairline"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn("display flex items-baseline justify-between py-4 text-[2.6rem]", active ? "text-copper" : "text-ivory")}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="shell flex flex-col gap-4 py-8">
              <ButtonLink href="/booking" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Book your chair
              </ButtonLink>
              <a href={telHref} className="inline-flex min-h-11 items-center justify-center gap-2 text-mute hover:text-ivory">
                <Phone aria-hidden className="size-4" /> {site.contact.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
