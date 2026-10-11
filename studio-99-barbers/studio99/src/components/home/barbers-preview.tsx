import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/demo-badge";
import { BarberCard } from "@/components/barbers/barber-card";

export function BarbersPreview() {
  return (
    <section aria-labelledby="barbers-title" className="border-t hairline bg-coal/40 py-24 lg:py-36">
      <div className="shell">
        <SectionHeading
          id="barbers-title"
          title="Meet the barbers"
          aside="Three specialists, one standard. Book the hands that suit your hair."
          action={<ButtonLink href="/barbers" variant="outline">The whole team</ButtonLink>}
        />
        <DemoBadge className="mt-6">Fictional demo profiles</DemoBadge>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.barbers.slice(0, 3).map((barber, i) => (
            <BarberCard key={barber.slug} barber={barber} className={i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-10" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
