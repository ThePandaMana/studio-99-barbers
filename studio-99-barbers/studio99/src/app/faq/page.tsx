import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo-badge";
import { Accordion } from "@/components/faq/accordion";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: `Booking, walk-ins, payment, late arrivals, cancellations, parking and more at ${site.business.name}.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader title={<>Good<br />questions</>} intro="Everything people usually ask before their first visit.">
        <DemoBadge>Sample policies — confirm with the shop owner</DemoBadge>
      </PageHeader>
      <section aria-label="Frequently asked questions" className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:pb-36">
        <div className="lg:col-span-8">
          <Accordion items={site.faqs} />
        </div>
        <aside className="lg:col-span-4">
          <div className="border hairline bg-coal p-6 lg:sticky lg:top-28">
            <p className="display text-3xl">Still wondering?</p>
            <p className="mt-2 text-mute">
              Call us on <a href={telHref} className="text-ivory underline">{site.contact.phoneDisplay}</a> or <Link href="/contact" className="text-ivory underline">send a message</Link>.
            </p>
          </div>
        </aside>
      </section>
      <FinalCta />
    </>
  );
}
