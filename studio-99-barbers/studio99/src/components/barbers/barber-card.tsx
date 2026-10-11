import Link from "next/link";
import type { Barber } from "@/types/site";
import { SafeImage } from "@/components/ui/safe-image";
import { bookingHref, cn } from "@/lib/utils";

/** Portrait card: monochrome at rest, colour + lift on hover/focus. The whole portrait links to the profile. */
export function BarberCard({ barber, className, headingLevel = "h3" }: { barber: Barber; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={`/barbers/${barber.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-coal" aria-label={`View ${barber.name}'s profile`}>
        <SafeImage
          image={barber.portrait}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-within:grayscale-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        {barber.yearsExperience !== undefined && (
          <span className="absolute left-4 top-4 bg-ink/80 px-2.5 py-1 text-xs font-medium text-ivory">
            {barber.yearsExperience} yrs experience
          </span>
        )}
        <span className="absolute inset-x-4 bottom-4 translate-y-2 text-sm font-semibold text-copper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View profile
        </span>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <Heading className="display text-[2.2rem]">
          <Link href={`/barbers/${barber.slug}`} className="hover:text-copper">{barber.name}</Link>
        </Heading>
        <p className="mt-1 font-medium text-copper">{barber.specialty}</p>
        <p className="mt-3 text-mute">{barber.shortBio}</p>
        <div className="mt-auto pt-5">
          <Link href={bookingHref({ barber: barber.slug })} className="font-semibold text-ivory link-draw">
            Book with {barber.name.split(" ")[0]}
          </Link>
        </div>
      </div>
    </article>
  );
}
