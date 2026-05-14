import { cn } from "@/shared/lib/utils"
import type { Slice } from "../model/types"

type SliceThumbProps = {
  slice: Slice
  highlighted?: boolean
}

export function SliceThumb({ slice, highlighted = false }: SliceThumbProps) {
  return (
    <a
      href={slice.src}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "relative block aspect-[4/3] w-full overflow-hidden rounded-xl border bg-slate-900 no-underline transition-shadow",
        highlighted
          ? "border-4 border-emerald-600 shadow-[0_0_0_2px_rgba(31,157,87,0.2)]"
          : "border-slate-200 hover:border-slate-300",
      )}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-slate-900/80 px-2 py-1 text-center text-xs font-semibold text-white">
        Срез {slice.number}
        {slice.piRads ? (
          <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/90">
            PI-RADS {slice.piRads}
          </span>
        ) : null}
      </span>
      <img
        src={slice.src}
        alt={`Срез ${slice.number}`}
        className="block h-full w-full bg-slate-900 object-contain"
        loading="lazy"
      />
    </a>
  )
}
