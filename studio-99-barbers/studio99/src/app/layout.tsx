import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/800";
import "@fontsource-variable/archivo/wght";
import "@fontsource/instrument-serif/400-italic";
import "./globals.css";
import { site } from "@/config/site";
import { barberShopJsonLd, indexingEnabled } from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { MotionProvider } from "@/components/providers/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.siteUrl),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.business.name,
    title: site.seo.defaultTitle,
    description: site.seo.description,
    url: "/",
    locale: site.business.locale.replace("-", "_"),
  },
  twitter: { card: "summary_large_image" },
  robots: indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.theme.colors.background,
  colorScheme: "dark",
};

/** Brand tokens from config → CSS variables consumed by globals.css. */
const { colors, fonts } = site.theme;
const themeCss = `:root{--brand-bg:${colors.background};--brand-surface:${colors.surface};--brand-text:${colors.text};--brand-muted:${colors.muted};--brand-accent:${colors.accent};--brand-on-accent:${colors.onAccent};--brand-border:${colors.border};--brand-silver:${colors.silver};--brand-font-display:${fonts.display};--brand-font-body:${fonts.body};--brand-font-serif:${fonts.serif};}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = barberShopJsonLd();
  return (
    <html lang={site.business.locale.split("-")[0]}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        )}
      </head>
      <body>
        <a href="#main" className="sr-only z-[100] bg-copper px-4 py-3 font-semibold text-on-copper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <MotionProvider>
          <AnnouncementBar />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </MotionProvider>
      </body>
    </html>
  );
}
