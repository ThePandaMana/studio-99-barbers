import Link from "next/link";
import { navigation, site } from "@/config/site";
import { bookingConnected, directionsUrl, formatAddress, formatHours, mailHref, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "./wordmark";
import { OpenStatus } from "./open-status";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline bg-ink pb-28 pt-20 lg:pb-12">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark size="lg" />
            <p className="mt-6 max-w-sm text-mute">{site.business.description}</p>
            <ButtonLink href={bookingConnected ? site.booking.url : "/booking"} className="mt-8" showArrow={bookingConnected}>
              Book an appointment
            </ButtonLink>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-ivory">Explore</h2>
            <ul className="space-y-2.5 text-mute">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw hover:text-ivory">{item.label}</Link>
                </li>
              ))}
              <li><Link href="/faq" className="link-draw hover:text-ivory">FAQ</Link></li>
              <li><Link href="/style-finder" className="link-draw hover:text-ivory">Style finder</Link></li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-ivory">Visit</h2>
            <address className="not-italic text-mute">
              {formatAddress(true).map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-copper link-draw">
              Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <ul className="mt-6 space-y-1.5 text-mute">
              <li><a href={telHref} className="link-draw hover:text-ivory">{site.contact.phoneDisplay}</a></li>
              <li><a href={mailHref} className="link-draw hover:text-ivory">{site.contact.email}</a></li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ivory link-draw">
                    {s.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-ivory">Hours</h2>
            <OpenStatus className="mb-4" />
            <table className="w-full text-sm">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {site.hours.map((h) => (
                  <tr key={h.day} className="border-b hairline last:border-0">
                    <th scope="row" className="py-1.5 text-left font-normal text-mute">{h.label}</th>
                    <td className="py-1.5 text-right tabular-nums">{formatHours(h)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t hairline pt-6 text-sm text-mute md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.business.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="link-draw hover:text-ivory">Privacy policy</Link></li>
            <li><Link href="/terms" className="link-draw hover:text-ivory">Terms & conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
