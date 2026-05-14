import type { Study, StudyImages } from "../model/types"
import { ModelConclusionPanel } from "./ModelConclusionPanel"
import { SliceThumb } from "./SliceThumb"

type StudyCardProps = {
  study: Study
  modelPanelTitle: string
  doctorPanelTitle: string
}

export function StudyCard({
  study,
  modelPanelTitle,
  doctorPanelTitle,
}: StudyCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Исследование {study.id}
        </h3>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title={modelPanelTitle}>
          <ModelConclusionPanel conclusion={study.modelConclusion} />
        </Panel>

        <Panel title={doctorPanelTitle}>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
            {study.doctorText}
          </p>
        </Panel>
      </div>

      {study.images.kind !== "none" ? (
        <div className="mt-4">
          <Panel title="Изображения срезов">
            <ImagesContent images={study.images} />
          </Panel>
        </div>
      ) : null}
    </article>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <h4 className="mb-2 text-base font-semibold text-slate-900">{title}</h4>
      {children}
    </section>
  )
}

function ImagesContent({ images }: { images: StudyImages }) {
  if (images.kind === "grid") {
    return (
      <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {images.slices.map((slice) => (
          <SliceThumb
            key={slice.src}
            slice={slice}
            highlighted={slice.number === images.highlightedSliceNumber}
          />
        ))}
      </div>
    )
  }

  if (images.kind === "empty") {
    return <p className="text-sm italic text-slate-500">{images.message}</p>
  }

  return null
}
