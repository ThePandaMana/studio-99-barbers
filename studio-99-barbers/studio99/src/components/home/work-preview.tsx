import Link from "next/link";
import { site } from "@/config/site";
import { SafeImage } from "@/components/ui/safe-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Asymmetric editorial grid of five pieces. */
const layout = [
  "col-span-12 md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
  "col-span-6 md:col-span-5 aspect-square md:aspect-[5/4]",
  "col-span-6 md:col-span-5 aspect-square md:aspect-[5/4]",
  "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-auto md:h-[30rem] md:mt-6",
  "col-span-12 md:col-span-8 aspect-[16/10] md:aspect-auto md:h-[30rem] md:mt-6",
];

export function WorkPreview() {
  const picks = ["g01", "g03", "g07", "g12", "g06"]
    .map((id) => site.gallery.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <section id="work" aria-labelledby="work-title" className="shell py-24 lg:py-36">
      <SectionHeading
        id="work-title"
        title="Signature work"
        aside="Fades, tapers, scissor work and beards — straight from the chair."
        action={<ButtonLink href="/gallery" variant="outline">View the full gallery</ButtonLink>}
      />
      <div className="mt-14 grid grid-cols-12 gap-3 md:gap-4">
        {picks.map((item, i) => (
          <Link
            key={item.id}
            href={`/gallery?category=${item.category}`}
            className={cn("group relative block overflow-hidden bg-coal", layout[i])}
          >
            <SafeImage
              image={item.image}
              sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 50vw"}
              className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
              <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                <p className="display text-2xl md:text-3xl">{item.title}</p>
                <p className="caption mt-1 hidden text-sm text-ivory/80 md:block">{item.caption}</p>
              </div>
              <span className="shrink-0 border border-ivory/30 px-2 py-0.5 text-xs text-ivory/85">
                {site.galleryCategories.find((c) => c.id === item.category)?.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
