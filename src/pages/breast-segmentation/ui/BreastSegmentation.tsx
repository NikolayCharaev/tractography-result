import { ImageMagnifier } from "@/shared/ui/image-magnifier"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"

import {
  breastSegmentationBatches,
  type BreastSegmentationStudy,
} from "../model/images"
import { Button } from "@/shared/ui/button"
import { Info } from "lucide-react"
import { HoverCardContent, HoverCardTrigger, HoverCard } from "@/shared/ui/hover-card"

const DEFAULT_BATCH_ID = breastSegmentationBatches[0]?.id ?? ""

export function BreastSegmentation() {
  return (
    <section className="min-w-0">
      <Title>Выявленные очаги в молочной железе</Title>

      <Tabs defaultValue={DEFAULT_BATCH_ID} className="mt-5 w-full gap-6">
        <div className="flex items-center justify-between">
          <TabsList
            variant="line"
            className="h-auto w-full flex-wrap justify-start gap-1 max-sm:mb-25"
          >
            {breastSegmentationBatches.map((batch) => (
              <TabsTrigger
                key={batch.id}
                value={batch.id}
                className="flex-initial whitespace-nowrap"
              >
                {batch.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="">
            <HoverCard openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button variant="outline">
                  <Info />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                side="bottom"
                className="w-[min(100vw-2rem,28rem)] space-y-3 text-sm leading-relaxed"
              >
                <p className="font-medium text-foreground">
                  Кинетические кривые DCE
                </p>

                <p className="text-muted-foreground">
                  Строятся только при полной динамике контрастного усиления —
                  минимум двух временных точек: преконтраст и одна или
                  несколько постконтрастных фаз.
                </p>

                <div className="space-y-1.5">
                  <p className="font-medium text-foreground">
                    Без кинетики — кейсы 3, 4, 5, 8, 9
                  </p>
                  <p className="text-muted-foreground">
                    В выгруженных DICOM только одна подходящая 3D-серия на
                    исследование, без отдельных фаз по времени. Кривую «сигнал во
                    времени» рассчитать нельзя — это ограничение состава
                    выгрузки, а не ошибка алгоритма. Сегментация очагов
                    выполняется по одной доступной фазе.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-medium text-foreground">
                    С кинетикой — кейсы 1, 2, 6, 7, 10
                  </p>
                  <p className="text-muted-foreground">
                    В DICOM есть несколько фаз одной динамики — кинетика
                    рассчитана.
                  </p>
                </div>

                <p className="border-t pt-3 text-muted-foreground">
                  Чтобы получить кривые для остальных случаев, нужна повторная
                  выгрузка с PACS всех фаз DCE: преконтраст и все
                  постконтрастные 3D-серии с одинаковой геометрией.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>


        {breastSegmentationBatches.map((batch) => (
          <TabsContent key={batch.id} value={batch.id} className="mt-2">
            <BatchStudies batch={batch} />
          </TabsContent>
        ))}
      </Tabs>




    </section>
  )
}

function BatchStudies({
  batch,
}: {
  batch: (typeof breastSegmentationBatches)[number]
}) {
  const studyTabs = batch.studies.map((study, index) => ({
    id: String(index + 1),
    label: `Исследование ${index + 1}`,
    study,
  }))

  return (
    <Tabs defaultValue="1" className="w-full gap-4">
      <TabsList
        variant="line"
        className="h-auto w-full flex-wrap justify-start gap-1"
      >
        {studyTabs.map((tab) => (
          <TabsTrigger
            key={`${batch.id}-${tab.id}`}
            value={tab.id}
            className="flex-initial whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {studyTabs.map((tab) => (
        <TabsContent key={`${batch.id}-${tab.id}`} value={tab.id} className="mt-6">
          <SegmentationViewer
            key={`${batch.id}-${tab.id}`}
            study={tab.study}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function SegmentationViewer({ study }: { study: BreastSegmentationStudy }) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="min-w-0 overflow-hidden rounded-xl border bg-slate-900 p-4 sm:p-5">
        <div className="mb-3 text-sm text-slate-300">
          Кадр: <span className="font-semibold text-white">Очаги</span>
        </div>
        <div className="flex max-h-[min(65dvh,560px)] min-h-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950">
          <ImageMagnifier src={study.overlayImage} alt="Очаги" />
        </div>
      </div>

      {study.kineticsImage ? (
        <div className="min-w-0 overflow-hidden rounded-xl border bg-slate-900 p-4 sm:p-5">
          <div className="mb-3 text-sm text-slate-300">
            <span className="font-semibold text-white">Кинетические кривые</span>
          </div>
          <div className="flex max-h-[min(65dvh,560px)] min-h-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950">
            <ImageMagnifier
              src={study.kineticsImage}
              alt="Кинетические кривые"
            />
          </div>
        </div>
      ) : null}

      {study.videoSrc ? (
        <div className="min-w-0 overflow-hidden rounded-xl border bg-slate-900 p-4 sm:p-5">
          <div className="mb-3 text-sm text-slate-300">
            <span className="font-semibold text-white">Запись экрана</span>
          </div>
          <video
            key={study.videoSrc}
            src={study.videoSrc}
            controls
            playsInline
            preload="metadata"
            className="mx-auto max-h-[min(65dvh,560px)] w-full rounded-lg bg-black object-contain"
          />
        </div>
      ) : null}
    </div>
  )
}
