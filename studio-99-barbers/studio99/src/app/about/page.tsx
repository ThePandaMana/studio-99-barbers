import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { SafeImage } from "@/components/ui/safe-image";
import { DemoBadge } from "@/components/ui/demo-badge";
import { Reveal } from "@/components/ui/reveal";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `The story, philosophy and standards behind ${site.business.name}.`,
  path: "/about",
});

export default function AboutPage() {
  const { about } = site;
  const [imgA, imgB, imgC, imgD] = about.images;
  return (
    <>
      <header className="shell pb-16 pt-10 lg:pb-24 lg:pt-16">
        <DemoBadge>Demo story — replace with the shop&apos;s own</DemoBadge>
        <h1 className="display display-xl mt-6 max-w-5xl">{about.headline}</h1>
        <p className="mt-8 max-w-2xl text-xl text-ivory/85">{about.intro}</p>
      </header>

      {imgA && (
        <div className="relative aspect-[16/10] max-h-[80vh] w-full overflow-hidden bg-coal md:aspect-[21/9]">
          <SafeImage image={imgA} priority sizes="100vw" />
        </div>
      )}

      <section aria-labelledby="story-title" className="shell grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
        <h2 id="story-title" className="display display-md lg:col-span-4">The story</h2>
        <div className="prose-body max-w-2xl text-lg text-ivory/85 lg:col-span-7 lg:col-start-6">
          {about.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section aria-label="Philosophy and mission" className="border-y hairline bg-coal/50">
        <div className="shell grid gap-px bg-line md:grid-cols-2">
          <div className="bg-ink py-16 md:pr-12">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-copper">Philosophy</h2>
            <p className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-snug">{about.philosophy}</p>
          </div>
          <div className="bg-ink py-16 md:pl-12">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-copper">Mission</h2>
            <p className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-snug">{about.mission}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="shell py-24 lg:py-36">
        <h2 id="experience-title" className="display display-md border-t hairline pt-6">What to expect in the chair</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {about.experience.map((step, i) => (
            <li key={step.title} className="border-t border-ivory/40 pt-5">
              <span className="display text-5xl text-copper">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-3xl">{step.title}</h3>
              <p className="mt-2 text-mute">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {(imgB || imgC) && (
        <section aria-label="Inside the shop" className="shell grid gap-4 md:grid-cols-12">
          {imgB && <Reveal className="relative aspect-[4/5] overflow-hidden bg-coal md:col-span-5"><SafeImage image={imgB} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>}
          {imgC && <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden bg-coal md:col-span-7 md:mt-24"><SafeImage image={imgC} sizes="(min-width: 768px) 58vw, 100vw" /></Reveal>}
        </section>
      )}

      <section aria-labelledby="values-title" className="shell py-24 lg:py-36">
        <h2 id="values-title" className="display display-md border-t hairline pt-6">Our standards</h2>
        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {site.values.map((v) => (
            <div key={v.title} className="border-b hairline pb-8">
              <dt className="display text-3xl">{v.title}</dt>
              <dd className="mt-2 max-w-md text-mute">{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {about.milestones.length > 0 && (
        <section aria-labelledby="timeline-title" className="border-t hairline bg-coal/40 py-24 lg:py-36">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="timeline-title" className="display display-md">Milestones</h2>
              <DemoBadge className="mt-4">Sample timeline</DemoBadge>
            </div>
            <ol className="relative border-l hairline lg:col-span-8">
              {about.milestones.map((m) => (
                <li key={m.year} className="relative pb-12 pl-8 last:pb-0">
                  <span aria-hidden className="absolute -left-[5px] top-3 size-2.5 bg-copper" />
                  <p className="display text-5xl text-copper">{m.year}</p>
                  <h3 className="display mt-2 text-3xl">{m.title}</h3>
                  <p className="mt-2 max-w-lg text-mute">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {imgD && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-coal">
          <SafeImage image={imgD} sizes="100vw" />
        </div>
      )}
      <FinalCta title="Come and see for yourself." />
    </>
  );
}
