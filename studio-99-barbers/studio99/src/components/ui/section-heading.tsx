import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading: large condensed title with an optional serif-italic aside and action. */
export function SectionHeading({
  title,
  aside,
  action,
  as: Tag = "h2",
  id,
  className,
}: {
  title: ReactNode;
  aside?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 border-t hairline pt-6 md:grid-cols-12 md:items-end", className)}>
      <Tag id={id} className={cn("display md:col-span-8", Tag === "h1" ? "display-lg" : "display-md")}>
        {title}
      </Tag>
      <div className="flex flex-col gap-5 md:col-span-4 md:items-end md:text-right">
        {aside && <p className="caption max-w-sm">{aside}</p>}
        {action}
      </div>
    </div>
  );
}
