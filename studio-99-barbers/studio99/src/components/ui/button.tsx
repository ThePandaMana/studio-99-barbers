import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap font-sans font-semibold tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-45",
    size === "md" ? "min-h-11 px-5 text-[0.9rem]" : "min-h-14 px-7 text-base",
    variant === "primary" &&
      "bg-copper text-on-copper before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-ivory before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100",
    variant === "outline" && "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
    variant === "ghost" && "text-ivory hover:text-copper",
    className,
  );
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode; showArrow?: boolean };

/** Link styled as a button. Internal paths use next/link; http(s), tel: and mailto: render a plain anchor. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  showArrow,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const isExternal = /^https?:\/\//.test(href);
  const isProtocol = /^(tel|mailto|sms):/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (isExternal || isProtocol) {
    return (
      <a
        href={href}
        className={buttonClasses(variant, size, className)}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  showArrow,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden className="size-4" />}
    </button>
  );
}
