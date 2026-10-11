"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, ChevronUp, Clock, Plus, X } from "lucide-react";
import { site } from "@/config/site";
import type { ServiceCategoryId } from "@/types/site";
import { computeEstimate } from "@/lib/estimate";
import { bookingHref, cn, formatDuration, formatPrice, formatServicePrice } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { ButtonLink } from "@/components/ui/button";

type Filter = "all" | ServiceCategoryId;

export function ServiceCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const estimate = useMemo(() => computeEstimate(selected), [selected]);

  const categories = site.serviceCategories.filter((c) => filter === "all" || c.id === filter);
  const toggle = (id: string) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All services" }, ...site.serviceCategories.map((c) => ({ id: c.id, label: c.label }))];

  return (
    <div className="shell pb-24 lg:pb-36">
      <div role="group" aria-label="Filter services by category" className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "min-h-11 shrink-0 border px-4 text-sm font-medium transition-colors",
              filter === f.id ? "border-copper bg-copper text-on-copper" : "border-line text-mute hover:border-ivory/50 hover:text-ivory",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {categories.map((cat) => {
            const services = site.services.filter((s) => s.category === cat.id);
            return (
              <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="mb-16 last:mb-0">
                <div className="flex flex-col gap-1 border-b border-ivory/40 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 id={`cat-${cat.id}`} className="display text-[2.6rem]">{cat.label}</h2>
                  <p className="caption max-w-xs sm:text-right">{cat.description}</p>
                </div>
                <ul>
                  {services.map((s) => {
                    const isOn = selected.includes(s.id);
                    return (
                      <li key={s.id} className={cn("grid gap-5 border-b hairline py-7 transition-colors sm:grid-cols-[7rem_1fr]", isOn && "bg-coal/50")}>
                        <div className="relative hidden aspect-square overflow-hidden bg-coal sm:block">
                          {s.image ? (
                            <SafeImage image={s.image} sizes="112px" />
                          ) : (
                            <span aria-hidden className="display absolute inset-0 grid place-items-center text-4xl text-line">{site.business.wordmark.mark}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="display flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.9rem]">
                              {s.name}
                              {s.popular && <span className="border border-copper/60 px-1.5 py-0.5 font-sans text-[0.7rem] font-semibold normal-case tracking-wide text-copper">Popular</span>}
                            </h3>
                            <p className="display shrink-0 text-[1.9rem] tabular-nums">{formatServicePrice(s)}</p>
                          </div>
                          <p className="mt-2 max-w-xl text-mute">{s.description}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <span className="inline-flex items-center gap-1.5 text-sm text-mute"><Clock aria-hidden className="size-4" />{formatDuration(s.durationMinutes)}</span>
                            <button
                              type="button"
                              onClick={() => toggle(s.id)}
                              aria-pressed={isOn}
                              className={cn(
                                "inline-flex min-h-10 items-center gap-1.5 border px-3 text-sm font-semibold transition-colors",
                                isOn ? "border-copper bg-copper text-on-copper" : "border-ivory/30 text-ivory hover:border-ivory",
                              )}
                            >
                              {isOn ? <Check aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
                              {isOn ? "Added to estimate" : "Add to estimate"}
                              <span className="sr-only">: {s.name}</span>
                            </button>
                            <Link href={bookingHref({ services: [s.id] })} className="text-sm font-semibold text-copper link-draw">
                              Book now<span className="sr-only">: {s.name}</span>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          <p className="mt-10 max-w-2xl text-sm text-mute">
            Prices and times are a guide and may vary with hair length, density and the result you want. Your barber will confirm before starting.
          </p>
        </div>

        {/* Desktop estimate panel */}
        <aside aria-labelledby="estimate-title" className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 border hairline bg-coal p-6">
            <EstimatePanel estimate={estimate} onRemove={toggle} onClear={() => setSelected([])} />
          </div>
        </aside>
      </div>

      {/* Mobile estimate sheet */}
      <AnimatePresence>
        {estimate.items.length > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-coal lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <button
              type="button"
              onClick={() => setSheetOpen((o) => !o)}
              aria-expanded={sheetOpen}
              aria-controls="estimate-sheet"
              className="shell flex min-h-16 w-full items-center justify-between gap-4 text-left"
            >
              <span>
                <span className="block text-sm text-mute">{estimate.items.length} selected, {formatDuration(estimate.durationMinutes)}</span>
                <span className="display text-2xl">Est. {estimate.hasVariablePrice ? "from " : ""}{formatPrice(estimate.total)}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-copper">
                {sheetOpen ? "Hide" : "Review"} <ChevronUp aria-hidden className={cn("size-4 transition-transform", sheetOpen && "rotate-180")} />
              </span>
            </button>
            <div id="estimate-sheet" hidden={!sheetOpen} className="shell max-h-[60vh] overflow-y-auto border-t hairline py-5">
              <EstimatePanel estimate={estimate} onRemove={toggle} onClear={() => setSelected([])} compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EstimatePanel({
  estimate,
  onRemove,
  onClear,
  compact,
}: {
  estimate: ReturnType<typeof computeEstimate>;
  onRemove: (id: string) => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const empty = estimate.items.length === 0;
  return (
    <div>
      {!compact && <h2 id="estimate-title" className="display text-3xl">Your estimate</h2>}
      <div aria-live="polite" className="sr-only">
        {empty ? "No services selected." : `${estimate.items.length} services selected, estimated ${formatPrice(estimate.total)}, ${formatDuration(estimate.durationMinutes)}.`}
      </div>
      {empty ? (
        <p className="mt-4 text-mute">Add services from the menu to see an estimated total and how long your visit will take.</p>
      ) : (
        <>
          <ul className={cn("divide-y divide-line border-y hairline", !compact && "mt-5")}>
            {estimate.items.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-3">
                <span>
                  <span className="block font-medium">{s.name}</span>
                  <span className="text-sm text-mute">{formatDuration(s.durationMinutes)}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="tabular-nums">{formatServicePrice(s)}</span>
                  <button type="button" onClick={() => onRemove(s.id)} className="grid size-9 place-items-center text-mute hover:text-ivory" aria-label={`Remove ${s.name}`}>
                    <X aria-hidden className="size-4" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5">
            <div className="flex justify-between text-mute"><dt>Estimated time</dt><dd className="tabular-nums">{formatDuration(estimate.durationMinutes)}</dd></div>
            <div className="flex items-baseline justify-between"><dt className="font-medium">Estimated total</dt><dd className="display text-3xl tabular-nums">{estimate.hasVariablePrice ? "from " : ""}{formatPrice(estimate.total)}</dd></div>
          </dl>
          {estimate.warnings.length > 0 && (
            <ul className="mt-4 space-y-2">
              {estimate.warnings.map((w) => (
                <li key={w} className="flex gap-2 border-l-2 border-copper bg-ink/60 px-3 py-2 text-sm text-ivory/90">
                  <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-copper" />{w}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-mute">This is an estimate, not a booking. Final prices are confirmed in the shop.</p>
          <div className="mt-5 flex flex-col gap-2">
            <ButtonLink href={bookingHref({ services: estimate.items.map((s) => s.id) })} size="lg">Continue to booking</ButtonLink>
            <button type="button" onClick={onClear} className="min-h-11 text-sm text-mute hover:text-ivory">Clear selection</button>
          </div>
        </>
      )}
    </div>
  );
}
