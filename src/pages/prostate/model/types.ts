export type FocusZone = "PZ" | "TZ"

export type SignificantConclusion = {
  kind: "significant"
  zone: FocusZone
  sizeMm: string
  piRads: number
  significantSlice: number
}

export type EmptyConclusion = {
  kind: "empty"
  description: string
}

export type LegacyStatus = "ok" | "failed"

export type LegacyConclusion = {
  kind: "legacy"
  status: LegacyStatus
  piRadsModel: number | null
  note: string
}

/** Заключение ПО из экспорта (lesions_summary / lesion_001 и т.п.) */
export type StructuredConclusion = {
  kind: "structured"
  summary: string
  summaryTone?: "positive" | "neutral" | "warning"
  details: { label: string; value: string }[]
}

export type ModelConclusion =
  | SignificantConclusion
  | EmptyConclusion
  | LegacyConclusion
  | StructuredConclusion

export type Slice = {
  number: number
  src: string
  piRads?: number
}

export type StudyImages =
  | {
      kind: "grid"
      slices: Slice[]
      highlightedSliceNumber?: number
    }
  | {
      kind: "overview"
      src: string
      secondarySrc?: string
      /** Отдельная панель (например обзор с кинетическими кривыми) */
      kineticCurvesSrc?: string
    }
  | { kind: "empty"; message: string }
  | { kind: "none" }

export type ReportSection = {
  id: string
  label: string
  doctorPanelTitle?: string
  studies: Study[]
}

/** Дополнительный метод анализа (например Picai рядом с эвристикой). */
export type StudyMethodComparison = {
  label: string
  modelConclusion: ModelConclusion
  images: StudyImages
  imagesPanelTitle?: string
  modelPanelTitle?: string
  hideModelConclusion?: boolean
}

export type Study = {
  id: number
  modelConclusion: ModelConclusion
  doctorText: string
  images: StudyImages
  imagesPanelTitle?: string
  /** Подпись основного метода при сравнении (например «Эвристика»). */
  primaryLabel?: string
  /** Второй метод справа (например Picai). */
  comparison?: StudyMethodComparison
}

export type Report = {
  id: string
  label: string
  sheetUrl?: string
  modelPanelTitle?: string
  doctorPanelTitle?: string
  /** Не показывать блок «Заключение ПО» */
  hideModelConclusion?: boolean
  studies?: Study[]
  /** Вложенные табы (например Ronix / RT в отчёте 03.06) */
  sections?: ReportSection[]
}
