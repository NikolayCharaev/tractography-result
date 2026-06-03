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

export type ModelConclusion =
  | SignificantConclusion
  | EmptyConclusion
  | LegacyConclusion

export type Slice = {
  number: number
  src: string
  piRads?: number
}

export type StudyImages =
  | { kind: "grid"; slices: Slice[]; highlightedSliceNumber?: number }
  | { kind: "overview"; src: string; secondarySrc?: string }
  | { kind: "empty"; message: string }
  | { kind: "none" }

export type ReportSection = {
  id: string
  label: string
  doctorPanelTitle?: string
  studies: Study[]
}

export type Study = {
  id: number
  modelConclusion: ModelConclusion
  doctorText: string
  images: StudyImages
  imagesPanelTitle?: string
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
