import { ExternalLink } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"
import { prostateReports } from "../model/reports"
import { StudyCard } from "./StudyCard"

const DEFAULT_REPORT_ID = prostateReports[0]?.id ?? ""

export function ProstatePage() {
  return (
    <section>
      <Title>Поиск очагов в МРТ предстательной железы</Title>

      <Tabs  defaultValue={DEFAULT_REPORT_ID} className="w-full gap-6">
        <TabsList  variant="default" className="h-auto w-full flex-wrap justify-start gap-1 mb-30 sm:mb-0">
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

        {prostateReports.map((report) => {
          const modelTitle = report.modelPanelTitle ?? "Заключение ПО"
          const doctorTitle = report.doctorPanelTitle ?? "Заключение врача RT"

          return (
            <TabsContent key={report.id} value={report.id} className="mt-2">
              {report.sheetUrl ? (
                <p className="mb-4 text-sm">
                  <a
                    href={report.sheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline"
                  >
                    Таблица со сводными данными по поиску очагов в ПО и
                    описаниями врача-рентгенолога
                    <ExternalLink className="size-4" />
                  </a>
                </p>
              ) : null}

              <div className="flex flex-col gap-4">
                {report.studies.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    modelPanelTitle={modelTitle}
                    doctorPanelTitle={doctorTitle}
                    hideModelConclusion={report.hideModelConclusion}
                  />
                ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </section>
  )
}
