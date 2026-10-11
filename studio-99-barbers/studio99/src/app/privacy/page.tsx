import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { mailHref } from "@/lib/utils";
import { LegalLayout } from "@/components/ui/legal-layout";

export const metadata: Metadata = pageMetadata({ title: "Privacy policy", description: `How ${site.business.name} handles personal information.`, path: "/privacy" });

export default function PrivacyPage() {
  const { business, legal, contact } = site;
  return (
    <LegalLayout title="Privacy policy">
      <section><h2>Who we are</h2><p>This website is operated by {legal.companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). You can contact us at <a href={mailHref} className="underline">{contact.email}</a> or {contact.phoneDisplay}.</p></section>
      <section>
        <h2>Information we may collect</h2>
        <ul>
          <li>Details you send through the contact form: your name, email address, enquiry type and message.</li>
          <li>Details you give when you call or email us to book.</li>
          <li>Basic technical information your browser shares with our hosting provider, such as IP address and device type, used to keep the site secure and working.</li>
        </ul>
        <p>Online appointments are handled by our booking provider. When you book through their page, their own privacy policy applies to the details you give them.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and manage your appointments.</li>
          <li>To keep notes about your preferred cut, if you ask us to.</li>
          <li>To run, secure and improve this website.</li>
        </ul>
        <p>We don&apos;t sell your personal information. [Owner: list any marketing emails, analytics or advertising tools you use and how people can opt out.]</p>
      </section>
      <section><h2>Who we share it with</h2><p>Service providers that help us run the business, such as our website host, email delivery service and booking system, only as needed to provide their service. [Owner: list these providers.]</p></section>
      <section><h2>How long we keep it</h2><p>We keep enquiries only as long as needed to respond and for reasonable record-keeping. [Owner: state your retention period.]</p></section>
      <section><h2>Your choices</h2><p>You can ask us what information we hold about you, ask us to correct or delete it, or ask us to stop contacting you. Email <a href={mailHref} className="underline">{contact.email}</a>. Depending on where you live, you may have additional rights under local law ({legal.jurisdiction}).</p></section>
      <section><h2>Changes</h2><p>We may update this policy. The date at the top shows when it last changed. Questions about privacy at {business.name} can be sent to the contact details above.</p></section>
    </LegalLayout>
  );
}
