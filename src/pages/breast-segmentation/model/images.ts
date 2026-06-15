export type BreastSegmentationStudy = {
  overlayImage: string
  kineticsImage?: string
  videoSrc?: string
}

export type BreastSegmentationBatch = {
  id: string
  label: string
  studies: BreastSegmentationStudy[]
}

const STUDY_COUNT = 10

// function flatOverlayStudy(batchFolder: string, studyId: number): BreastSegmentationStudy {
//   return {
//     overlayImage: `/breast-segmentation/${batchFolder}/${studyId}_overlay.png`,
//   }
// }

/** Кейсы 08.06, для которых есть {N}_kinetics.png */
const KINETICS_0806 = new Set([1, 2, 6, 7, 10])

function nestedOverlayStudy(
  batchFolder: string,
  studyId: number,
  videoFile: string,
): BreastSegmentationStudy {
  const subfolder = String(studyId)
  const base = `/breast-segmentation/${batchFolder}/${subfolder}`
  return {
    overlayImage: `${base}/${studyId}_overlay.png`,
    kineticsImage: KINETICS_0806.has(studyId)
      ? `${base}/${studyId}_kinetics.png`
      : undefined,
    videoSrc: `${base}/${encodeURIComponent(videoFile)}`,
  }
}

// function flatStudiesForFolder(folder: string): BreastSegmentationStudy[] {
//   return Array.from({ length: STUDY_COUNT }, (_, index) =>
//     flatOverlayStudy(folder, index + 1),
//   )
// }

/** Имена .mov в public/breast-segmentation/08.06/{N}/ */
const VIDEOS_0806: Record<number, string> = {
  1: "Запись экрана 2026-06-09 в 11.39.00.mov",
  2: "Запись экрана 2026-06-09 в 11.41.00.mov",
  3: "Запись экрана 2026-06-09 в 11.42.31.mov",
  4: "Запись экрана 2026-06-09 в 11.43.51.mov",
  5: "Запись экрана 2026-06-09 в 11.45.19.mov",
  6: "Запись экрана 2026-06-09 в 11.48.05.mov",
  7: "Запись экрана 2026-06-09 в 11.49.13.mov",
  8: "Запись экрана 2026-06-09 в 11.55.36.mov",
  9: "Запись экрана 2026-06-09 в 11.58.54.mov",
  10: "Запись экрана 2026-06-09 в 12.00.27.mov",
}

function nestedStudiesFor0806(): BreastSegmentationStudy[] {
  return Array.from({ length: STUDY_COUNT }, (_, index) => {
    const studyId = index + 1
    const videoFile = VIDEOS_0806[studyId]
    if (!videoFile) {
      const base = `/breast-segmentation/08.06/${studyId}`
      return {
        overlayImage: `${base}/${studyId}_overlay.png`,
        kineticsImage: KINETICS_0806.has(studyId)
          ? `${base}/${studyId}_kinetics.png`
          : undefined,
      }
    }
    return nestedOverlayStudy("15.06", studyId, videoFile)
  })
}

export const breastSegmentationBatches: BreastSegmentationBatch[] = [
  {
    id: "08-06",
    label: "Результаты (08.06)",
    studies: nestedStudiesFor0806(),
  },
  // {
  //   id: "05-06",
  //   label: "Результаты (05.06)",
  //   studies: flatStudiesForFolder("05.06"),
  // },
]
