import { Title } from "@/shared/ui/title";

export function PulmonaryVeinSegmentationPage() {
  return (
    <section>
      <Title>Сегментация вен лёгких</Title>

      <div className="mt-5">
        <div className="p-6 border rounded-xl">
          <img src="pulmonary-vein-segmentation/vein.png" className="rounded-xl" />
        </div>
      </div>
    </section>
  )
}