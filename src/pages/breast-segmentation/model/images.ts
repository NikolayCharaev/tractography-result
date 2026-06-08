export type BreastSegmentationStudy = {
  images: string[];
  frameLabels: string[];
};

export type BreastSegmentationBatch = {
  /** значение для Radix Tabs (без точки) */
  id: string;
  /** подпись таба, например «05.06» */
  label: string;
  studies: BreastSegmentationStudy[];
};

const STUDY_COUNT = 10;

function overlayStudy(folder: string, studyId: number): BreastSegmentationStudy {
  const file = `${studyId}_overlay.png`;
  return {
    images: [`/breast-segmentation/${folder}/${file}`],
    frameLabels: ['Очаги'],
  };
}

function studiesForFolder(folder: string): BreastSegmentationStudy[] {
  return Array.from({ length: STUDY_COUNT }, (_, index) => overlayStudy(folder, index + 1));
}

export const breastSegmentationBatches: BreastSegmentationBatch[] = [
  {
    id: '08-06',
    label: 'Результаты (08.06)',
    studies: studiesForFolder('08.06'),
  },
  {
    id: '05-06',
    label: 'Результаты (05.06)',
    studies: studiesForFolder('05.06'),
  },
];
