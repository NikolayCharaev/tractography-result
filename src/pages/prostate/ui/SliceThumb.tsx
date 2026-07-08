import { cn } from "@/shared/lib/utils"
import { ImagePreview } from "@/shared/ui/image-preview"
import type { Slice } from "../model/types"

type SliceThumbProps = {
  slice: Slice
  highlighted?: boolean
}

export function SliceThumb({ slice, highlighted = false }: SliceThumbProps) {
  return (
    <ImagePreview
      src={slice.src}
      alt={`Срез ${slice.number}`}
      triggerClassName={cn(
        "aspect-[4/3] w-full rounded-xl border transition-shadow",
        highlighted
          ? "border-4 border-emerald-600 shadow-[0_0_0_2px_rgba(31,157,87,0.2)]"
          : "border-slate-200 hover:border-slate-300",
      )}
      imageClassName="block h-full w-full bg-slate-900 object-contain"
      overlay={
        <span className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-slate-900/80 px-2 py-1 text-center text-xs font-semibold text-white">
          Срез {slice.number}
          {slice.piRads ? (
            <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/90">
              PI-RADS {slice.piRads}
            </span>
          ) : null}
        </span>
      }
    />
  )
}
