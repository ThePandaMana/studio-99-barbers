import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesPreview } from "@/components/home/services-preview";
import { WorkPreview } from "@/components/home/work-preview";
import { BarbersPreview } from "@/components/home/barbers-preview";
import { Values } from "@/components/home/values";
import { FeaturedTestimonial } from "@/components/home/featured-testimonial";
import { SocialStrip } from "@/components/home/social-strip";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <WorkPreview />
      <BarbersPreview />
      <Values />
      <FeaturedTestimonial />
      <SocialStrip />
      <FinalCta />
    </>
  );
}
