import { useEffect, useRef, useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Title } from "@/shared/ui/title"

import {
  type PulmonaryVeinMediaItem,
  pulmonaryVeinMedia,
} from "../model/media"

const cardMediaShell =
  "relative flex min-h-48 w-full min-w-0 flex-1 flex-col"

export function PulmonaryVeinSegmentationPage() {
  const [preview, setPreview] = useState<PulmonaryVeinMediaItem | null>(null)
  const dialogVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (preview?.kind !== "video") {
      return
    }
    const t = window.setTimeout(() => {
      void dialogVideoRef.current?.play().catch(() => {
        // автозапуск может блокироваться политикой браузера
      })
    }, 0)
    return () => window.clearTimeout(t)
  }, [preview])

  return (
    <section className="min-w-0">
      <Title>Визуализация вен лёгких</Title>

      <div className="mt-5 space-y-6">


        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          {pulmonaryVeinMedia.map((item) => (
            <Card
              key={item.src}
              className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden py-0"
            >
              <CardHeader className="shrink-0 border-b py-4">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col px-0 pb-0 pt-0">
                {item.kind === "image" ? (
                  <button
                    type="button"
                    onClick={() => setPreview(item)}
                    aria-label={`Открыть «${item.title}» в полноэкранном просмотре`}
                    className="group flex min-h-0 min-w-0 flex-1 cursor-zoom-in flex-col border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className={`${cardMediaShell} bg-muted/40`}>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full min-h-0 flex-1 object-contain transition-transform group-hover:scale-[1.02]"
                      />
                    </div>
                  </button>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Открыть «${item.title}» в полноэкранном просмотре`}
                    onClick={() => setPreview(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setPreview(item)
                      }
                    }}
                    className="group relative flex min-h-0 min-w-0 flex-1 cursor-pointer flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className={`${cardMediaShell} bg-black`}>
                      <video
                        src={item.src}
                        muted
                        playsInline
                        className="h-full w-full min-h-0 flex-1 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                        preload="metadata"
                      />
                    </div>
                    <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                      Нажмите для увеличения
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPreview(null)
          }
        }}
      >
        <DialogContent className="max-w-[min(100vw-1.5rem,72rem)] gap-3 sm:gap-4">
          {preview ? (
            <>
              <DialogHeader>
                <DialogTitle>{preview.title}</DialogTitle>
              </DialogHeader>
              <div className="min-w-0 rounded-lg border bg-muted/30 p-2 sm:p-3">
                {preview.kind === "image" ? (
                  <img
                    src={preview.src}
                    alt={preview.title}
                    className="mx-auto max-h-[min(78vh,820px)] w-full object-contain"
                  />
                ) : (
                  <video
                    key={preview.src}
                    ref={dialogVideoRef}
                    src={preview.src}
                    controls
                    playsInline
                    className="mx-auto max-h-[min(78vh,820px)] w-full bg-black object-contain"
                    preload="auto"
                  />
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
