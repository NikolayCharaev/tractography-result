import { ImageSlider } from "@/shared/ui/image-slider"
import { Title } from "@/shared/ui/title"

import { foreignBodiesImages } from "../model/images"

export function ForeignBodies() {
  return (
    <section className="min-w-0">
      <Title>Детекция осколков в грудной клетке</Title>

      <div className="mt-5 min-w-0">
        <div className="min-w-0 overflow-hidden rounded-xl border p-4 sm:p-6">
          <ImageSlider images={foreignBodiesImages} />
        </div>
      </div>
    </section>
  )
}
