"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AlertTriangle, CalendarClock, Check, Clock, ExternalLink, Mail, Phone, PlugZap } from "lucide-react";
import { site } from "@/config/site";
import { computeEstimate, sanitizeServiceIds } from "@/lib/estimate";
import { bookingConnected, cn, formatDuration, formatPrice, formatServicePrice, getBarber, mailHref, resolveBookingUrl, telHref } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { CopyButton } from "@/components/ui/copy-button";
import { buttonClasses } from "@/components/ui/button";

const ANY = "any";

export function BookingPlanner() {
  const params = useSearchParams();
  const [services, setServices] = useState<string[]>(() => sanitizeServiceIds((params.get("services") ?? "").split(",")));
  const [barberSlug, setBarberSlug] = useState<string>(() => {
    const b = params.get("barber");
    return b && getBarber(b) ? b : ANY;
  });
  const [attempted, setAttempted] = useState(false);

  const estimate = useMemo(() => computeEstimate(services), [services]);
  const barber = barberSlug === ANY ? undefined : getBarber(barberSlug);
  const hasServices = estimate.items.length > 0;

  const externalUrl = resolveBookingUrl({ barber, service: estimate.items.length === 1 ? estimate.items[0] : undefined });

  const summaryText = [
    `Booking request — ${site.business.name}`,
    `Services: ${estimate.items.map((s) => s.name).join(", ") || "not chosen yet"}`,
    `Barber: ${barber?.name ?? "Any available barber"}`,
    `Estimated: ${estimate.hasVariablePrice ? "from " : ""}${formatPrice(estimate.total)}, about ${formatDuration(estimate.durationMinutes)}`,
  ].join("\n");

  const mailto = `${mailHref}?subject=${encodeURIComponent(`Appointment request — ${site.business.name}`)}&body=${encodeURIComponent(`${summaryText}\n\nPreferred days/times:\nName:\nPhone:\n`)}`;

  const toggle = (id: string) => setServices((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:pb-36">
      <div className="min-w-0 space-y-16 lg:col-span-7">
        {!bookingConnected && (
          <div role="status" className="flex gap-4 border border-dashed border-silver/40 bg-coal p-5">
            <PlugZap aria-hidden className="mt-0.5 size-5 shrink-0 text-copper" />
            <div>
              <p className="font-semibold">Online booking isn&apos;t connected yet</p>
              <p className="mt-1 text-sm text-mute">
                You can still plan your visit here. When you&apos;re ready, call or email the shop with your selection and we&apos;ll confirm a time. Nothing is booked until the shop confirms.
              </p>
            </div>
          </div>
        )}

        {/* Step 1 */}
        <fieldset className="min-w-0">
          <legend className="flex w-full items-baseline gap-4 border-b border-ivory/40 pb-4">
            <span className="display text-2xl text-copper">1</span>
            <span className="display text-[2.4rem]">Choose your services</span>
          </legend>
          {site.serviceCategories.map((cat) => (
            <div key={cat.id} className="mt-8">
              <p className="mb-3 text-sm font-semibold text-mute">{cat.label}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {site.services.filter((s) => s.category === cat.id).map((s) => {
                  const on = services.includes(s.id);
                  return (
                    <li key={s.id}>
                      <label className={cn("flex h-full cursor-pointer items-start gap-3 border p-4 transition-colors", on ? "border-copper bg-copper/10" : "border-line hover:border-ivory/40")}>
                        <input type="checkbox" checked={on} onChange={() => toggle(s.id)} className="peer sr-only" />
                        <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper", on ? "border-copper bg-copper text-on-copper" : "border-ivory/40")}>
                          {on && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span className="flex-1">
                          <span className="flex justify-between gap-2 font-medium">
                            <span>{s.name}</span>
                            <span className="tabular-nums">{formatServicePrice(s)}</span>
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-sm text-mute"><Clock aria-hidden className="size-3.5" />{formatDuration(s.durationMinutes)}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {attempted && !hasServices && (
            <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-copper"><AlertTriangle aria-hidden className="size-4" />Choose at least one service to continue.</p>
          )}
        </fieldset>

        {/* Step 2 */}
        <fieldset className="min-w-0">
          <legend className="flex w-full items-baseline gap-4 border-b border-ivory/40 pb-4">
            <span className="display text-2xl text-copper">2</span>
            <span className="display text-[2.4rem]">Pick a barber</span>
          </legend>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {[{ slug: ANY, name: "Any available barber", specialty: "First free chair — the quickest way in" }, ...site.barbers].map((b) => {
              const on = barberSlug === b.slug;
              const full = b.slug === ANY ? undefined : getBarber(b.slug);
              return (
                <li key={b.slug}>
                  <label className={cn("flex h-full cursor-pointer items-center gap-4 border p-3 transition-colors", on ? "border-copper bg-copper/10" : "border-line hover:border-ivory/40")}>
                    <input type="radio" name="barber" value={b.slug} checked={on} onChange={() => setBarberSlug(b.slug)} className="peer sr-only" />
                    <span className="relative block size-14 shrink-0 overflow-hidden bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper">
                      {full ? (
                        <SafeImage image={full.portrait} sizes="56px" className={on ? "" : "grayscale"} />
                      ) : (
                        <span aria-hidden className="display grid h-full place-items-center text-2xl text-copper">{site.business.wordmark.mark}</span>
                      )}
                    </span>
                    <span>
                      <span className="block font-medium">{b.name}</span>
                      <span className="text-sm text-mute">{b.specialty}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* Step 3 */}
        <section aria-labelledby="step-3">
          <h2 id="step-3" className="flex items-baseline gap-4 border-b border-ivory/40 pb-4">
            <span className="display text-2xl text-copper">3</span>
            <span className="display text-[2.4rem]">Choose a time</span>
          </h2>
          <div className="mt-8 flex gap-4 border hairline p-5">
            <CalendarClock aria-hidden className="mt-0.5 size-5 shrink-0 text-copper" />
            {bookingConnected ? (
              <p className="text-mute">
                Times are picked on {site.booking.providerLabel}, so you only ever see real availability. Your appointment is confirmed there, not on this page.
              </p>
            ) : (
              <p className="text-mute">
                Live availability appears here once the shop connects its booking system. Until then, tell us your preferred days and times when you call or email and we&apos;ll confirm what&apos;s free.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside aria-labelledby="summary-title" className="min-w-0 lg:col-span-5">
        <div className="border hairline bg-coal p-6 lg:sticky lg:top-28 lg:p-8">
          <h2 id="summary-title" className="display text-4xl">Your visit</h2>
          <dl className="mt-6 divide-y divide-line border-y hairline">
            <div className="py-4">
              <dt className="text-sm text-mute">Services</dt>
              <dd className="mt-1">
                {hasServices ? (
                  <ul className="space-y-1">
                    {estimate.items.map((s) => (
                      <li key={s.id} className="flex justify-between gap-3"><span>{s.name}</span><span className="tabular-nums text-mute">{formatServicePrice(s)}</span></li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-mute">None selected yet</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-3 py-4"><dt className="text-sm text-mute">Barber</dt><dd>{barber?.name ?? "Any available"}</dd></div>
            <div className="flex justify-between gap-3 py-4"><dt className="text-sm text-mute">Estimated time</dt><dd className="tabular-nums">{hasServices ? formatDuration(estimate.durationMinutes) : "—"}</dd></div>
            <div className="flex items-baseline justify-between gap-3 py-4">
              <dt className="text-sm text-mute">Estimated total</dt>
              <dd className="display text-4xl tabular-nums">{hasServices ? `${estimate.hasVariablePrice ? "from " : ""}${formatPrice(estimate.total)}` : "—"}</dd>
            </div>
          </dl>
          <p className="sr-only" aria-live="polite">{hasServices ? `Estimated total ${formatPrice(estimate.total)}` : ""}</p>

          {estimate.warnings.length > 0 && (
            <ul className="mt-4 space-y-2">
              {estimate.warnings.map((w) => (
                <li key={w} className="flex gap-2 border-l-2 border-copper bg-ink/60 px-3 py-2 text-sm"><AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-copper" />{w}</li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-col gap-2">
            {bookingConnected && externalUrl ? (
              <>
                <a
                  href={hasServices ? externalUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!hasServices}
                  onClick={(e) => { if (!hasServices) { e.preventDefault(); setAttempted(true); } }}
                  className={buttonClasses("primary", "lg", cn("w-full", !hasServices && "opacity-50"))}
                >
                  <span>Continue to {site.booking.providerLabel}</span>
                  <ExternalLink aria-hidden className="size-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className="text-xs text-mute">You&apos;ll choose a time and confirm on {site.booking.providerLabel}. Copy your selection to paste into the booking notes.</p>
                <CopyButton value={summaryText} label="Copy my selection" className="self-start" />
              </>
            ) : (
              <>
                <a href={telHref} className={buttonClasses("primary", "lg", "w-full")}>
                  <Phone aria-hidden className="size-4" /><span>Call to book — {site.contact.phoneDisplay}</span>
                </a>
                <a
                  href={hasServices ? mailto : undefined}
                  onClick={(e) => { if (!hasServices) { e.preventDefault(); setAttempted(true); } }}
                  aria-disabled={!hasServices}
                  className={buttonClasses("outline", "lg", cn("w-full", !hasServices && "opacity-50"))}
                >
                  <Mail aria-hidden className="size-4" /><span>Email this request</span>
                </a>
                <p className="text-xs text-mute">Emailing opens your mail app with your selection filled in. The shop will reply to confirm a time.</p>
              </>
            )}
          </div>

          <div className="mt-8 border-t hairline pt-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Cancellation policy</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-mute marker:text-copper">
              {site.booking.cancellationPolicy.map((p) => <li key={p}>{p}</li>)}
            </ul>
            {site.booking.paymentNote && <p className="mt-4 text-sm text-mute">{site.booking.paymentNote}</p>}
            <p className="mt-4 text-xs text-mute">Prices are estimates and are confirmed by your barber before your service starts.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
