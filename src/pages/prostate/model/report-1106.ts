import { doctorTexts } from "./doctor-texts"
import { ronixDoctorTexts } from "./ronix-doctor-texts"
import type { ModelConclusion, Report, Study, StudyImages } from "./types"

const RONIX_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
const RT_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 9] as const

/** Данные собраны из `public/prostate/11.06/{new|old}/<id>/visualizations/lesions_summary.json` и `lesion_001.json`. */
export const conclusionsRonix1106: Record<number, ModelConclusion> = {
  1: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "PZ-like (peripheral / posterior)" },
      { label: "Размер предполагаемого очага", value: "9.5 x 11.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "11" },
    ],
  },
  2: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "Anterior (TZ / AFS-like)" },
      { label: "Размер предполагаемого очага", value: "18.5 x 16.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "12" },
    ],
  },
  3: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "PZ-like (peripheral / posterior)" },
      { label: "Размер предполагаемого очага", value: "10.5 x 9 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "13" },
      {
        label: "Примечание",
        value: "В экспорте указано очагов: 3 (показан основной).",
      },
    ],
  },
  4: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "Posterior (PZ-like)" },
      { label: "Размер предполагаемого очага", value: "10.5 x 18.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "10" },
      {
        label: "Примечание",
        value: "В экспорте указано очагов: 2 (показан основной).",
      },
    ],
  },
  5: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  6: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "PZ-like (peripheral / posterior)" },
      { label: "Размер предполагаемого очага", value: "9.5 x 9.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "11" },
    ],
  },
  7: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  8: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "TZ-like (central / anterior)" },
      { label: "Размер предполагаемого очага", value: "12 x 16.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "11" },
      {
        label: "Примечание",
        value: "В экспорте указано очагов: 3 (показан основной).",
      },
    ],
  },
  9: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  10: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "PZ-like (peripheral / posterior)" },
      { label: "Размер предполагаемого очага", value: "6.5 x 6 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "8" },
    ],
  },
}

export const conclusionsRt1106: Record<number, ModelConclusion> = {
  1: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  2: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "TZ-like (central)" },
      { label: "Размер предполагаемого очага", value: "9.5 x 7.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "7" },
    ],
  },
  3: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "Anterior (TZ / AFS-like)" },
      { label: "Размер предполагаемого очага", value: "4.5 x 5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "12" },
    ],
  },
  4: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  5: {
    kind: "structured",
    summary: "По данным экспорта значимых очагов не обнаружено.",
    summaryTone: "neutral",
    details: [],
  },
  6: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "Mid gland / mixed" },
      { label: "Размер предполагаемого очага", value: "9.5 x 13.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "10" },
    ],
  },
  7: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "PZ-like (peripheral / posterior)" },
      { label: "Размер предполагаемого очага", value: "13 x 10 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "4" },
      {
        label: "Примечание",
        value: "В экспорте указано очагов: 2 (показан основной).",
      },
    ],
  },
  9: {
    kind: "structured",
    summary: "Клинически значимый очаг присутствует",
    summaryTone: "positive",
    details: [
      { label: "Зона расположения очага", value: "Anterior (TZ / AFS-like)" },
      { label: "Размер предполагаемого очага", value: "19.5 x 16.5 mm" },
      { label: "PI-RADS", value: "5" },
      { label: "Наиболее значимый срез", value: "5" },
      {
        label: "Примечание",
        value: "В экспорте указано очагов: 3 (показан основной).",
      },
    ],
  },
}

export function prostate1106Images(variant: "new" | "old", studyId: number): StudyImages {
  return {
    kind: "overview",
    src: `/prostate/11.06/${variant}/${studyId}/visualizations/result_lesion_slices.png`,
    kineticCurvesSrc: `/prostate/11.06/${variant}/${studyId}/visualizations/result_overview.png`,
  }
}

function makeRonixStudy(id: number): Study {
  return {
    id,
    modelConclusion: conclusionsRonix1106[id]!,
    doctorText: ronixDoctorTexts[id] ?? "",
    images: prostate1106Images("new", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

function makeRtStudy(id: number): Study {
  return {
    id,
    modelConclusion: conclusionsRt1106[id]!,
    doctorText: doctorTexts[id] ?? "",
    images: prostate1106Images("old", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

export const report1106: Report = {
  id: "11-06",
  label: "Результаты (11.06)",
  modelPanelTitle: "Заключение ПО",
  sections: [
    {
      id: "ronix",
      label: "Исследования Ronix",
      doctorPanelTitle: "Заключение врача",
      studies: RONIX_STUDY_IDS.map((id) => makeRonixStudy(id)),
    },
    {
      id: "rt",
      label: "Исследования RT",
      doctorPanelTitle: "Заключение врача RT",
      studies: RT_STUDY_IDS.map((id) => makeRtStudy(id)),
    },
  ],
}
