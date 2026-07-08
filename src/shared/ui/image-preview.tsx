import { useState } from "react"
import { ZoomIn } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog"

type ImagePreviewProps = {
  src: string
  alt: string
  triggerClassName?: string
  imageClassName?: string
  overlay?: React.ReactNode
}

export function ImagePreview({
  src,
  alt,
  triggerClassName,
  imageClassName,
  overlay,
}: ImagePreviewProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full cursor-zoom-in overflow-hidden border-0 bg-slate-900 p-0 text-left",
          triggerClassName,
        )}
        aria-label={`Увеличить: ${alt}`}
      >
        {overlay}
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          loading="lazy"
        />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/35"
          aria-hidden
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-black/55 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-6 text-white" />
          </span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "fixed inset-0 top-0 left-0 z-50 flex h-dvh w-screen max-h-none max-w-none translate-none gap-0 rounded-none border-0 bg-black/95 p-0 shadow-none",
            "data-open:zoom-in-100 data-closed:zoom-out-100",
            "[&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/10",
          )}
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-contain p-4 pt-14"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
