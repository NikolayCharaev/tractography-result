const STUDY_1_FILES = [
  "breast2_enh_z050.png",
  "breast2_enh_z053.png",
  "breast2_enh_z055.png",
  "breast2_enh_z058.png",
] as const

const STUDY_3_FILES = ["case5_enh_z016.png"] as const
const STUDY_4_FILES = ["case7_enh_z072.png"] as const

function frameLabel(file: string): string {
  if (file.toLowerCase() === "readme.png") {
    return "README"
  }
  const lesion = file.match(/lesion(\d+)/i)
  if (lesion) {
    return `Очаг ${lesion[1]} (кинетика)`
  }
  const z = file.match(/_z(\d+)\.png$/i)
  if (z) {
    return `z${z[1]}`
  }
  return file.replace(/\.png$/i, "")
}

function studyImages(
  folder: string,
  files: readonly string[],
): { images: string[]; frameLabels: string[] } {
  const images = files.map((file) => `/breast-segmentation/${folder}/${file}`)
  const frameLabels = files.map((file) => frameLabel(file))
  return { images, frameLabels }
}

export const breastSegmentationStudy1 = studyImages("1", STUDY_1_FILES)

export const breastSegmentationStudy3 = studyImages("3", STUDY_3_FILES)
export const breastSegmentationStudy4 = studyImages("4", STUDY_4_FILES)
