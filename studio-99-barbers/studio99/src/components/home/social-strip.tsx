import { Camera } from "lucide-react";
import { site } from "@/config/site";
import { SafeImage } from "@/components/ui/safe-image";

/** Instagram-style strip of shop photos. These are local gallery images, not a live feed. */
export function SocialStrip() {
  const ig = site.social.find((s) => s.label.toLowerCase() === "instagram") ?? site.social[0];
  const tiles = site.gallery.slice(0, 6);
  if (!ig) return null;
  return (
    <section aria-labelledby="social-title" className="py-24 lg:py-32">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="caption">Follow the chair on {ig.label}</p>
          <h2 id="social-title" className="display display-md mt-2">
            <a href={ig.url} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
              {ig.handle}<span className="sr-only"> on {ig.label} (opens in a new tab)</span>
            </a>
          </h2>
        </div>
        <a href={ig.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-copper link-draw">
          <Camera aria-hidden className="size-4" /> Follow us<span className="sr-only"> on {ig.label} (opens in a new tab)</span>
        </a>
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] lg:grid lg:grid-cols-6 lg:overflow-visible">
        {tiles.map((tile) => (
          <li key={tile.id} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto">
            <a
              href={ig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-coal"
              aria-label={`${tile.title} — see more on ${ig.label} (opens in a new tab)`}
            >
              <SafeImage image={tile.image} sizes="(min-width: 1024px) 16vw, 60vw" className="transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 grid place-items-center bg-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Camera className="size-6 text-ivory" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
