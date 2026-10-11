import { site } from "@/config/site";
import type { Service } from "@/types/site";

export type Estimate = {
  items: Service[];
  total: number;
  durationMinutes: number;
  hasVariablePrice: boolean;
  warnings: string[];
};

/** Keeps only ids that exist in config, without duplicates, in menu order. */
export function sanitizeServiceIds(ids: readonly string[]) {
  const wanted = new Set(ids);
  return site.services.filter((s) => wanted.has(s.id)).map((s) => s.id);
}

/**
 * Totals a selection and flags combinations that probably aren't what the client wants.
 * This is an estimate only — the shop confirms the final price.
 */
export function computeEstimate(ids: readonly string[]): Estimate {
  const items = sanitizeServiceIds(ids).map((id) => site.services.find((s) => s.id === id)!);
  const warnings: string[] = [];

  const packages = items.filter((s) => s.category === "packages");
  const haircuts = items.filter((s) => s.category === "haircuts");

  for (const pkg of packages) {
    const overlaps = items.filter((s) => s.id !== pkg.id && pkg.includes?.includes(s.id));
    if (overlaps.length) {
      warnings.push(`${pkg.name} already includes ${overlaps.map((s) => s.name.toLowerCase()).join(" and ")}.`);
    }
  }
  if (packages.length > 1) warnings.push("You've picked more than one package — most visits need just one.");
  if (haircuts.length > 1) warnings.push("You've picked more than one haircut — most visits need just one.");
  if (packages.length && haircuts.length && !warnings.some((w) => w.includes("already includes"))) {
    warnings.push("Packages include a haircut, so you may not need a separate one.");
  }

  return {
    items,
    total: items.reduce((sum, s) => sum + s.price, 0),
    durationMinutes: items.reduce((sum, s) => sum + s.durationMinutes, 0),
    hasVariablePrice: items.some((s) => s.priceFrom),
    warnings,
  };
}
