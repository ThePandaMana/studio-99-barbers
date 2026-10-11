import { Star } from "lucide-react";
import { site } from "@/config/site";
import { DemoBadge } from "@/components/ui/demo-badge";

export function TrustStrip() {
  const { rating, reviewCount, yearsInBusiness, cutsDelivered, reviewPlatformUrl } = site.stats;
  const items = [
    { value: rating.toFixed(1), label: "Average rating", icon: true },
    { value: reviewCount.toLocaleString(site.business.locale), label: "Client reviews" },
    { value: String(yearsInBusiness), label: "Years behind the chair" },
    { value: cutsDelivered, label: "Cuts delivered" },
  ];
  return (
    <section id="trust" aria-label="At a glance" className="border-y hairline bg-coal/60">
      <div className="shell">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col-reverse gap-1 py-8 lg:py-10 ${i % 2 ? "pl-6" : "pr-6"} ${i > 1 ? "border-t hairline lg:border-t-0" : ""} lg:px-8 ${i > 0 ? "lg:border-l lg:hairline" : "lg:pl-0"} ${i % 2 ? "border-l hairline" : ""}`}
            >
              <dt className="text-sm text-mute">{item.label}</dt>
              <dd className="display flex items-center gap-2 text-[clamp(2.8rem,6vw,4.5rem)]">
                {item.value}
                {item.icon && <Star aria-hidden className="size-6 fill-copper text-copper" />}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center gap-3 border-t hairline py-3 text-sm text-mute">
          <DemoBadge>Demo figures — set real numbers in config</DemoBadge>
          {reviewPlatformUrl && (
            <a href={reviewPlatformUrl} target="_blank" rel="noopener noreferrer" className="text-ivory link-draw">
              Read our reviews<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
