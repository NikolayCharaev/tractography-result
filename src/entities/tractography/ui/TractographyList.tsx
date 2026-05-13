import { useId, useRef, useState } from "react"
import gsap from "gsap"

import { tractographyList } from "../model/constants"
import type { tractographyListTypes } from "../model/types"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function TractographyPanelBody({ elem }: { elem: tractographyListTypes }) {
  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row">
      <div className="flex w-full flex-col items-stretch gap-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-4 md:items-center">
        <video
          className="h-full w-full rounded-lg border border-slate-700 bg-slate-950"
          src={elem.link2d}
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
          src={elem.link3d}
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
  )
}

function TractographyListInner() {
  const defaultValue = tractographyList[0]!.title
  const panelBaseId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const animGenerationRef = useRef(0)

  const [tab, setTab] = useState(defaultValue)
  const [displayedTab, setDisplayedTab] = useState(defaultValue)

  const activeIndex = Math.max(
    0,
    tractographyList.findIndex((e) => e.title === tab)
  )
  const displayed = tractographyList.find((e) => e.title === displayedTab)

  const runPanelTransition = (next: string) => {
    if (next === displayedTab) return

    if (prefersReducedMotion()) {
      gsap.killTweensOf(panelRef.current)
      setDisplayedTab(next)
      if (panelRef.current) {
        gsap.set(panelRef.current, { clearProps: "all" })
      }
      return
    }

    const el = panelRef.current
    if (!el) {
      setDisplayedTab(next)
      return
    }

    const generation = ++animGenerationRef.current
    gsap.killTweensOf(el)

    gsap.to(el, {
      autoAlpha: 0,
      y: -10,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        if (animGenerationRef.current !== generation) return
        setDisplayedTab(next)
        requestAnimationFrame(() => {
          if (animGenerationRef.current !== generation) return
          const target = panelRef.current
          if (!target) return
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              ease: "power3.out",
              clearProps: "transform",
            }
          )
        })
      },
    })
  }

  const handleValueChange = (next: string) => {
    setTab(next)
    runPanelTransition(next)
  }

  return (
    <Tabs
      value={tab}
      onValueChange={handleValueChange}
      className="w-full gap-6"
    >
      <div className="flex flex-col gap-6 rounded-xl p-6 shadow-md sm:p-10">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-fit">
          {tractographyList.map((elem, index) => (
            <TabsTrigger
              key={elem.title}
              id={`${panelBaseId}-trigger-${index}`}
              value={elem.title}
              className="flex-1 sm:flex-initial"
            >
              {elem.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {displayed ? (
          <div
            ref={panelRef}
            role="tabpanel"
            id={`${panelBaseId}-panel`}
            aria-labelledby={`${panelBaseId}-trigger-${activeIndex}`}
            tabIndex={0}
            className="mt-0 flex flex-col gap-4 outline-none"
          >
            <TractographyPanelBody elem={displayed} />
          </div>
        ) : null}
      </div>
    </Tabs>
  )
}

export function TractographyList() {
  if (!tractographyList.length) {
    return null
  }

  return <TractographyListInner />
}
