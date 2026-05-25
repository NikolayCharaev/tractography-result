import { useState } from "react"

import { Slider } from "@/shared/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"

import {
  breastSegmentationOneImages,
  breastSegmentationTwoImages,
} from "../model/images"

const tabs = [
  {
    id: "1",
    label: "Исследование 1",
    images: breastSegmentationOneImages,
    startSlice: 354,
  },
  {
    id: "2",
    label: "Исследование 2",
    images: breastSegmentationTwoImages,
    startSlice: 361,
  },
] as const

export function BreastSegmentation() {
  return (
    <section className="min-w-0">
      <Title>Сегментация молочной железы</Title>

      <Tabs defaultValue="1" className="mt-5 w-full gap-6">
        <TabsList variant="line" className="h-auto w-full flex-wrap justify-start gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-initial whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-2">
            <SegmentationViewer
              images={tab.images}
              startSlice={tab.startSlice}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

type SegmentationViewerProps = {
  images: string[]
  startSlice: number
}

function SegmentationViewer({ images, startSlice }: SegmentationViewerProps) {
  const [sliceIndex, setSliceIndex] = useState(0)
  const maxIndex = Math.max(images.length - 1, 0)
  const sliderValue = maxIndex - sliceIndex
  const currentSlice = startSlice + sliceIndex

  if (images.length === 0) {
    return null
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-slate-900 p-4 sm:p-5">
      <div className="flex min-h-0 items-stretch gap-4 sm:gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
            <span>
              Срез{" "}
              <span className="font-semibold text-white">{currentSlice}</span>
            </span>
            <span className="text-slate-400">
              {sliceIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex max-h-[min(65dvh,560px)] min-h-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950">
            <img
              src={images[sliceIndex]}
              alt={`Срез ${currentSlice}`}
              className="max-h-[min(65dvh,560px)] max-w-full object-contain"
            />
          </div>
        </div>

        <div className="flex h-[min(65dvh,560px)] w-10 shrink-0 items-center justify-center [&_[data-slot=slider]]:h-full [&_[data-slot=slider]]:w-8 [&_[data-slot=slider]]:flex-col [&_[data-slot=slider-range]]:w-full [&_[data-slot=slider-range]]:bg-slate-400 [&_[data-slot=slider-thumb]]:border-slate-300 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-track]]:h-full [&_[data-slot=slider-track]]:w-1.5 [&_[data-slot=slider-track]]:bg-slate-500">
          <Slider
            orientation="vertical"
            value={[sliderValue]}
            min={0}
            max={maxIndex}
            step={1}
            onValueChange={([value]) => setSliceIndex(maxIndex - value)}
            aria-label="Переключение срезов"
          />
        </div>
      </div>
    </div>
  )
}
