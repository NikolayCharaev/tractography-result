import { Info } from 'lucide-react'
import { HoverCard, HoverCardTrigger, HoverCardContent, Button } from '../../components/index'
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
          href="https://disk.yandex.ru/d/HGIdIayyJ0wChw"
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
        <div className="flex items-stretch gap-4">
          <div className="flex w-full flex-col items-stretch gap-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-4 md:items-center">
            <video
              className="h-full w-full rounded-lg border border-slate-700 bg-slate-950"
              src="/2d_demo.gif.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
            <p className="m-0 text-center leading-6 text-white">
              Двумерная демонстрация результатов расчёта по данным R7.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-4 md:items-center">
            <video
              className="w-full rounded-lg border border-slate-700 bg-slate-950"
              src="/3d_demo.gif.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
            <p className="m-0 text-center leading-6 text-white">
              Трёхмерная модель построения по данным из R7.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}