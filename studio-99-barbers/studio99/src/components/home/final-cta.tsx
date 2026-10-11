import { site } from "@/config/site";
import { SafeImage } from "@/components/ui/safe-image";
import { ButtonLink } from "@/components/ui/button";

export function FinalCta({ title = "Ready for your next cut?", text }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden">
      <SafeImage image={site.images.cta} sizes="100vw" className="-z-10 opacity-35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="shell py-28 lg:py-40">
        <div>
          <h2 id="cta-title" className="display display-lg max-w-4xl">{title}</h2>
          <p className="mt-6 max-w-md text-lg text-ivory/85">
            {text ?? "Pick your service and barber in under a minute. Walk-ins welcome when a chair is free."}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/booking" size="lg">Book your appointment</ButtonLink>
            <ButtonLink href="/contact#location" size="lg" variant="outline">Find our shop</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
