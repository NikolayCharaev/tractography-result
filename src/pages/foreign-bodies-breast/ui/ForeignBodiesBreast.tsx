import { ImageSlider } from "@/shared/ui/image-slider"
import { Title } from "@/shared/ui/title"

import { foreignBodiesBreastImages } from "../model/images"

export function ForeignBodiesBreast() {
  return (
    <section className="min-w-0">
      <Title>Детекция осколков в грудной клетке</Title>

      <div className="mt-5 min-w-0">
        <div className="min-w-0 overflow-hidden rounded-xl border p-4 sm:p-6">
          <ImageSlider images={foreignBodiesBreastImages} />
        </div>
      </div>
    </section>
  )
}
