import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { directionsUrl, formatAddress, formatHours, mailHref, telHref } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { CopyButton } from "@/components/ui/copy-button";
import { ButtonLink } from "@/components/ui/button";
import { OpenStatus } from "@/components/layout/open-status";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact & location",
  description: `Find ${site.business.name}: address, opening hours, phone, directions and a contact form.`,
  path: "/contact",
});

export default function ContactPage() {
  const address = formatAddress().join("");
  const deliveryEnabled = Boolean(process.env.RESEND_API_KEY);
  return (
    <>
      <PageHeader title={<>Visit the<br />shop</>} intro="Questions about a cut, a group booking or anything else? Call, email or send a message below.">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/booking">Book an appointment</ButtonLink>
          <ButtonLink href={telHref} variant="outline">Call {site.contact.phoneDisplay}</ButtonLink>
        </div>
      </PageHeader>

      <section id="location" aria-labelledby="location-title" className="shell grid gap-px border-y hairline bg-line lg:grid-cols-12">
        <h2 id="location-title" className="sr-only">Location and opening hours</h2>
        <div className="bg-ink py-10 pr-6 lg:col-span-4 lg:pr-10">
          <MapPin aria-hidden className="size-5 text-copper" />
          <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">Address</h3>
          <address className="mt-2 text-lg not-italic">
            {formatAddress(true).map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          {site.contact.parkingNote && <p className="mt-3 text-sm text-mute">{site.contact.parkingNote}</p>}
          <div className="mt-4 flex flex-wrap gap-x-5">
            <CopyButton value={address} label="Copy address" />
            <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 text-sm text-copper link-draw">
              <Navigation aria-hidden className="size-4" /> Directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="bg-ink py-10 lg:col-span-4 lg:px-10">
          <Phone aria-hidden className="size-5 text-copper" />
          <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">Phone & email</h3>
          <p className="mt-2 text-lg"><a href={telHref} className="link-draw">{site.contact.phoneDisplay}</a></p>
          <p className="mt-1 flex items-center gap-2 text-lg"><Mail aria-hidden className="size-4 text-mute" /><a href={mailHref} className="link-draw break-all">{site.contact.email}</a></p>
          <div className="mt-3 flex flex-wrap gap-x-5">
            <CopyButton value={site.contact.phoneDisplay} label="Copy phone" />
            <CopyButton value={site.contact.email} label="Copy email" />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold link-draw">{s.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
            ))}
          </ul>
        </div>
        <div className="bg-ink py-10 lg:col-span-4 lg:pl-10">
          <Clock aria-hidden className="size-5 text-copper" />
          <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">Opening hours</h3>
          <OpenStatus className="mt-2" />
          <table className="mt-4 w-full">
            <caption className="sr-only">Weekly opening hours</caption>
            <tbody>
              {site.hours.map((h) => (
                <tr key={h.day} className="border-b hairline last:border-0">
                  <th scope="row" className="py-2 text-left font-normal text-mute">{h.label}</th>
                  <td className="py-2 text-right tabular-nums">{formatHours(h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Map" className="shell py-16">
        {site.contact.mapEmbedUrl ? (
          <iframe
            src={site.contact.mapEmbedUrl}
            title={`Map showing ${site.business.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[16/9] w-full border hairline grayscale invert-[0.92] hue-rotate-180"
          />
        ) : (
          <div className="relative flex aspect-[4/3] items-end overflow-hidden border hairline bg-coal p-6 sm:aspect-[21/9] sm:p-10"
            style={{ backgroundImage: "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)", backgroundSize: "56px 56px" }}>
            <span aria-hidden className="absolute left-1/2 top-[42%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-copper text-on-copper">
              <MapPin className="size-6" />
            </span>
            <div className="relative bg-ink/90 p-5">
              <p className="display text-3xl">{site.business.name}</p>
              <p className="text-mute">{address}</p>
              <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-copper link-draw">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="form-title" className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:pb-36">
        <div className="lg:col-span-4">
          <h2 id="form-title" className="display display-md">Send a message</h2>
          <p className="mt-4 max-w-sm text-mute">For appointments, the fastest route is online booking or a phone call. Use this form for everything else.</p>
        </div>
        <div className="lg:col-span-8">
          <ContactForm deliveryEnabled={deliveryEnabled} />
        </div>
      </section>
    </>
  );
}
