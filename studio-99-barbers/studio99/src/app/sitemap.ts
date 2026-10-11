import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/services", "/barbers", "/gallery", "/about", "/booking", "/contact", "/faq", "/style-finder", "/privacy", "/terms"];
  const now = new Date();
  return [
    ...routes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/booking" || path === "/services" ? 0.9 : 0.6,
    })),
    ...site.barbers.map((b) => ({ url: absoluteUrl(`/barbers/${b.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
