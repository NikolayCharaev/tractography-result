import { ImageSlider } from "@/shared/ui/image-slider";
import { Title } from "@/shared/ui/title";
import { heartSegmentationImages } from "../model/images";

export function HeartSegmentation() {
    return (
        <section className="min-w-0">
            <Title>Сегментация сердца</Title>

            <div className="mt-5 min-w-0">
                <div className="min-w-0 overflow-hidden rounded-xl border p-4 sm:p-6">
                    <ImageSlider images={heartSegmentationImages} />
                </div>
            </div>
        </section>
    )
}