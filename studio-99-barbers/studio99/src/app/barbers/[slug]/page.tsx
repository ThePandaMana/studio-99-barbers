import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { bookingHref, getBarber, getService } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { ButtonLink } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/demo-badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.barbers.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const barber = getBarber((await params).slug);
  if (!barber) return {};
  return pageMetadata({
    title: `${barber.name} — ${barber.specialty}`,
    description: `${barber.shortBio} Book with ${barber.name} at ${site.business.name}.`,
    path: `/barbers/${barber.slug}`,
  });
}

export default async function BarberProfilePage({ params }: Props) {
  const barber = getBarber((await params).slug);
  if (!barber) notFound();

  const work = site.gallery.filter((g) => g.barberSlug === barber.slug).slice(0, 3);
  const others = site.barbers.filter((b) => b.slug !== barber.slug);
  const signature = barber.signatureServiceId ? getService(barber.signatureServiceId) : undefined;

  return (
    <article>
      <div className="shell pt-8">
        <Link href="/barbers" className="inline-flex min-h-11 items-center gap-2 text-sm text-mute hover:text-ivory">
          <ArrowLeft aria-hidden className="size-4" /> All barbers
        </Link>
      </div>
      <div className="shell grid gap-10 pb-20 pt-6 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <div className="relative aspect-[3/4] overflow-hidden bg-coal lg:col-span-5">
          <SafeImage image={barber.portrait} priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div className="flex flex-col lg:col-span-7 lg:pt-6">
          <DemoBadge>Fictional demo profile</DemoBadge>
          <h1 className="display display-lg mt-4">{barber.name}</h1>
          <p className="mt-3 text-xl font-medium text-copper">{barber.specialty}</p>
          <dl className="mt-8 grid grid-cols-2 border-y hairline">
            <div className="py-5 pr-4">
              <dt className="text-sm text-mute">Experience</dt>
              <dd className="display mt-1 text-3xl">{barber.yearsExperience !== undefined ? `${barber.yearsExperience} years` : "—"}</dd>
            </div>
            <div className="border-l hairline py-5 pl-5">
              <dt className="text-sm text-mute">Book them for</dt>
              <dd className="display mt-1 text-3xl">{signature?.name ?? "Any service"}</dd>
            </div>
          </dl>
          <div className="prose-body mt-8 max-w-xl text-lg text-ivory/85">
            {barber.bio.map((p) => <p key={p}>{p}</p>)}
          </div>
          <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">Favourite styles to cut</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {barber.favoriteStyles.map((s) => (
              <li key={s} className="border border-line px-3 py-1.5 text-sm">{s}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookingHref({ barber: barber.slug })} size="lg">Book with {barber.name.split(" ")[0]}</ButtonLink>
            {barber.instagram && (
              <ButtonLink href={barber.instagram} size="lg" variant="outline">See their work on Instagram</ButtonLink>
            )}
          </div>
        </div>
      </div>

      {work.length > 0 && (
        <section aria-labelledby="work-title" className="shell pb-24">
          <div className="flex items-end justify-between border-t hairline pt-6">
            <h2 id="work-title" className="display display-md">From {barber.name.split(" ")[0]}&apos;s chair</h2>
            <Link href="/gallery" className="hidden text-copper link-draw sm:inline">Full gallery</Link>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {work.map((g) => (
              <li key={g.id}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                    <SafeImage image={g.image} sizes="(min-width: 640px) 33vw, 100vw" />
                  </div>
                  <figcaption className="caption mt-2 text-sm">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="others-title" className="border-t hairline bg-coal/40 py-20">
        <div className="shell">
          <h2 id="others-title" className="display display-md">Also in the shop</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((b) => (
              <li key={b.slug}>
                <Link href={`/barbers/${b.slug}`} className="group flex items-center gap-5 border hairline p-4 hover:border-ivory/40">
                  <span className="relative block size-20 shrink-0 overflow-hidden bg-coal">
                    <SafeImage image={b.portrait} sizes="80px" className="grayscale group-hover:grayscale-0" />
                  </span>
                  <span>
                    <span className="display block text-3xl group-hover:text-copper">{b.name}</span>
                    <span className="text-mute">{b.specialty}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
