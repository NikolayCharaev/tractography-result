import { Info } from "lucide-react"

import { TractographyList, TractsInfo } from "@/entities/tractography"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui/hover-card"
import { Button } from "@/shared/ui/button"
import { Title } from "@/shared/ui/title"

const ARCHIVE_HREF =
  "https://drive.google.com/file/d/1IUmkEgU5RiU2dNf1P6PTqvQ446pMct19/view?usp=drive_link"

export function HomePage() {
  return (
    <section>
      <Title>Трактография</Title>
      <div className="flex items-center justify-between">
        <a
          className="w-fit font-semibold text-blue-400 no-underline hover:underline"
          href={ARCHIVE_HREF}
          target="_blank"
          rel="noreferrer"
        >
          Архив с результатами
        </a>

        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline">
              <Info />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="left" className="w-100">
            <TractsInfo />
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="mt-5">
      <Title>Визуализация результатов Трактографии</Title>
        <TractographyList />
      </div>
    </section>
  )
}
