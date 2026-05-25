import { ImageSlider } from "@/shared/ui/image-slider";
import { foreignBodiesHipImages } from "../model/images";
import { Title } from "@/shared/ui/title";

export function ForeignBodiesHip() {
    return (
        <section className="min-w-0">
            <Title>Детекция осколков в тазовой области</Title>

            <div className="mt-5 min-w-0">
                <div className="min-w-0 overflow-hidden rounded-xl border p-4 sm:p-6">
                    <ImageSlider images={foreignBodiesHipImages} />
                </div>
            </div>
        </section>
    )
}