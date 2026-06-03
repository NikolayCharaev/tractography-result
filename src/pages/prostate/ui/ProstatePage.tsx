import { ExternalLink } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"
import { prostateReports } from "../model/reports"
import type { Report, ReportSection } from "../model/types"
import { StudyCard } from "./StudyCard"

const DEFAULT_REPORT_ID = prostateReports[0]?.id ?? ""

export function ProstatePage() {
  return (
    <section>
      <Title>Поиск очагов в МРТ предстательной железы</Title>

      <Tabs defaultValue={DEFAULT_REPORT_ID} className="w-full gap-6">
        <TabsList
          variant="default"
          className="h-auto w-full flex-wrap justify-start gap-1 mb-30 sm:mb-0"
        >
          {prostateReports.map((report) => (
            <TabsTrigger
              key={report.id}
              value={report.id}
              className="flex-initial whitespace-nowrap text-[14px]"
            >
              {report.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {prostateReports.map((report) => (
          <TabsContent key={report.id} value={report.id} className="mt-2">
            <ReportContent report={report} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function ReportContent({ report }: { report: Report }) {
  const modelTitle = report.modelPanelTitle ?? "Заключение ПО"
  const defaultDoctorTitle = report.doctorPanelTitle ?? "Заключение врача RT"

  if (report.sections?.length) {
    const defaultSectionId = report.sections[0]?.id ?? ""

    return (
      <Tabs defaultValue={defaultSectionId} className="w-full gap-4">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-1"
        >
          {report.sections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex-initial whitespace-nowrap"
            >
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {report.sections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-2">
            <SectionStudies
              section={section}
              report={report}
              modelTitle={modelTitle}
              defaultDoctorTitle={defaultDoctorTitle}
            />
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  return (
    <>
      {report.sheetUrl ? (
        <p className="mb-4 text-sm">
          <a
            href={report.sheetUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline"
          >
            Таблица со сводными данными по поиску очагов в ПО и описаниями
            врача-рентгенолога
            <ExternalLink className="size-4" />
          </a>
        </p>
      ) : null}

      <div className="flex flex-col gap-4">
        {(report.studies ?? []).map((study) => (
          <StudyCard
            key={study.id}
            study={study}
            modelPanelTitle={modelTitle}
            doctorPanelTitle={defaultDoctorTitle}
            hideModelConclusion={report.hideModelConclusion}
          />
        ))}
      </div>
    </>
  )
}

function SectionStudies({
  section,
  report,
  modelTitle,
  defaultDoctorTitle,
}: {
  section: ReportSection
  report: Report
  modelTitle: string
  defaultDoctorTitle: string
}) {
  const doctorTitle = section.doctorPanelTitle ?? defaultDoctorTitle

  return (
    <div className="flex flex-col gap-4">
      {section.studies.map((study) => (
        <StudyCard
          key={`${section.id}-${study.id}`}
          study={study}
          modelPanelTitle={modelTitle}
          doctorPanelTitle={doctorTitle}
          hideModelConclusion={report.hideModelConclusion}
        />
      ))}
    </div>
  )
}
