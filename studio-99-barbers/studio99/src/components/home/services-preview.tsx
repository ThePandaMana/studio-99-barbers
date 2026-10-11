"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock } from "lucide-react";
import { site } from "@/config/site";
import { bookingHref, formatDuration, formatServicePrice } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

/** Most-booked services. Hovering or focusing a row swaps the photograph on the left. */
export function ServicesPreview() {
  const featured = site.services.filter((s) => s.popular && s.image).slice(0, 4);
  const fallback = site.services.filter((s) => s.image).slice(0, 4 - featured.length);
  const list = [...featured, ...fallback.filter((s) => !featured.includes(s))];
  const [activeId, setActiveId] = useState(list[0]?.id);
  const active = list.find((s) => s.id === activeId) ?? list[0];

  return (
    <section aria-labelledby="services-title" className="shell py-24 lg:py-36">
      <SectionHeading
        id="services-title"
        title="Most booked"
        aside="Every cut starts with a consultation and finishes with a hot towel and style."
        action={<ButtonLink href="/services" variant="outline">Full menu & prices</ButtonLink>}
      />
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-coal">
            <AnimatePresence initial={false}>
              {active?.image && (
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SafeImage image={active.image} sizes="40vw" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <ul className="lg:col-span-7">
          {list.map((service) => (
            <li
              key={service.id}
              onMouseEnter={() => setActiveId(service.id)}
              onFocus={() => setActiveId(service.id)}
              className="group border-b hairline first:border-t"
            >
              <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 py-7">
                <h3 className="display text-[clamp(1.9rem,4vw,3rem)] transition-colors group-hover:text-copper">{service.name}</h3>
                <p className="display self-start text-[clamp(1.6rem,3vw,2.4rem)] tabular-nums">{formatServicePrice(service)}</p>
                <p className="max-w-lg text-mute">{service.description}</p>
                <div className="col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-mute">
                    <Clock aria-hidden className="size-4" /> {formatDuration(service.durationMinutes)}
                  </span>
                  <Link href={bookingHref({ services: [service.id] })} className="font-semibold text-copper link-draw">
                    Book this<span className="sr-only">: {service.name}</span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
