import { useEffect, useRef } from "react"
import type { Swiper as SwiperInstance } from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { cn } from "@/shared/lib/utils"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export type ImageSliderItem = string | { src: string; alt?: string }

type ImageSliderProps = {
  images: ImageSliderItem[]
  className?: string
}

function normalizeImage(item: ImageSliderItem, index: number) {
  if (typeof item === "string") {
    return { src: item, alt: `Изображение ${index + 1}` }
  }

  return {
    src: item.src,
    alt: item.alt ?? `Изображение ${index + 1}`,
  }
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperInstance | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      swiperRef.current?.update()
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  if (images.length === 0) {
    return null
  }

  const slides = images.map(normalizeImage)

  return (
    <div
      ref={containerRef}
      className={cn(
        "image-slider relative isolate w-full min-w-0 max-w-full overflow-x-clip rounded-lg bg-slate-900",
        "[&_.swiper]:!w-full [&_.swiper]:max-w-full [&_.swiper]:overflow-hidden",
        "[&_.swiper-wrapper]:max-w-full",
        "[&_.swiper-slide]:!w-full [&_.swiper-slide]:max-w-full",
        "[&_.swiper-slide]:flex [&_.swiper-slide]:h-auto [&_.swiper-slide]:min-w-0 [&_.swiper-slide]:items-center [&_.swiper-slide]:justify-center",
        "[&_.swiper-button-next]:right-2 [&_.swiper-button-next]:size-8 sm:[&_.swiper-button-next]:right-3 sm:[&_.swiper-button-next]:size-9",
        
        "[&_.swiper-button-prev]:left-2 [&_.swiper-button-prev]:size-8 sm:[&_.swiper-button-prev]:left-3 sm:[&_.swiper-button-prev]:size-9",
       
        "[&_.swiper-button-disabled]:opacity-40",
        "[&_.swiper-pagination]:bottom-2!",
        "[&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet-active]:bg-white",
        className,
      )}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        observer
        observeParents
        resizeObserver
        spaceBetween={0}
        slidesPerView={1}
        className="w-full max-w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={`${image.src}-${index}`}>
            <div className="relative aspect-4/3 w-full max-w-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 m-auto h-full w-full max-w-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
