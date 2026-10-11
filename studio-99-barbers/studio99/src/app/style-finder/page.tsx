import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { StyleFinder } from "@/components/quiz/style-finder";

export const metadata: Metadata = pageMetadata({
  title: "Style finder",
  description: `Answer four quick questions to get haircut ideas to bring to your consultation at ${site.business.name}.`,
  path: "/style-finder",
});

export default function StyleFinderPage() {
  return (
    <>
      <PageHeader title={<>Find your<br />style</>} intro="Four quick questions, three ideas to bring to your consultation." />
      <StyleFinder />
    </>
  );
}
