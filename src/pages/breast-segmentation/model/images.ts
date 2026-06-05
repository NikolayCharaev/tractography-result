export type BreastSegmentationStudy = {
  images: string[]
  frameLabels: string[]
}

function overlayStudy(id: number): BreastSegmentationStudy {
  const file = `${id}_overlay.png`
  return {
    images: [`/breast-segmentation/${file}`],
    frameLabels: ["Очаги"],
  }
}

export const breastSegmentationStudies: BreastSegmentationStudy[] = Array.from(
  { length: 10 },
  (_, index) => overlayStudy(index + 1),
)
