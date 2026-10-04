"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ImageLightbox({
  image,
  trigger,
}: {
  image: ImageRef;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        {trigger ?? (
          <button
            className="group relative w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--muted)] hover:border-[var(--accent)] transition-colors"
            aria-label={`Open ${image.alt}`}
          >
            <div className="relative aspect-video">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute top-2 right-2 size-7 grid place-items-center rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="size-3.5" />
              </div>
            </div>
            {image.caption && (
              <div className="p-3 text-xs text-[var(--muted-foreground)] text-left bg-[var(--card)]">
                {image.caption}
              </div>
            )}
          </button>
        )}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomed(false)}
        >
          <div
            className={cn(
              "relative max-w-6xl w-full max-h-[90vh] flex flex-col gap-3",
              zoomed && "cursor-zoom-out"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              {image.caption && (
                <DialogPrimitive.Title className="text-sm text-white/90 bg-black/60 px-3 py-1.5 rounded-md">
                  {image.caption}
                </DialogPrimitive.Title>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomed((z) => !z);
                  }}
                  className="size-9 grid place-items-center rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors"
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                >
                  <ZoomIn className="size-4" />
                </button>
                <DialogPrimitive.Close
                  className="size-9 grid place-items-center rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </DialogPrimitive.Close>
              </div>
            </div>

            <div
              className={cn(
                "relative flex-1 min-h-0 rounded-lg overflow-hidden bg-[var(--card)]",
                zoomed ? "overflow-auto" : "overflow-hidden"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  "relative w-full",
                  zoomed ? "h-auto" : "h-full"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={900}
                  className={cn(
                    "w-full h-auto",
                    zoomed && "cursor-zoom-out"
                  )}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}