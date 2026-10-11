import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { contactSchema, inquiryTypes } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 * - With RESEND_API_KEY set, the message is emailed through Resend (https://resend.com).
 * - Without it, responds { ok: false, mode: "demo" } so the form can say honestly that nothing was sent.
 * Secrets stay server-side; nothing here is exposed to the browser.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Some fields need attention.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot tripped: pretend success to the bot, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 200 with mode "demo": the request worked, delivery simply isn't set up. The UI says so plainly.
    return NextResponse.json({ ok: false, mode: "demo", error: "Email delivery is not configured." });
  }

  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Website <onboarding@resend.dev>`;
  const topic = inquiryTypes.find((i) => i.value === data.inquiry)?.label ?? data.inquiry;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[${site.business.name}] ${topic} from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${topic}\n\n${data.message}`,
      }),
    });
    if (!res.ok) {
      console.error("Contact form: email provider returned", res.status);
      return NextResponse.json({ ok: false, error: "We couldn't send your message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: email provider unreachable", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your message." }, { status: 502 });
  }
}
