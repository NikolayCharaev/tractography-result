import { NO_DWI_DATA_DESCRIPTION, ONLY_AXIAL_DESCRIPTION, doctorTexts } from './doctor-texts';
import type {
  EmptyConclusion,
  LegacyConclusion,
  Report,
  SignificantConclusion,
  Slice,
  Study,
  StudyImages,
} from './types';

type SliceTuple = [number, number];
type LegacySliceTuple = [number, number] | [number, number, 'overview'];

function makeSlices(basePath: string, items: SliceTuple[]): Slice[] {
  return items.map(([number, piRads]) => ({
    number,
    piRads,
    src: `${basePath}/slice_${String(number).padStart(3, '0')}_pirads_${piRads}.png`,
  }));
}

function makeLegacySlices(studyId: number, items: LegacySliceTuple[]): Slice[] {
  const base = `/prostate/legacy/${studyId}/analysis/visualizations`;
  return items.map((item) => {
    const [number, score] = item;
    const overview = item[2] === 'overview';
    const src = `${base}/slice_${String(number).padStart(4, '0')}_score${score}${overview ? '_overview' : ''}.png`;
    return { number, piRads: score, src };
  });
}

function significant(
  zone: SignificantConclusion['zone'],
  sizeMm: string,
  piRads: number,
  significantSlice: number,
): SignificantConclusion {
  return { kind: 'significant', zone, sizeMm, piRads, significantSlice };
}

function emptyConclusion(description: string): EmptyConclusion {
  return { kind: 'empty', description };
}

function legacyConclusion(
  status: LegacyConclusion['status'],
  piRadsModel: number | null,
  note: string,
): LegacyConclusion {
  return { kind: 'legacy', status, piRadsModel, note };
}

function gridImages(slices: Slice[], highlightedSliceNumber?: number): StudyImages {
  return { kind: 'grid', slices, highlightedSliceNumber };
}

function emptyImages(message: string): StudyImages {
  return { kind: 'empty', message };
}

function makeStudy(
  id: number,
  modelConclusion: Study['modelConclusion'],
  images: StudyImages,
): Study {
  return {
    id,
    modelConclusion,
    doctorText: doctorTexts[id] ?? '',
    images,
  };
}

const SHEET_2104_2404 =
  'https://docs.google.com/spreadsheets/d/1CL16yAMxBcB2Kb9KaqWRBMotKqoczuifgXKr7r_xefA/edit?gid=507962925#gid=507962925';
const SHEET_1704 =
  'https://docs.google.com/spreadsheets/d/12h6SVu2cg3lIbACR4ouSHxan904-8WqPLUnFCAFOryE/edit?gid=507962925#gid=507962925';
const SHEET_1404_LEGACY =
  'https://docs.google.com/spreadsheets/d/1ZMEg2w47qzcs-vcBEUy-L7snb071JzXLdHHTgq86uy4/edit?gid=507962925#gid=507962925';

const report2205: Report = {
  id: '22-05',
  label: 'Результаты (22.05) - вкл. кинетические кривые',
  studies: [
    makeStudy(
      1,
      significant('PZ', '28 x 20 mm', 4, 10),
      gridImages(
        makeSlices('/prostate/22.05/1', [
          [9, 4],
          [10, 4],
          [11, 3],
          [12, 4],
          [13, 4],
          [15, 4],
          [16, 4],
          [18, 4],
          [19, 4],
          [22, 4],
          [23, 4],
        ]),
        10,
      ),
    ),
    makeStudy(
      2,
      significant('TZ', '27 x 13 mm', 4, 36),
      gridImages(
        makeSlices('/prostate/22.05/2', [
          [13, 3],
          [17, 3],
          [20, 3],
          [21, 3],
          [23, 3],
          [29, 4],
          [31, 4],
          [36, 4],
          [38, 4],
          [40, 4],
          [41, 4],
          [43, 4],
          [44, 4],
        ]),
        36,
      ),
    ),
    makeStudy(
      3,
      significant('TZ', '29 x 13 mm', 4, 52),
      gridImages(
        makeSlices('/prostate/22.05/3', [
          [41, 4],
          [43, 3],
          [49, 3],
          [52, 4],
          [53, 4],
        ]),
        52,
      ),
    ),
    makeStudy(
      4,
      significant('TZ', '16 x 10 mm', 4, 12),
      gridImages(
        makeSlices('/prostate/22.05/4', [
          [8, 3],
          [9, 3],
          [11, 3],
          [12, 4],
          [13, 3],
          [14, 4],
          [16, 3],
          [19, 4],
        ]),
        12,
      ),
    ),
    makeStudy(
      5,
      significant('PZ', '28 x 20 mm', 4, 13),
      gridImages(
        makeSlices('/prostate/22.05/5', [
          [11, 4],
          [13, 4],
          [16, 4],
          [17, 3],
          [18, 4],
        ]),
        13,
      ),
    ),
    makeStudy(
      6,
      significant('TZ', '30 x 29 mm', 4, 8),
      gridImages(
        makeSlices('/prostate/22.05/6', [
          [7, 4],
          [8, 4],
          [10, 4],
          [13, 4],
          [14, 4],
          [15, 4],
          [16, 4],
          [17, 4],
          [18, 4],
          [19, 4],
          [20, 4],
        ]),
        8,
      ),
    ),
    makeStudy(
      7,
      significant('TZ', '32 x 16 mm', 4, 11),
      gridImages(
        makeSlices('/prostate/22.05/7', [
          [6, 4],
          [11, 4],
          [12, 4],
          [15, 4],
        ]),
        11,
      ),
    ),
    makeStudy(8, emptyConclusion(NO_DWI_DATA_DESCRIPTION), { kind: 'none' }),
    makeStudy(
      9,
      significant('TZ', '31 x 18 mm', 4, 9),
      gridImages(
        makeSlices('/prostate/22.05/9', [
          [6, 3],
          [7, 4],
          [9, 4],
          [14, 4],
          [15, 4],
          [16, 4],
          [18, 4],
        ]),
        9,
      ),
    ),
    makeStudy(10, emptyConclusion(ONLY_AXIAL_DESCRIPTION), { kind: 'none' }),
  ],
};

const report2904: Report = {
  id: '29-04',
  label: 'Результаты (29.04)',
  studies: [
    makeStudy(
      1,
      significant('PZ', '28 x 20 mm', 4, 10),
      gridImages(
        makeSlices('/prostate/29.04/1', [
          [9, 4],
          [10, 4],
          [11, 3],
          [12, 4],
          [13, 4],
          [15, 4],
          [16, 4],
          [18, 4],
          [19, 4],
          [22, 4],
          [23, 4],
        ]),
        10,
      ),
    ),
    makeStudy(
      2,
      significant('TZ', '30 x 27 mm', 4, 38),
      gridImages(
        makeSlices('/prostate/29.04/2', [
          [8, 4],
          [9, 3],
          [13, 3],
          [17, 3],
          [20, 3],
          [23, 3],
          [29, 3],
          [36, 4],
          [38, 4],
          [41, 4],
          [43, 4],
          [44, 4],
        ]),
        38,
      ),
    ),
    makeStudy(
      3,
      significant('TZ', '25 x 14 mm', 4, 53),
      gridImages(
        makeSlices('/prostate/29.04/3', [
          [42, 3],
          [43, 3],
          [44, 3],
          [49, 3],
          [53, 4],
        ]),
        53,
      ),
    ),
    makeStudy(
      4,
      significant('PZ', '19 x 14 mm', 4, 8),
      gridImages(
        makeSlices('/prostate/29.04/4', [
          [8, 4],
          [11, 3],
          [13, 3],
          [14, 4],
          [16, 3],
          [19, 4],
          [20, 4],
        ]),
        8,
      ),
    ),
    makeStudy(
      5,
      significant('PZ', '28 x 20 mm', 4, 13),
      gridImages(
        makeSlices('/prostate/29.04/5', [
          [11, 3],
          [13, 4],
          [17, 3],
          [18, 4],
        ]),
        13,
      ),
    ),
    makeStudy(
      6,
      significant('TZ', '21 x 17 mm', 4, 19),
      gridImages(
        makeSlices('/prostate/29.04/6', [
          [8, 3],
          [10, 3],
          [13, 3],
          [15, 4],
          [16, 4],
          [18, 4],
          [19, 4],
          [20, 4],
        ]),
        19,
      ),
    ),
    makeStudy(
      7,
      significant('TZ', '24 x 16 mm', 4, 7),
      gridImages(
        makeSlices('/prostate/29.04/7', [
          [6, 4],
          [11, 4],
          [12, 4],
          [14, 4],
          [15, 4],
        ]),
        6,
      ),
    ),
    makeStudy(8, emptyConclusion(NO_DWI_DATA_DESCRIPTION), { kind: 'none' }),
    makeStudy(
      9,
      significant('TZ', '32 x 24 mm', 4, 14),
      gridImages(
        makeSlices('/prostate/29.04/9', [
          [7, 4],
          [8, 3],
          [9, 4],
          [14, 4],
          [15, 4],
          [16, 4],
          [18, 4],
        ]),
        14,
      ),
    ),
    makeStudy(10, emptyConclusion(ONLY_AXIAL_DESCRIPTION), { kind: 'none' }),
  ],
};

const PROSTATE_0106_FOLDERS: Partial<Record<number, string>> = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  9: '09',
};

function prostate0106Images(studyId: number): StudyImages {
  const folder = PROSTATE_0106_FOLDERS[studyId];
  if (!folder) {
    return { kind: 'none' };
  }
  return {
    kind: 'overview',
    src: `/prostate/01.06/${folder}/result_overview.png`,
  };
}

const report0106: Report = {
  id: '01-06',
  label: 'Результаты (01.06)',
  hideModelConclusion: true,
  studies: report2904.studies.map((study) => ({
    ...study,
    images: prostate0106Images(study.id),
  })),
};

const report2404: Report = {
  id: '24-04',
  label: 'Результаты (24.04)',
  sheetUrl: SHEET_2104_2404,
  studies: [
    makeStudy(
      1,
      significant('TZ', '24 x 22 mm', 4, 23),
      gridImages(
        makeSlices('/prostate/24.04/1', [
          [19, 4],
          [22, 3],
          [23, 4],
          [24, 3],
          [29, 3],
        ]),
        23,
      ),
    ),
    makeStudy(
      2,
      significant('PZ', '7 x 7 mm', 3, 10),
      gridImages(
        makeSlices('/prostate/24.04/2', [
          [9, 3],
          [10, 3],
        ]),
        10,
      ),
    ),
    makeStudy(
      3,
      significant('PZ', '10 x 6 mm', 4, 43),
      gridImages(
        makeSlices('/prostate/24.04/3', [
          [41, 5],
          [43, 4],
        ]),
        43,
      ),
    ),
    makeStudy(
      4,
      significant('PZ', '16 x 16 mm', 3, 14),
      gridImages(
        makeSlices('/prostate/24.04/4', [
          [10, 3],
          [11, 3],
          [14, 3],
          [16, 3],
          [18, 3],
        ]),
        14,
      ),
    ),
    makeStudy(
      5,
      significant('TZ', '15 x 9 mm', 4, 13),
      gridImages(
        makeSlices('/prostate/24.04/5', [
          [12, 3],
          [13, 4],
          [14, 3],
        ]),
        13,
      ),
    ),
    makeStudy(
      6,
      significant('PZ', '30 x 30 mm', 4, 10),
      gridImages(
        makeSlices('/prostate/24.04/6', [
          [10, 4],
          [11, 4],
          [12, 3],
          [14, 4],
        ]),
        10,
      ),
    ),
    makeStudy(
      7,
      significant('TZ', '14 x 12 mm', 4, 9),
      gridImages(
        makeSlices('/prostate/24.04/7', [
          [6, 4],
          [9, 4],
          [13, 5],
        ]),
        9,
      ),
    ),
    makeStudy(8, emptyConclusion(NO_DWI_DATA_DESCRIPTION), { kind: 'none' }),
    makeStudy(
      9,
      significant('PZ', '10 x 8 mm', 4, 13),
      gridImages(
        makeSlices('/prostate/24.04/9', [
          [13, 4],
          [16, 4],
          [17, 5],
        ]),
        13,
      ),
    ),
    makeStudy(10, emptyConclusion(ONLY_AXIAL_DESCRIPTION), { kind: 'none' }),
  ],
};

const report2104: Report = {
  id: '21-04',
  label: 'Результаты (21.04)',
  sheetUrl: SHEET_2104_2404,
  studies: [
    makeStudy(
      1,
      significant('PZ', '23 x 21 mm', 4, 24),
      gridImages(
        makeSlices('/prostate/21.04/1', [
          [19, 4],
          [20, 3],
          [24, 3],
          [29, 3],
        ]),
        24,
      ),
    ),
    makeStudy(
      2,
      significant('PZ', '7 x 7 mm', 4, 5),
      gridImages(makeSlices('/prostate/21.04/2', [[10, 3]]), 10),
    ),
    makeStudy(
      3,
      significant('PZ', '28 x 22 mm', 5, 43),
      gridImages(
        makeSlices('/prostate/21.04/3', [
          [41, 5],
          [43, 4],
          [44, 4],
        ]),
        43,
      ),
    ),
    makeStudy(
      4,
      significant('PZ', '14 x 14 mm', 4, 14),
      gridImages(
        makeSlices('/prostate/21.04/4', [
          [10, 4],
          [14, 4],
          [16, 3],
        ]),
        14,
      ),
    ),
    makeStudy(
      5,
      significant('TZ', '16 x 15 mm', 4, 9),
      gridImages(
        makeSlices('/prostate/21.04/5', [
          [9, 4],
          [12, 3],
          [13, 4],
          [14, 3],
        ]),
        9,
      ),
    ),
    makeStudy(
      6,
      significant('TZ', '20 x 15 mm', 4, 12),
      gridImages(
        makeSlices('/prostate/21.04/6', [
          [9, 5],
          [12, 4],
          [13, 4],
          [14, 3],
          [16, 4],
        ]),
        12,
      ),
    ),
    makeStudy(
      7,
      significant('PZ', '34 x 26 mm', 5, 12),
      gridImages(
        makeSlices('/prostate/21.04/7', [
          [6, 4],
          [9, 4],
          [12, 5],
          [13, 4],
          [14, 4],
        ]),
        12,
      ),
    ),
    makeStudy(8, emptyConclusion(NO_DWI_DATA_DESCRIPTION), { kind: 'none' }),
    makeStudy(
      9,
      significant('TZ', '29 x 18 mm', 5, 17),
      gridImages(
        makeSlices('/prostate/21.04/9', [
          [16, 3],
          [17, 5],
          [20, 4],
        ]),
        17,
      ),
    ),
    makeStudy(10, emptyConclusion(ONLY_AXIAL_DESCRIPTION), { kind: 'none' }),
  ],
};

const report1704: Report = {
  id: '17-04',
  label: 'Результаты (17.04)',
  sheetUrl: SHEET_1704,
  studies: [
    makeStudy(
      1,
      significant('PZ', '16 x 12 mm', 4, 29),
      gridImages(
        makeSlices('/prostate/17.04/1', [
          [26, 3],
          [28, 5],
          [29, 4],
          [30, 4],
          [33, 4],
          [34, 5],
          [35, 4],
          [36, 4],
          [37, 4],
        ]),
        29,
      ),
    ),
    makeStudy(
      2,
      significant('PZ', '9 x 8 mm', 4, 2),
      gridImages(
        makeSlices('/prostate/14.04/02', [
          [2, 4],
          [6, 4],
          [7, 4],
          [14, 3],
          [18, 4],
          [19, 3],
          [21, 5],
        ]),
        2,
      ),
    ),
    makeStudy(
      3,
      significant('PZ', '10 x 8 mm', 4, 46),
      gridImages(
        makeSlices('/prostate/17.04/3', [
          [45, 4],
          [46, 4],
          [50, 4],
        ]),
        46,
      ),
    ),
    makeStudy(
      4,
      significant('PZ', '16 x 16 mm', 4, 17),
      gridImages(
        makeSlices('/prostate/17.04/4', [
          [10, 4],
          [11, 5],
          [14, 4],
          [15, 5],
          [17, 4],
          [19, 4],
        ]),
        17,
      ),
    ),
    makeStudy(
      5,
      significant('PZ', '19 x 18 mm', 4, 13),
      gridImages(
        makeSlices('/prostate/17.04/5', [
          [13, 4],
          [16, 4],
          [17, 4],
          [19, 4],
          [21, 4],
          [22, 4],
        ]),
        13,
      ),
    ),
    makeStudy(
      6,
      significant('TZ', '15 x 10 mm', 4, 20),
      gridImages(
        makeSlices('/prostate/17.04/6', [
          [12, 4],
          [13, 4],
          [15, 5],
          [17, 5],
          [18, 5],
          [19, 4],
          [20, 4],
        ]),
        20,
      ),
    ),
    makeStudy(
      7,
      significant('PZ', '19 x 18 mm', 4, 9),
      gridImages(
        makeSlices('/prostate/17.04/7', [
          [5, 4],
          [9, 4],
          [10, 4],
          [12, 4],
        ]),
        9,
      ),
    ),
    makeStudy(
      8,
      significant('PZ', '12 x 7 mm', 5, 37),
      gridImages(
        makeSlices('/prostate/14.04/08', [
          [1, 3],
          [2, 3],
          [7, 3],
          [11, 4],
          [12, 4],
          [15, 3],
          [21, 4],
          [22, 4],
          [27, 4],
          [37, 5],
          [40, 4],
        ]),
        37,
      ),
    ),
    makeStudy(
      9,
      significant('TZ', '21 x 21 mm', 4, 9),
      gridImages(
        makeSlices('/prostate/17.04/9', [
          [8, 4],
          [9, 4],
          [11, 4],
          [12, 4],
          [13, 4],
          [14, 5],
          [15, 5],
          [16, 4],
          [17, 4],
        ]),
        9,
      ),
    ),
    makeStudy(
      10,
      significant('PZ', '14 x 5 mm', 4, 20),
      gridImages(
        makeSlices('/prostate/14.04/10', [
          [1, 5],
          [8, 5],
          [15, 5],
          [20, 4],
          [24, 5],
          [27, 4],
          [29, 3],
        ]),
        20,
      ),
    ),
  ],
};

const report1404: Report = {
  id: '14-04',
  label: 'Результаты (14.04)',
  sheetUrl: SHEET_1404_LEGACY,
  studies: [
    makeStudy(
      1,
      significant('PZ', '8 × 5 mm', 4, 11),
      gridImages(
        makeSlices('/prostate/14.04/01', [
          [3, 5],
          [8, 5],
          [11, 4],
          [14, 4],
          [17, 4],
          [23, 4],
          [28, 4],
          [31, 4],
          [33, 4],
          [36, 5],
          [41, 4],
          [46, 4],
        ]),
        11,
      ),
    ),
    makeStudy(
      2,
      significant('PZ', '9 × 8 mm', 4, 2),
      gridImages(
        makeSlices('/prostate/14.04/02', [
          [2, 4],
          [6, 4],
          [7, 4],
          [14, 3],
          [18, 4],
          [19, 3],
          [21, 5],
        ]),
        2,
      ),
    ),
    makeStudy(
      3,
      significant('PZ', '8 × 8 mm', 4, 51),
      gridImages(
        makeSlices('/prostate/14.04/03', [
          [7, 5],
          [43, 5],
          [47, 5],
          [51, 4],
        ]),
        51,
      ),
    ),
    makeStudy(
      4,
      significant('PZ', '13 × 9 mm', 4, 1),
      gridImages(
        makeSlices('/prostate/14.04/04', [
          [1, 4],
          [2, 4],
          [4, 3],
          [6, 3],
          [15, 3],
          [18, 5],
          [19, 4],
          [23, 4],
          [26, 5],
        ]),
        1,
      ),
    ),
    makeStudy(
      5,
      significant('TZ', '28 × 14 mm', 4, 12),
      gridImages(
        makeSlices('/prostate/14.04/05', [
          [1, 3],
          [2, 3],
          [7, 3],
          [11, 4],
          [12, 4],
          [15, 3],
          [21, 4],
          [22, 4],
          [27, 4],
          [37, 5],
          [40, 4],
        ]),
        12,
      ),
    ),
    makeStudy(
      6,
      significant('TZ', '20 × 9 mm', 4, 39),
      gridImages(
        makeSlices('/prostate/14.04/06', [
          [3, 4],
          [8, 3],
          [10, 4],
          [17, 3],
          [18, 3],
          [23, 4],
          [27, 4],
          [39, 4],
          [43, 5],
        ]),
        39,
      ),
    ),
    makeStudy(
      7,
      significant('PZ', '12 × 9 mm', 4, 16),
      gridImages(
        makeSlices('/prostate/14.04/07', [
          [1, 4],
          [6, 5],
          [10, 5],
          [15, 4],
          [16, 4],
        ]),
        16,
      ),
    ),
    makeStudy(
      8,
      significant('PZ', '12 × 7 mm', 5, 37),
      gridImages(
        makeSlices('/prostate/14.04/08', [
          [1, 3],
          [2, 3],
          [7, 3],
          [11, 4],
          [12, 4],
          [15, 3],
          [21, 4],
          [22, 4],
          [27, 4],
          [37, 5],
          [40, 4],
        ]),
        37,
      ),
    ),
    makeStudy(
      9,
      significant('TZ', '22 × 16 mm', 5, 31),
      gridImages(
        makeSlices('/prostate/14.04/09', [
          [1, 4],
          [6, 5],
          [7, 4],
          [12, 4],
          [25, 4],
          [31, 5],
          [32, 5],
          [37, 4],
          [39, 4],
          [40, 4],
        ]),
        31,
      ),
    ),
    makeStudy(
      10,
      significant('PZ', '14 × 5 mm', 4, 20),
      gridImages(
        makeSlices('/prostate/14.04/10', [
          [1, 5],
          [8, 5],
          [15, 5],
          [20, 4],
          [24, 5],
          [27, 4],
          [29, 3],
        ]),
        20,
      ),
    ),
  ],
};

const reportLegacy: Report = {
  id: 'legacy',
  label: 'Старые результаты',
  sheetUrl: SHEET_1404_LEGACY,
  modelPanelTitle: 'Заключение ПО',
  doctorPanelTitle: 'Описание врача',
  studies: [
    makeStudy(
      1,
      legacyConclusion(
        'ok',
        5,
        'значимых кластеров: 4, значимых детекций: 35, лучший кластер: TZ, срезы 13-25, размер до 18.8 мм, кластерный PI-RADS 4.',
      ),
      gridImages(
        makeLegacySlices(1, [
          [9, 3],
          [13, 5],
          [14, 4],
          [15, 3],
          [16, 3],
          [17, 4],
          [18, 5],
          [19, 4],
          [20, 5],
          [21, 4],
          [22, 4],
          [23, 3],
          [24, 3],
          [25, 4],
          [29, 4],
          [33, 3],
          [34, 3],
        ]),
      ),
    ),
    makeStudy(
      2,
      legacyConclusion(
        'ok',
        5,
        'значимых кластеров: 5, значимых детекций: 21, лучший кластер: PZ, срезы 7-14, размер до 28.3 мм, кластерный PI-RADS 4.',
      ),
      gridImages(
        makeLegacySlices(2, [
          [4, 3],
          [7, 5],
          [8, 3],
          [9, 5],
          [10, 5],
          [11, 4],
          [12, 3],
          [13, 5],
          [14, 4],
          [16, 3],
          [17, 4],
          [18, 5],
        ]),
      ),
    ),
    makeStudy(
      3,
      legacyConclusion('failed', null, 'pipeline exited with code 1'),
      emptyImages('Для этого исследования изображения не были сохранены.'),
    ),
    makeStudy(
      4,
      legacyConclusion(
        'ok',
        4,
        'значимых кластеров: 2, значимых детекций: 18, лучший кластер: TZ, срезы 5-14, размер до 38.7 мм, кластерный PI-RADS 4.',
      ),
      gridImages(
        makeLegacySlices(4, [
          [5, 4],
          [6, 3],
          [7, 4],
          [8, 4],
          [9, 4],
          [10, 3],
          [11, 3],
          [12, 3],
          [13, 4],
          [14, 4],
          [15, 3],
          [16, 3],
          [18, 3],
        ]),
      ),
    ),
    makeStudy(
      5,
      legacyConclusion(
        'ok',
        5,
        'значимых кластеров: 5, значимых детекций: 22, лучший кластер: TZ, срезы 13-21, размер до 54.1 мм, кластерный PI-RADS 4.',
      ),
      gridImages(
        makeLegacySlices(5, [
          [11, 5],
          [12, 3],
          [13, 4],
          [14, 3],
          [15, 4],
          [16, 4],
          [17, 4],
          [18, 4],
          [19, 3],
          [20, 3],
          [21, 3],
          [23, 4],
          [24, 4],
          [31, 3],
        ]),
      ),
    ),
    makeStudy(
      6,
      legacyConclusion(
        'ok',
        4,
        'значимых кластеров: 5, значимых детекций: 13, лучший кластер: TZ, срезы 16-20, размер до 10.3 мм, кластерный PI-RADS 4.',
      ),
      gridImages(
        makeLegacySlices(6, [
          [16, 4],
          [17, 4],
          [18, 4],
          [20, 4],
          [21, 3],
          [23, 3],
          [25, 3],
          [28, 4],
          [35, 4],
          [37, 3],
        ]),
      ),
    ),
    makeStudy(
      7,
      legacyConclusion(
        'ok',
        3,
        'значимых кластеров: 4, значимых детекций: 4, лучший кластер: PZ, срез 14, размер до 4.6 мм, кластерный PI-RADS 3.',
      ),
      gridImages(
        makeLegacySlices(7, [
          [5, 4],
          [13, 3],
          [14, 4],
          [15, 3],
          [17, 4],
          [18, 3],
        ]),
      ),
    ),
    makeStudy(
      8,
      legacyConclusion(
        'ok',
        3,
        'значимых кластеров не выявлено; итог выставлен в fallback-режиме по неполному DWI-набору.',
      ),
      gridImages(makeLegacySlices(8, [[6, 3, 'overview']])),
    ),
    makeStudy(
      9,
      legacyConclusion(
        'ok',
        4,
        'значимых кластеров: 6, значимых детекций: 8, лучший кластер: PZ, срезы 26-28, размер до 6.6 мм, кластерный PI-RADS 3.',
      ),
      gridImages(
        makeLegacySlices(9, [
          [7, 3],
          [9, 4],
          [10, 3],
          [15, 3],
          [24, 3],
          [26, 4],
          [27, 4],
          [28, 4],
        ]),
      ),
    ),
    makeStudy(
      10,
      legacyConclusion(
        'ok',
        4,
        'значимых кластеров: 3, значимых детекций: 4, лучший кластер: PZ, срезы 18-19, размер до 3.3 мм, кластерный PI-RADS 3.',
      ),
      gridImages(
        makeLegacySlices(10, [
          [12, 3],
          [16, 4],
          [17, 3],
          [18, 4],
          [19, 3],
        ]),
      ),
    ),
  ],
};

export const prostateReports: Report[] = [
  report0106,
  report2205,
  report2904,
  report2404,
  report2104,
  report1704,
  report1404,
  reportLegacy,
];
