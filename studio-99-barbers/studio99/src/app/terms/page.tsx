import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { mailHref } from "@/lib/utils";
import { LegalLayout } from "@/components/ui/legal-layout";

export const metadata: Metadata = pageMetadata({ title: "Terms & conditions", description: `Terms for using the ${site.business.name} website.`, path: "/terms" });

export default function TermsPage() {
  const { business, legal, contact, booking } = site;
  return (
    <LegalLayout title="Terms & conditions">
      <section><h2>Using this website</h2><p>By using this website you agree to these terms. The site is provided by {legal.companyName} to share information about our services and help you book. Please don&apos;t misuse it, attempt to disrupt it or access it in ways it wasn&apos;t designed for.</p></section>
      <section><h2>Bookings and third-party links</h2><p>Appointments may be made through an external booking provider. Those bookings are subject to the provider&apos;s own terms. We aren&apos;t responsible for the content or availability of external websites linked from this site.</p></section>
      <section>
        <h2>Cancellations</h2>
        <p>Our current cancellation policy:</p>
        <ul>{booking.cancellationPolicy.map((p) => <li key={p}>{p}</li>)}</ul>
        <p>See the <Link href="/faq" className="underline">FAQ</Link> for more detail.</p>
      </section>
      <section><h2>Prices</h2><p>Prices and durations shown on this website, including any estimates, are a guide. They may change and may vary with hair length, density and the service you need. Your barber will confirm the price before your service begins.</p></section>
      <section><h2>Intellectual property</h2><p>Text, branding and original images on this site belong to {business.name} or are used under licence. Don&apos;t reuse them without permission.</p></section>
      <section><h2>Limitation of liability</h2><p>We work to keep this website accurate and available but can&apos;t guarantee it will always be error-free or uninterrupted. To the extent permitted by law, we aren&apos;t liable for losses arising from use of the website. Nothing in these terms limits liability that can&apos;t be limited by law. [Owner: have this section reviewed for {legal.jurisdiction}.]</p></section>
      <section><h2>Contact</h2><p>Questions about these terms: <a href={mailHref} className="underline">{contact.email}</a>.</p></section>
    </LegalLayout>
  );
}
