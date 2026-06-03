import { doctorTexts } from "./doctor-texts"
import { ronixDoctorTexts } from "./ronix-doctor-texts"
import type { EmptyConclusion, Report, Study, StudyImages } from "./types"

const RONIX_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
const RT_STUDY_IDS = [1, 2, 3, 4, 5, 6, 7, 9] as const

function emptyModelConclusion(): EmptyConclusion {
  return { kind: "empty", description: "" }
}

function prostate0306Images(source: "ronix" | "rt", studyId: number): StudyImages {
  const folder = String(studyId).padStart(2, "0")
  return {
    kind: "overview",
    src: `/03.06/${source}/${folder}/result_lesion_slices.png`,
  }
}

function makeRonixStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: ronixDoctorTexts[id] ?? "",
    images: prostate0306Images("ronix", id),
    imagesPanelTitle: "Срезы с очагами",
  }
}

function makeRtStudy(id: number): Study {
  return {
    id,
    modelConclusion: emptyModelConclusion(),
    doctorText: doctorTexts[id] ?? "",
    images: prostate0306Images("rt", id),
    imagesPanelTitle: "Срезы с очагами",
  }
}

export const report0306: Report = {
  id: "03-06",
  label: "Результаты (03.06)",
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
