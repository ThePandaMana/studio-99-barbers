import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: `Skin fades, tapers, textured crops, scissor cuts and beard work from the chairs at ${site.business.name}.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader title={<>The<br />work</>} intro="Filter by style, then open any photo to see it full screen. Use your arrow keys or swipe to browse.">
        <ButtonLink href="/style-finder" variant="outline" className="h-auto whitespace-normal! py-3 text-left">Not sure what to ask for? Try the style finder</ButtonLink>
      </PageHeader>
      <Suspense fallback={<div className="shell min-h-[60vh]" aria-busy="true" />}>
        <GalleryExplorer />
      </Suspense>
      <FinalCta title="Seen something you like?" text="Screenshot it and bring it to your consultation." />
    </>
  );
}
