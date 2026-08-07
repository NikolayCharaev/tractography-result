import { doctorTexts } from "./doctor-texts"
import { ronixDoctorTexts } from "./ronix-doctor-texts"
import type { EmptyConclusion, Report, Study, StudyImages } from "./types"

const RONIX_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
const RT_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 9] as const

function emptyModelConclusion(): EmptyConclusion {
  return { kind: "empty", description: "" }
}

/**
 * Для 07.08 overview-картинки корректные, а `result_lesion_slices.png`
 * пришли с агрессивным кропом. Для тех же study id используем нормально
 * сформированные срезы из 28.07, пока 07.08 не будут перегенерированы.
 */
function prostate0708Images(variant: "new" | "old", studyId: number): StudyImages {
  return {
    kind: "overview",
    src: `/prostate/28.07/${variant}/${studyId}/result_lesion_slices.png`,
    kineticCurvesSrc: `/prostate/07.08/${variant}/${studyId}/result_overview.png`,
  }
}

function makeRonixStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: ronixDoctorTexts[id] ?? "",
    images: prostate0708Images("new", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

function makeRtStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: doctorTexts[id] ?? "",
    images: prostate0708Images("old", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

export const report0708: Report = {
  id: "07-08",
  label: "Результаты (07.08)",
  hideModelConclusion: true,
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
