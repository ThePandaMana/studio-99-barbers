import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCatalog } from "@/components/services/service-catalog";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Services & prices",
  description: `Haircuts, skin fades, taper fades, beard shaping and hot towel shaves at ${site.business.name}. See prices, times and build an estimate.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={<>Services<br />& prices</>}
        intro="Add services to build an estimate of your total and time in the chair, then continue to booking."
        image={site.images.servicesHeader}
      />
      <ServiceCatalog />
      <FinalCta title="Know what you want?" text="Choose your barber and a time that suits you." />
    </>
  );
}
