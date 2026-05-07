export function Home() {
  return (
    <section className="container mx-auto gap-6 p-4 sm:p-6 lg:p-8">
      <h1 className="mb-4 text-2xl font-semibold text-black sm:mb-5 sm:text-3xl">
        Визуализация результатов Трактографии
      </h1>
      <a
        className="w-fit font-semibold text-blue-400 no-underline hover:underline"
        href="https://disk.yandex.ru/d/HGIdIayyJ0wChw"
        target="_blank"
        rel="noreferrer"
      >
        Архив с результатами
      </a>

      <div className="mt-5 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:w-1/2 lg:grid-cols-1">
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

        <div className="flex w-full flex-col gap-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white sm:p-5 lg:w-1/2">
          <section className="flex flex-col gap-4 sm:gap-5">
            <h2 className="m-0 text-lg font-semibold sm:text-xl">Режим построения трактов</h2>

            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-semibold text-blue-300">Входные данные</h3>
              <p className="m-0 wrap-break-word leading-6">
                Входные файлы расположены в папке{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  /input/for-new-tract
                </code>
                . Это исходные DWI-данные, по которым строится трактограмма.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-semibold text-blue-300">Выходные данные</h3>
              <p className="m-0 wrap-break-word leading-6">
                После работы скрипта{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  build_tract.sh
                </code>{" "}
                результаты сохраняются в папку{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  /output
                </code>{" "}
                и упаковываются в архив:
              </p>
              <ul className="m-0 flex list-disc flex-col gap-1.5 wrap-break-word pl-5 leading-6">
                <li>
                  <span className="font-semibold text-blue-200">Tractogram_A.trk</span> —
                  построенная трактограмма в формате TrackVis.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Tractogram_A.tck</span> —
                  конвертированная трактограмма для просмотра в{" "}
                  <span className="font-mono">mrview</span> из пакета MRTrix3.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Tractogram_A.glb</span> — 3D-модель
                  трактограммы в формате glb/glTF.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Corrected_DWI.nii.gz</span> —
                  скорректированный входной DWI-файл (устранение искажений и токов Фуко).
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Brain_mask.nii.gz</span> — маска
                  мозга.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Карты:</span>{" "}
                  <span className="break-all font-mono text-sm text-blue-200">
                    FA.nii.gz, MD.nii.gz, ADC.nii.gz, Trace.nii.gz, AD.nii.gz, RD.nii.gz,
                    b0_map.nii.gz
                  </span>
                  .
                </li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4 sm:gap-5">
            <h2 className="m-0 text-lg font-semibold sm:text-xl">Режим слияния трактов</h2>

            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-semibold text-blue-300">Входные данные</h3>
              <p className="m-0 wrap-break-word leading-6">
                Входные файлы расположены в папке{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  /input/merging-tracts
                </code>
                . Это набор ранее построенных трактограмм в формате TrackVis (
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  .trk
                </code>
                ), которые требуется объединить в одну.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-semibold text-blue-300">Выходные данные</h3>
              <p className="m-0 wrap-break-word leading-6">
                После работы скрипта{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  merge_tract.sh
                </code>{" "}
                результаты сохраняются в папку{" "}
                <code className="break-all rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-200">
                  /output
                </code>{" "}
                и упаковываются в архив:
              </p>
              <ul className="m-0 flex list-disc flex-col gap-1.5 wrap-break-word pl-5 leading-6">
                <li>
                  <span className="font-semibold text-blue-200">Combined_Tractography.trk</span> —
                  основной файл с результатами слияния трактограмм.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Combined_Tractography.tck</span> —
                  конвертированная версия TRK-файла для просмотра в утилите{" "}
                  <span className="font-mono">mrview</span> из пакета MRTrix3.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Tract_Density_Map.nii.gz</span> —
                  карта плотности трактов.
                </li>
                <li>
                  <span className="font-semibold text-blue-200">Merging_Summary.json</span> —
                  сводка по результатам слияния.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}