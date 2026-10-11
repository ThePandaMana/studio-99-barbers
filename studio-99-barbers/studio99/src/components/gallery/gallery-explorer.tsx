"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { site } from "@/config/site";
import type { GalleryCategoryId, GalleryItem } from "@/types/site";
import { cn, getBarber } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

type Filter = "all" | GalleryCategoryId;
const shapeClass: Record<GalleryItem["shape"], string> = { tall: "aspect-[4/5]", wide: "aspect-[4/3]", square: "aspect-square" };

function isCategory(v: string | null): v is GalleryCategoryId {
  return !!v && site.galleryCategories.some((c) => c.id === v);
}

export function GalleryExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = params.get("category");
  const [filter, setFilter] = useState<Filter>(isCategory(initial) ? initial : "all");
  const [index, setIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const items = filter === "all" ? site.gallery : site.gallery.filter((g) => g.category === filter);

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const qs = f === "all" ? "" : `?category=${f}`;
    router.replace(`${pathname}${qs}`, { scroll: false });
  };

  const counts = Object.fromEntries(site.galleryCategories.map((c) => [c.id, site.gallery.filter((g) => g.category === c.id).length]));

  return (
    <div className="shell pb-24 lg:pb-36">
      <div role="group" aria-label="Filter gallery by style" className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-1">
        {[{ id: "all" as Filter, label: "All work", count: site.gallery.length }, ...site.galleryCategories.map((c) => ({ id: c.id as Filter, label: c.label, count: counts[c.id] }))].map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => changeFilter(f.id)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-sm font-medium transition-colors",
              filter === f.id ? "border-copper bg-copper text-on-copper" : "border-line text-mute hover:border-ivory/50 hover:text-ivory",
            )}
          >
            {f.label}
            <span className={cn("text-xs tabular-nums", filter === f.id ? "text-on-copper/70" : "text-mute/70")}>{f.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{items.length} photos shown</p>

      {items.length === 0 ? (
        <div className="mt-12 border border-dashed border-line p-12 text-center">
          <p className="display text-3xl">Nothing here yet</p>
          <p className="mt-2 text-mute">There are no photos in this category. Try another style.</p>
          <button type="button" onClick={() => changeFilter("all")} className="mt-6 font-semibold text-copper link-draw">Show all work</button>
        </div>
      ) : (
        <motion.ul key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <li key={item.id} className="mb-4 break-inside-avoid">
              <figure>
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setIndex(i);
                  }}
                  className={cn("group relative block w-full overflow-hidden bg-coal", shapeClass[item.shape])}
                  aria-label={`Open “${item.title}” in full screen`}
                >
                  <SafeImage
                    image={item.image}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                    className="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span aria-hidden className="absolute right-3 top-3 grid size-9 place-items-center bg-ink/70 text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="size-4" />
                  </span>
                </button>
                <figcaption className="mt-2.5 flex items-baseline justify-between gap-3">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-mute">{site.galleryCategories.find((c) => c.id === item.category)?.label}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </motion.ul>
      )}

      <Lightbox items={items} index={index} onIndexChange={setIndex} onClose={() => { setIndex(null); triggerRef.current?.focus(); }} />
    </div>
  );
}

function Lightbox({ items, index, onIndexChange, onClose }: { items: GalleryItem[]; index: number | null; onIndexChange: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const [dir, setDir] = useState(1);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
  }, [open]);

  // Restore page scroll if the component unmounts while open (e.g. route change).
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  const barber = item?.barberSlug ? getBarber(item.barberSlug) : undefined;

  return (
    <dialog
      ref={ref}
      aria-labelledby="lightbox-title"
      onClose={() => { document.body.style.overflow = ""; onClose(); }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
      onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close(); }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-ivory backdrop:bg-ink/90"
    >
      {item && (
        <div className="flex h-full flex-col" onPointerDown={(e) => { startX.current = e.clientX; }} onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}>
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <p className="text-sm tabular-nums text-mute" aria-live="polite">{index! + 1} / {items.length}</p>
            <button type="button" onClick={() => ref.current?.close()} className="grid size-11 place-items-center hover:text-copper" aria-label="Close gallery" autoFocus>
              <X aria-hidden className="size-6" />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 inset-y-0 sm:inset-x-20"
              >
                <SafeImage image={item.image} sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-ivory/20 bg-ink/70 hover:border-copper hover:text-copper sm:left-5" aria-label="Previous photo">
              <ChevronLeft aria-hidden className="size-6" />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-ivory/20 bg-ink/70 hover:border-copper hover:text-copper sm:right-5" aria-label="Next photo">
              <ChevronRight aria-hidden className="size-6" />
            </button>
          </div>
          <div className="shell flex shrink-0 flex-col gap-1 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="lightbox-title" className="display text-3xl">{item.title}</h2>
              <p className="caption">{item.caption}</p>
            </div>
            <p className="text-sm text-mute">
              {barber ? <>Cut by {barber.name}</> : null}
              {item.image.credit ? <span className="block sm:text-right">Photo: {item.image.credit} / Unsplash</span> : null}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}
