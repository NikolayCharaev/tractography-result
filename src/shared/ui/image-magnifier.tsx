import { useCallback, useRef, useState } from "react"

import { cn } from "@/shared/lib/utils"

type ImageMagnifierProps = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  zoom?: number
  lensSize?: number
}

type LensPosition = {
  x: number
  y: number
  imageWidth: number
  imageHeight: number
}

export function ImageMagnifier({
  src,
  alt,
  className,
  imageClassName,
  zoom = 2.5,
  lensSize = 180,
}: ImageMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lens, setLens] = useState<LensPosition | null>(null)

  const updateLens = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const img = container.querySelector("img")
    if (!img) {
      return
    }

    const rect = img.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setLens(null)
      return
    }

    setLens({
      x,
      y,
      imageWidth: rect.width,
      imageHeight: rect.height,
    })
  }, [])

  const halfLens = lensSize / 2

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseMove={(event) => updateLens(event.clientX, event.clientY)}
      onMouseLeave={() => setLens(null)}
    >
      <div className="relative inline-block max-w-full">
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={cn(
            "max-h-[min(65dvh,560px)] max-w-full select-none object-contain",
            imageClassName,
          )}
        />

        {lens ? (
          <div
            className="pointer-events-none absolute overflow-hidden rounded-full border-2 border-white/80 shadow-lg ring-1 ring-black/20"
            style={{
              width: lensSize,
              height: lensSize,
              left: lens.x - halfLens,
              top: lens.y - halfLens,
            }}
            aria-hidden
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="absolute max-w-none select-none"
              style={{
                width: lens.imageWidth * zoom,
                height: lens.imageHeight * zoom,
                left: halfLens - lens.x * zoom,
                top: halfLens - lens.y * zoom,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
