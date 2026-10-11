import type { ReactNode } from "react";
import { site } from "@/config/site";

/** Shared shell for legal templates, with an unmissable review notice. */
export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="shell grid gap-12 pb-24 pt-10 lg:grid-cols-12 lg:pb-36 lg:pt-16">
      <header className="lg:col-span-4">
        <h1 className="display display-lg">{title}</h1>
        <p className="mt-4 text-sm text-mute">Last updated: {site.legal.lastUpdated}</p>
      </header>
      <div className="lg:col-span-8">
        <div role="note" className="mb-10 border-l-2 border-copper bg-coal p-5 text-sm">
          <p className="font-semibold">Template — review before publishing</p>
          <p className="mt-1 text-mute">
            This is a general starting point, not legal advice, and it doesn&apos;t claim compliance with any law. The business owner should review and adapt it,
            ideally with a qualified professional, before the site goes live.
          </p>
        </div>
        <div className="space-y-10 text-ivory/85 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-ivory [&_li]:mt-1.5 [&_p+p]:mt-3 [&_p]:max-w-2xl [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-copper">
          {children}
        </div>
      </div>
    </article>
  );
}
