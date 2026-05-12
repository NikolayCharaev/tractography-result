import { Info } from 'lucide-react'
import { HoverCard, HoverCardTrigger, HoverCardContent, Button, TractographyList } from '@/components/index'
import { TractsInfo } from './TracktsInfo';


export function Home() {
  return (
    <section className="container mx-auto gap-6 p-4 sm:p-6 lg:p-8">
      <h1 className="mb-4 text-2xl font-semibold text-black sm:mb-5 sm:text-3xl">
        Визуализация результатов Трактографии
      </h1>
      <div className="flex items-center justify-between">
        <a
          className="w-fit font-semibold text-blue-400 no-underline hover:underline"
          href="https://drive.google.com/file/d/1IUmkEgU5RiU2dNf1P6PTqvQ446pMct19/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Архив с результатами
        </a>


        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline">   <Info /></Button>
          </HoverCardTrigger>
          <HoverCardContent  className="w-100">
           <TractsInfo/>
          </HoverCardContent>
        </HoverCard>
      </div>


      <div className="mt-5">
        <TractographyList/>
      </div>
    </section>
  );
}