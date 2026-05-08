export function TractsInfo() {
    return (
        <div className="flex w-full flex-col gap-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white sm:p-5 text-xs">
            <section className="flex flex-col gap-4 sm:gap-5">
                <h2 className="m-0 text-lg font-semibold sm:text-xl">Режим построения трактов</h2>

                <div className="flex flex-col gap-2">
                    <h3 className="m-0 text-base font-semibold text-blue-300">Входные данные</h3>
                    <p className="m-0 wrap-break-word leading-6">
                        Это исходные DWI-данные, по которым строится трактограмма.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="m-0 text-base font-semibold text-blue-300">Выходные данные</h3>

                    <ul className="m-0 flex list-disc flex-col gap-1.5 wrap-break-word pl-5 leading-6">
                        <li>
                            <span className="font-semibold text-blue-200">Tractogram_A.trk</span> -
                            Построенная трактограмма в формате TrackVis.
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Tractogram_A.tck</span> -
                            Сконвертированная трактограмма для просмотра в mrview пакета{" "}
                            <a
                                className="text-blue-300 hover:underline"
                                href="https://mrtrix.readthedocs.io/en/latest/installation/package_install.html"
                                target="_blank"
                                rel="noreferrer"
                            >
                                MRTrix3
                            </a>
                            .
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Tractogram_A.glb</span> -
                            3D-модель трактограммы в формате glb/glTF.
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Corrected_DWI.nii.gz</span> -
                            скорректированный входной DWI-файл (устранение искажений и токов Фуко).
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Brain_mask.nii.gz</span> - маска
                            мозга.
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Карты:</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">FA.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">MD.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">ADC.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">Trace.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">AD.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">RD.nii.gz</span>
                        </li>
                        <li>
                            <span className="font-semibold text-blue-200">b0_map.nii.gz</span>
                        </li>
                    </ul>
                </div>
            </section>


        </div>
    )
}