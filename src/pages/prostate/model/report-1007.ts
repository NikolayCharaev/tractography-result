import { doctorTexts } from "./doctor-texts"
import { ronixDoctorTexts } from "./ronix-doctor-texts"
import type { EmptyConclusion, Report, Study, StudyImages } from "./types"

const RONIX_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
const RT_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 9] as const

function emptyModelConclusion(): EmptyConclusion {
  return { kind: "empty", description: "" }
}

/** Изображения из public/prostate/10.07: `new` — Ronix, `old` — RT. */
function prostate1007Images(variant: "new" | "old", studyId: number): StudyImages {
  return {
    kind: "overview",
    src: `/prostate/10.07/${variant}/${studyId}/result_lesion_slices.png`,
    kineticCurvesSrc: `/prostate/10.07/${variant}/${studyId}/result_overview.png`,
  }
}

function makeRonixStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: ronixDoctorTexts[id] ?? "",
    images: prostate1007Images("new", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

function makeRtStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: doctorTexts[id] ?? "",
    images: prostate1007Images("old", id),
    imagesPanelTitle: "Срезы с очагами и кинетика",
  }
}

export const report1007: Report = {
  id: "10-07",
  label: "Результаты (10.07)",
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
