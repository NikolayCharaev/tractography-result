import { cn } from "@/shared/lib/utils"
import type { ModelConclusion } from "../model/types"

type ModelConclusionPanelProps = {
  conclusion: ModelConclusion
}

export function ModelConclusionPanel({ conclusion }: ModelConclusionPanelProps) {
  if (conclusion.kind === "structured") {
    const tone = conclusion.summaryTone ?? "neutral"
    return (
      <div className="space-y-3">
        <p
          className={cn(
            "text-sm font-semibold",
            tone === "positive" && "text-emerald-700",
            tone === "neutral" && "text-slate-700",
            tone === "warning" && "text-amber-800",
          )}
        >
          {conclusion.summary}
        </p>
        {conclusion.details.length > 0 ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
            {conclusion.details.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
        ) : null}
      </div>
    )
  }

  if (conclusion.kind === "significant") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-emerald-700">
          Клинически значимый очаг присутствует
        </p>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
          <Row label="Зона расположения очага" value={conclusion.zone} />
          <Row
            label="Размер предполагаемого очага"
            value={conclusion.sizeMm}
          />
          <Row label="PI-RADS" value={String(conclusion.piRads)} />
          <Row
            label="Наиболее значимый срез"
            value={String(conclusion.significantSlice)}
          />
        </dl>
      </div>
    )
  }

  if (conclusion.kind === "empty") {
    return (
      <div className="space-y-2 text-sm">
        <p className="font-semibold text-slate-700">Недостаточное количество данных</p>
        <p className="italic text-slate-500">{conclusion.description}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={conclusion.status} />
        <span className="text-slate-500">
          PI-RADS модели:{" "}
          <span className="font-semibold text-slate-900">
            {conclusion.piRadsModel ?? "—"}
          </span>
        </span>
      </div>
      <p className="leading-relaxed text-slate-700">
        <span className="font-semibold text-slate-900">Примечание:</span>{" "}
        {conclusion.note}
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <dt className="text-slate-500">{label}:</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  )
}

function StatusBadge({ status }: { status: "ok" | "failed" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white",
        status === "ok" ? "bg-emerald-600" : "bg-red-600",
      )}
    >
      {status}
    </span>
  )
}
