/** Имена файлов в `public/breast-segmentation/1/` и `…/2/` (одинаковый набор, порядок как в папке). */
const BREAST_STUDY_FRAME_FILES = [
  "breast2_enh_z000.png",
  "breast2_enh_z002.png",
  "breast2_enh_z005.png",
  "breast2_enh_z007.png",
  "breast2_enh_z048.png",
  "breast2_enh_z050.png",
  "breast2_enh_z053.png",
  "breast2_enh_z055.png",
  "breast2_enh_z058.png",
  "breast2_enh_z069.png",
  "breast2_enh_z072.png",
  "breast2_enh_z074.png",
  "breast2_lesion01_kinetics.png",
  "breast2_lesion02_kinetics.png",
  "breast2_lesion03_kinetics.png",
  "breast2_lesion04_kinetics.png",
  "breast2_lesion05_kinetics.png",
] as const

function frameLabel(file: string): string {
  const lesion = file.match(/lesion(\d+)/)
  if (lesion) {
    return `Очаг ${lesion[1]} (кинетика)`
  }
  const z = file.match(/_z(\d+)\.png$/)
  if (z) {
    return `z${z[1]}`
  }
  return file.replace(/\.png$/, "")
}

export const breastSegmentationOneImages = BREAST_STUDY_FRAME_FILES.map(
  (file) => `/breast-segmentation/1/${file}`,
)

export const breastSegmentationTwoImages = BREAST_STUDY_FRAME_FILES.map(
  (file) => `/breast-segmentation/2/${file}`,
)

export const breastSegmentationFrameLabels = BREAST_STUDY_FRAME_FILES.map(
  (file) => frameLabel(file),
)
