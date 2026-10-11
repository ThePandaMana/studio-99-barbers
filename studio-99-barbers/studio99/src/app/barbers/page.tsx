import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo-badge";
import { BarberCard } from "@/components/barbers/barber-card";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Our barbers",
  description: `Meet the barbers at ${site.business.name}: fade specialists, scissor experts and beard and shave pros.`,
  path: "/barbers",
});

export default function BarbersPage() {
  return (
    <>
      <PageHeader title={<>Our<br />barbers</>} intro="Every barber here has a speciality. Pick the one who matches your hair, or book whoever's free first.">
        <DemoBadge>Fictional demo profiles — replace with real staff</DemoBadge>
      </PageHeader>
      <section aria-label="Team" className="shell pb-24 lg:pb-36">
        <div className="grid gap-14 border-t hairline pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.barbers.map((barber, i) => (
            <BarberCard key={barber.slug} barber={barber} headingLevel="h2" className={i % 3 === 1 ? "lg:mt-16" : ""} />
          ))}
        </div>
      </section>
      <FinalCta title="Found your barber?" text="Pick a service and a time that works for you." />
    </>
  );
}
