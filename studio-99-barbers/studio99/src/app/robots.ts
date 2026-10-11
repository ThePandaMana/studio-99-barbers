import type { MetadataRoute } from "next";
import { absoluteUrl, indexingEnabled } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // While the site holds demo content, ask search engines not to index it.
  if (!indexingEnabled) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: absoluteUrl("/sitemap.xml") };
}
