"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Info, Loader2, Mail } from "lucide-react";
import { site } from "@/config/site";
import { contactSchema, inquiryTypes, type ContactInput } from "@/lib/contact-schema";
import { cn, mailHref, telHref } from "@/lib/utils";
import { Button, buttonClasses } from "@/components/ui/button";

type Status = { kind: "idle" } | { kind: "success"; email: string } | { kind: "demo"; mailto: string } | { kind: "error"; message: string };

const fieldBase = "mt-2 w-full border bg-ink px-4 py-3 text-ivory placeholder:text-mute/60 transition-colors focus:border-copper focus:outline-none";

export function ContactForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", inquiry: "booking", message: "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ kind: "idle" });
    const topic = inquiryTypes.find((i) => i.value === values.inquiry)?.label ?? "Enquiry";
    const mailto = `${mailHref}?subject=${encodeURIComponent(`${topic} — ${values.name}`)}&body=${encodeURIComponent(values.message)}`;
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; mode?: string; error?: string };
      if (res.ok && data.ok) {
        setStatus({ kind: "success", email: values.email });
        reset();
      } else if (data.mode === "demo") {
        setStatus({ kind: "demo", mailto });
      } else {
        setStatus({ kind: "error", message: data.error ?? "Your message wasn't sent." });
      }
    } catch {
      setStatus({ kind: "error", message: "Your message wasn't sent because the connection failed." });
    }
  };

  if (status.kind === "success") {
    return (
      <div role="status" className="border border-copper/60 bg-coal p-8">
        <CheckCircle2 aria-hidden className="size-8 text-copper" />
        <p className="display mt-4 text-4xl">Message sent</p>
        <p className="mt-2 text-mute">Thanks — we&apos;ll reply to {status.email}, usually within one working day.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-6 font-semibold text-copper link-draw">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6" aria-describedby={!deliveryEnabled ? "form-demo-note" : undefined}>
      {!deliveryEnabled && (
        <div id="form-demo-note" className="flex gap-3 border border-dashed border-silver/40 bg-coal p-4 text-sm">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-copper" />
          <p className="text-mute">
            <span className="font-semibold text-ivory">Demo mode:</span> this form checks your details but email delivery isn&apos;t connected yet, so messages aren&apos;t sent.
            You&apos;ll get a one-tap email fallback instead, or reach us directly at <a href={mailHref} className="text-ivory underline">{site.contact.email}</a>.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium">Name</label>
          <input id="cf-name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={cn(fieldBase, errors.name ? "border-copper" : "border-line")} />
          {errors.name && <p id="cf-name-err" role="alert" className="mt-1.5 text-sm text-copper">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium">Email</label>
          <input id="cf-email" type="email" autoComplete="email" inputMode="email" {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={cn(fieldBase, errors.email ? "border-copper" : "border-line")} />
          {errors.email && <p id="cf-email-err" role="alert" className="mt-1.5 text-sm text-copper">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-inquiry" className="text-sm font-medium">What&apos;s it about?</label>
        <select id="cf-inquiry" {...register("inquiry")} aria-invalid={!!errors.inquiry} className={cn(fieldBase, "appearance-none", errors.inquiry ? "border-copper" : "border-line")}>
          {inquiryTypes.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
        </select>
        {errors.inquiry && <p role="alert" className="mt-1.5 text-sm text-copper">{errors.inquiry.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-medium">Message</label>
        <textarea id="cf-message" rows={6} {...register("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={cn(fieldBase, "resize-y", errors.message ? "border-copper" : "border-line")} />
        {errors.message && <p id="cf-message-err" role="alert" className="mt-1.5 text-sm text-copper">{errors.message.message}</p>}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status.kind === "demo" && (
        <div role="status" className="border border-silver/40 bg-coal p-5">
          <p className="font-semibold">Your message wasn&apos;t sent — online delivery isn&apos;t connected yet.</p>
          <p className="mt-1 text-sm text-mute">Open it in your email app instead, or call {site.contact.phoneDisplay}.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={status.mailto} className={buttonClasses("primary", "md")}><Mail aria-hidden className="size-4" /><span>Send by email</span></a>
            <a href={telHref} className={buttonClasses("outline", "md")}>Call the shop</a>
          </div>
        </div>
      )}
      {status.kind === "error" && (
        <div role="alert" className="flex gap-3 border border-copper/60 bg-coal p-5">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-copper" />
          <p className="text-sm">{status.message} Try again, or email <a href={mailHref} className="underline">{site.contact.email}</a>.</p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <span className="inline-flex items-center gap-2"><Loader2 aria-hidden className="size-4 animate-spin" />Sending…</span> : "Send message"}
      </Button>
    </form>
  );
}
