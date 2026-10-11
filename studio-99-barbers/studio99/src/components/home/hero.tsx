"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type React from "react";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { OpenStatus } from "@/components/layout/open-status";

const lines = ["Your cut.", "Your", "signature."];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle parallax on the photograph only; disabled for reduced motion.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);

  const { neighborhood, address } = site.contact;

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-6 lg:pb-24 lg:pt-10">
      {/* Oversized outlined mark — the brand's one bold gesture. */}
      <motion.span
        aria-hidden
        style={{ y: markY }}
        className="display outline-type pointer-events-none absolute -bottom-[0.18em] -left-[0.04em] select-none text-[clamp(18rem,52vw,46rem)] leading-none"
      >
        {site.business.wordmark.mark}
      </motion.span>

      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Photograph */}
        <figure className="hero-unclip relative order-2 lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <div className="relative aspect-[4/5] overflow-hidden bg-coal sm:aspect-[5/4] lg:aspect-auto lg:h-[min(78vh,52rem)]">
            <motion.div className="absolute inset-[-6%_0]" style={{ y: imageY }}>
              <div className="hero-settle absolute inset-0">
                <SafeImage image={site.images.hero} priority sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/55 lg:via-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 lg:left-auto">
              <span className="bg-ink/80 px-3 py-1.5 text-xs font-medium tracking-wide text-ivory backdrop-blur-sm">
                <OpenStatus />
              </span>
            </div>
          </div>
          <figcaption className="caption mt-3 flex justify-between gap-4 text-sm">
            <span>Straight-razor detailing after a skin fade.</span>
            {site.images.hero.credit && <span className="hidden shrink-0 not-italic sm:inline">Photo: {site.images.hero.credit}</span>}
          </figcaption>
        </figure>

        {/* Copy */}
        <div className="relative z-10 order-1 flex flex-col justify-center lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <p className="mb-6 flex items-center gap-2 text-sm text-mute">
            <MapPin aria-hidden className="size-4 text-copper" />
            {neighborhood ? `${neighborhood}, ` : ""}
            {address.city}
          </p>

          <h1 id="hero-title" className="display display-xl lg:-mr-[18%]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line block" style={{ "--d": `${0.35 + i * 0.12}s` } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-fade">
            <div className="mt-8 flex items-center gap-4">
              <span aria-hidden className="hero-rule h-px w-14 bg-copper" />
              <p className="text-lg text-ivory/90">{site.business.tagline}</p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/booking" size="lg">Book your chair</ButtonLink>
              <ButtonLink href="#work" size="lg" variant="outline">Explore our work</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="shell relative mt-14 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-mute hover:text-ivory lg:flex"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-copper"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </a>
    </section>
  );
}
