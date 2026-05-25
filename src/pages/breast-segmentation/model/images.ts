const STUDY_ONE_START_SLICE = 354
const STUDY_TWO_START_SLICE = 361

export const breastSegmentationOneImages = Array.from(
  { length: 75 },
  (_, index) =>
    `/breast-segmentation/1/14955_slice_${STUDY_ONE_START_SLICE + index}.png`,
)

export const breastSegmentationTwoImages = Array.from(
  { length: 65 },
  (_, index) =>
    `/breast-segmentation/2/88146_slice_${STUDY_TWO_START_SLICE + index}.png`,
)
