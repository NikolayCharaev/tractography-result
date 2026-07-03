import { doctorTexts2606 } from "./doctor-texts-2606"

export type BreastSegmentationStudy = {
  overlayImage: string
  kineticsImage?: string
  videoSrc?: string
  doctorText?: string
}

export type BreastSegmentationBatch = {
  id: string
  label: string
  studies: BreastSegmentationStudy[]
}

const STUDY_COUNT = 10

/** Кейсы, для которых есть {N}_kinetics.png в 08.06 */
const KINETICS_0806 = new Set([1, 2, 6, 7, 10])

/** Кейсы, для которых есть {N}_kinetics.png в 26.06 */
const KINETICS_2606 = new Set([1, 3, 7, 8])

/** Имена видео в public/breast-segmentation/26.06/{N}/ */
const VIDEOS_2606: Record<number, string> = {
  1: "1_screen.mp4",
  2: "2_screen.mp4",
  3: "3_screen.mp4",
  4: "4_screen.mp4",
  5: "5_screen.mp4",
  6: "6_screen.mp4",
  7: "7_screen.mp4",
  8: "8_screen.mp4",
  9: "9_screen.mp4",
  10: "10_screen.mp4",
}

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

type NestedStudyOptions = {
  /** Папка с {N}_kinetics.png и .mov (по умолчанию — та же, что overlay) */
  mediaFolder?: string
  /** Кейсы с {N}_kinetics.png; если не задано — кинетика не показывается */
  kineticsStudyIds?: ReadonlySet<number>
  /** Имена .mov по номеру кейса; если не задано — плеер не показывается */
  videoFiles?: Readonly<Record<number, string>>
  /** Тексты заключений врача по номеру кейса */
  doctorTexts?: Readonly<Record<number, string>>
}

function nestedOverlayStudy(
  overlayFolder: string,
  studyId: number,
  options: NestedStudyOptions = {},
): BreastSegmentationStudy {
  const subfolder = String(studyId)
  const mediaFolder = options.mediaFolder ?? overlayFolder
  const overlayBase = `/breast-segmentation/${overlayFolder}/${subfolder}`
  const mediaBase = `/breast-segmentation/${mediaFolder}/${subfolder}`
  const videoFile = options.videoFiles?.[studyId]

  return {
    overlayImage: `${overlayBase}/${studyId}_overlay.png`,
    kineticsImage: options.kineticsStudyIds?.has(studyId)
      ? `${mediaBase}/${studyId}_kinetics.png`
      : undefined,
    videoSrc: videoFile
      ? `${mediaBase}/${encodeURIComponent(videoFile)}`
      : undefined,
    doctorText: options.doctorTexts?.[studyId],
  }
}

function nestedStudiesForFolder(
  overlayFolder: string,
  options: NestedStudyOptions = {},
): BreastSegmentationStudy[] {
  return Array.from({ length: STUDY_COUNT }, (_, index) =>
    nestedOverlayStudy(overlayFolder, index + 1, options),
  )
}

export const breastSegmentationBatches: BreastSegmentationBatch[] = [
  {
    id: "26-06",
    label: "Результаты (26.06) - с закл.врача",
    studies: nestedStudiesForFolder("26.06", {
      mediaFolder: "26.06",
      kineticsStudyIds: KINETICS_2606,
      videoFiles: VIDEOS_2606,
      doctorTexts: doctorTexts2606,
    }),
  },
  {
    id: "15-06",
    label: "Результаты (15.06) - без закл. врача",
    studies: nestedStudiesForFolder("15.06", {
      mediaFolder: "08.06",
      kineticsStudyIds: KINETICS_0806,
      videoFiles: VIDEOS_0806,
    }),
  },
  // {
  //   id: "08-06",
  //   label: "Результаты (08.06)",
  //   studies: nestedStudiesForFolder("08.06", {
  //     kineticsStudyIds: KINETICS_0806,
  //     videoFiles: VIDEOS_0806,
  //   }),
  // },
]
