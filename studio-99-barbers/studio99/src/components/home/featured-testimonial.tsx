import { site } from "@/config/site";
import { SafeImage } from "@/components/ui/safe-image";

export function FeaturedTestimonial() {
  const t = site.testimonials[0];
  if (!t) return null;
  return (
    <section aria-labelledby="testimonial-title" className="relative overflow-hidden border-y hairline">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-72 lg:col-span-4">
          <SafeImage image={site.images.heroSecondary} sizes="(min-width: 1024px) 33vw, 100vw" className="opacity-80" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
        </div>
        <div className="shell py-20 lg:col-span-8 lg:px-16 lg:py-32">
          <h2 id="testimonial-title" className="sr-only">What clients say</h2>
          <div>
            <figure>
              <span aria-hidden className="display block text-[7rem] leading-[0.6] text-copper">&ldquo;</span>
              <blockquote className="font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] italic leading-[1.15] text-ivory">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-semibold">{t.author}</span>
                <span className="text-mute">{t.detail}</span>
                {t.isSample && (
                  <span className="border border-dashed border-silver/40 px-2 py-0.5 text-xs text-silver">
                    Sample testimonial — replace with a real, permitted review
                  </span>
                )}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
