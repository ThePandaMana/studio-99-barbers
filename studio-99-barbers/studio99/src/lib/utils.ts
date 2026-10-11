import { site } from "@/config/site";
import type { Barber, OpeningHoursEntry, Service } from "@/types/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const priceFormatter = new Intl.NumberFormat(site.business.locale, {
  style: "currency",
  currency: site.business.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return priceFormatter.format(amount);
}

export function formatServicePrice(service: Pick<Service, "price" | "priceFrom">) {
  return `${service.priceFrom ? "from " : ""}${formatPrice(service.price)}`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function formatAddress(multiline = false) {
  const { street, city, region, postalCode } = site.contact.address;
  return multiline ? [street, `${city}, ${region} ${postalCode}`] : [`${street}, ${city}, ${region} ${postalCode}`];
}

export function directionsUrl() {
  const { street, city, region, postalCode } = site.contact.address;
  const q = encodeURIComponent(`${site.business.name}, ${street}, ${city}, ${region} ${postalCode}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;

/** True when a real booking provider link is configured. */
export const bookingConnected = Boolean(site.booking.url.trim());

/**
 * Resolves the most specific booking link: barber → service → shop-wide.
 * Returns null when nothing is configured (demo mode).
 */
export function resolveBookingUrl(opts: { barber?: Barber; service?: Service } = {}) {
  return opts.barber?.bookingUrl || opts.service?.bookingUrl || site.booking.url || null;
}

/** Internal link to the booking page, pre-filling selections via query string. */
export function bookingHref(opts: { services?: string[]; barber?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.services?.length) params.set("services", opts.services.join(","));
  if (opts.barber) params.set("barber", opts.barber);
  const qs = params.toString();
  return qs ? `/booking?${qs}` : "/booking";
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(Date.UTC(2000, 0, 1, h, m));
  return new Intl.DateTimeFormat(site.business.locale, { hour: "numeric", minute: m ? "2-digit" : undefined, timeZone: "UTC" }).format(d);
}

export function formatHours(entry: OpeningHoursEntry) {
  if (!entry.open || !entry.close) return "Closed";
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

/** Current open/closed state in the shop's own time zone. */
export function getOpenState(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.business.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  const key = weekday.slice(0, 2) as OpeningHoursEntry["day"];
  const today = site.hours.find((h) => h.day === key);
  const current = `${hour}:${minute}`;
  const isOpen = Boolean(today?.open && today.close && current >= today.open && current < today.close);
  return { today, isOpen, dayKey: key };
}

export function getService(id: string) {
  return site.services.find((s) => s.id === id);
}

export function getBarber(slug: string) {
  return site.barbers.find((b) => b.slug === slug);
}
