import type { Metadata } from "next";
import { site } from "@/config/site";

/** Indexing is always off while demo content is live, so fictional businesses never reach search results. */
export const indexingEnabled = site.seo.allowIndexing && !site.demoMode;

export function absoluteUrl(path = "/") {
  return new URL(path, site.seo.siteUrl).toString();
}

export function pageMetadata({ title, description, path }: { title?: string; description?: string; path: string }): Metadata {
  const desc = description ?? site.seo.description;
  return {
    title: title ?? undefined,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} | ${site.business.name}` : site.seo.defaultTitle,
      description: desc,
      url: path,
      siteName: site.business.name,
      type: "website",
      locale: site.business.locale.replace("-", "_"),
    },
    twitter: { card: "summary_large_image", title: title ?? site.seo.defaultTitle, description: desc },
  };
}

/**
 * schema.org BarberShop data. Returns null in demo mode so placeholder addresses,
 * phone numbers and ratings are never published as structured data.
 * Aggregate ratings are intentionally omitted: add them only when sourced from a real review platform.
 */
export function barberShopJsonLd() {
  if (site.demoMode) return null;
  const { address, phoneE164, email, geo } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: site.business.name,
    description: site.business.description,
    url: site.seo.siteUrl,
    telephone: phoneE164,
    email,
    priceRange: site.business.priceRange,
    image: site.images.hero.src.startsWith("http") ? site.images.hero.src : absoluteUrl(site.images.hero.src),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(geo ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } } : {}),
    openingHoursSpecification: site.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayName(h.day)}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: site.social.map((s) => s.url),
    ...(site.booking.url ? { potentialAction: { "@type": "ReserveAction", target: site.booking.url } } : {}),
  };
}

function dayName(d: string) {
  return { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" }[d];
}
