import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/site";
import { SafeImage } from "@/components/ui/safe-image";

/** Editorial header for inner pages: oversized title left, optional photograph right. */
export function PageHeader({ title, intro, image, children }: { title: ReactNode; intro?: ReactNode; image?: ImageAsset; children?: ReactNode }) {
  return (
    <header className="shell grid gap-10 pb-16 pt-10 lg:grid-cols-12 lg:pb-24 lg:pt-16">
      <div className={image ? "min-w-0 lg:col-span-7" : "min-w-0 lg:col-span-10"}>
        <h1 className="display display-lg">{title}</h1>
        {intro && <p className="mt-6 max-w-xl text-lg text-ivory/85">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-coal lg:col-span-5 lg:aspect-auto lg:min-h-80">
          <SafeImage image={image} priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      )}
    </header>
  );
}
