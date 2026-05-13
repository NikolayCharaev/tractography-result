import { Info } from "lucide-react"

import { TractographyList, TractsInfo } from "@/entities/tractography"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui/hover-card"
import { Button } from "@/shared/ui/button"

export function HomePage() {
  return (
    <section className="container mx-auto gap-6 p-4 sm:p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-4 sm:mb-5 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="m-0 text-2xl font-semibold text-black sm:text-3xl">
          Визуализация результатов Трактографии
        </h1>
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline">
              <Info />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-100">
            <TractsInfo />
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="mt-2">
        <TractographyList />
      </div>
    </section>
  )
}
