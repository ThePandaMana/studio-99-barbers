"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { site } from "@/config/site";
import type { StyleRecommendation } from "@/types/site";
import { bookingHref, cn, getService } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { buttonClasses } from "@/components/ui/button";

type Answers = { length?: StyleRecommendation["length"]; fade?: StyleRecommendation["fade"]; finish?: StyleRecommendation["finish"]; maintenance?: StyleRecommendation["maintenance"] };
type Key = keyof Answers;

const questions: { key: Key; title: string; options: { value: string; label: string; hint: string }[] }[] = [
  { key: "length", title: "How much length do you want on top?", options: [
    { value: "short", label: "Short", hint: "Under 2 inches" },
    { value: "medium", label: "Medium", hint: "Enough to push or part" },
    { value: "long", label: "Long", hint: "Movement and flow" },
  ] },
  { key: "fade", title: "How high should the sides go?", options: [
    { value: "none", label: "No fade", hint: "Scissor or one length" },
    { value: "low", label: "Low", hint: "Just above the ear" },
    { value: "mid", label: "Mid", hint: "Around the temple" },
    { value: "high", label: "High", hint: "Maximum contrast" },
  ] },
  { key: "finish", title: "Clean or textured?", options: [
    { value: "clean", label: "Clean", hint: "Sharp, neat, defined" },
    { value: "textured", label: "Textured", hint: "Choppy, matte, lived-in" },
  ] },
  { key: "maintenance", title: "How often will you come back?", options: [
    { value: "high", label: "Every 2 weeks", hint: "I like it always fresh" },
    { value: "medium", label: "Every 3–4 weeks", hint: "Regular, not obsessive" },
    { value: "low", label: "Every 6+ weeks", hint: "Grows out gracefully" },
  ] },
];

const fadeOrder = ["none", "low", "mid", "high"];
const maintOrder = ["low", "medium", "high"];

function score(style: StyleRecommendation, a: Answers) {
  let s = 0;
  if (a.length === style.length) s += 3;
  if (a.fade) {
    const d = Math.abs(fadeOrder.indexOf(a.fade) - fadeOrder.indexOf(style.fade));
    s += d === 0 ? 3 : d === 1 ? 1 : 0;
  }
  if (a.finish === style.finish) s += 2;
  if (a.maintenance) {
    const d = Math.abs(maintOrder.indexOf(a.maintenance) - maintOrder.indexOf(style.maintenance));
    s += d === 0 ? 2 : d === 1 ? 1 : 0;
  }
  return s;
}

export function StyleFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const done = step >= questions.length;

  const focusHeading = () => window.requestAnimationFrame(() => headingRef.current?.focus());
  const choose = (key: Key, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
    focusHeading();
  };
  const restart = () => { setAnswers({}); setStep(0); focusHeading(); };

  const results = done
    ? [...site.styles].map((st) => ({ st, s: score(st, answers) })).sort((x, y) => y.s - x.s).slice(0, 3)
    : [];

  return (
    <div className="shell pb-24 lg:pb-36">
      <div className="mb-8 flex items-center gap-2" aria-hidden>
        {questions.map((q, i) => (
          <span key={q.key} className={cn("h-1 flex-1 transition-colors duration-500", i < step ? "bg-copper" : "bg-line")} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.fieldset
            key={questions[step].key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <legend className="w-full">
              <span className="text-sm text-mute">Question {step + 1} of {questions.length}</span>
              <h2 ref={headingRef} tabIndex={-1} className="display display-md mt-2 outline-none">{questions[step].title}</h2>
            </legend>
            <div className={cn("mt-10 grid gap-3", questions[step].options.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : questions[step].options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
              {questions[step].options.map((o) => {
                const picked = answers[questions[step].key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={picked}
                    onClick={() => choose(questions[step].key, o.value)}
                    className={cn("group flex min-h-36 flex-col justify-between border p-6 text-left transition-colors", picked ? "border-copper bg-copper/10" : "border-line hover:border-copper")}
                  >
                    <span className="display text-4xl group-hover:text-copper">{o.label}</span>
                    <span className="text-mute">{o.hint}</span>
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-mute hover:text-ivory">
                <ArrowLeft aria-hidden className="size-4" /> Previous question
              </button>
            )}
          </motion.fieldset>
        ) : (
          <motion.section key="results" aria-labelledby="results-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="results-title" ref={headingRef} tabIndex={-1} className="display display-md outline-none">Styles to ask about</h2>
              <button type="button" onClick={restart} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-copper link-draw">
                <RotateCcw aria-hidden className="size-4" /> Start again
              </button>
            </div>
            <ol className="mt-10 space-y-6">
              {results.map(({ st }, i) => {
                const svc = getService(st.serviceId);
                const imgs = st.galleryIds.map((id) => site.gallery.find((g) => g.id === id)).filter((g): g is NonNullable<typeof g> => Boolean(g));
                return (
                  <li key={st.id} className={cn("grid gap-6 border p-5 sm:p-6 lg:grid-cols-12", i === 0 ? "border-copper/60 bg-coal" : "border-line")}>
                    <div className="lg:col-span-6">
                      {i === 0 && <p className="mb-2 text-sm font-semibold text-copper">Closest match</p>}
                      <h3 className="display text-4xl">{st.name}</h3>
                      <p className="mt-3 max-w-md text-mute">{st.description}</p>
                      <p className="mt-3 text-sm">Upkeep: <span className="text-mute">{st.maintenance === "high" ? "every 2 weeks" : st.maintenance === "medium" ? "every 3–4 weeks" : "every 6 weeks or more"}</span></p>
                      {svc && (
                        <Link href={bookingHref({ services: [svc.id] })} className={buttonClasses("primary", "md", "mt-6")}>
                          <span>Book a {svc.name.toLowerCase()}</span>
                        </Link>
                      )}
                    </div>
                    <ul className="grid grid-cols-2 gap-2 lg:col-span-6">
                      {imgs.map((g) => (
                        <li key={g.id} className="relative aspect-[4/5] overflow-hidden bg-ink">
                          <SafeImage image={g.image} sizes="(min-width: 1024px) 22vw, 45vw" />
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 max-w-2xl text-sm text-mute">
              These are style ideas, not professional advice. Hair type, growth patterns and face shape all matter — your barber will tailor the cut during your consultation.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
