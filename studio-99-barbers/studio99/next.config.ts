import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo photography is served from Unsplash's CDN (free Unsplash License).
    // Add your client's image host here, or move photos into /public and delete this.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
