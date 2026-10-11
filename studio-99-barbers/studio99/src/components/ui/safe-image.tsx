"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/site";

type Props = Omit<ImageProps, "src" | "alt"> & { image: ImageAsset; imgClassName?: string };

/**
 * next/image with a graceful fallback: if a remote photo ever disappears,
 * a branded panel with the description replaces it instead of a broken icon.
 * Always used with `fill` inside a sized parent to prevent layout shift.
 */
export function SafeImage({ image, className, imgClassName, sizes = "100vw", ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={image.alt} className={cn("absolute inset-0 flex flex-col items-center justify-center gap-3 bg-coal p-6 text-center", className)}>
        <ImageOff aria-hidden className="size-5 text-mute" />
        <span className="caption text-sm">{image.alt}</span>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      className={cn("object-cover", imgClassName, className)}
      style={image.position ? { objectPosition: image.position } : undefined}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
