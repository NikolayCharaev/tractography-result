import type { LucideIcon } from "lucide-react"
import { Atom } from "lucide-react"

export type AppNavigationItem = {
  icon?: LucideIcon
  title: string
  href: string
  tooltip?: boolean
  /** Если true — пункт в меню и маршрут только после входа (кроме `/`, трактография всегда публичная) */
  requiresAuth?: boolean
}

export const appNavigation: AppNavigationItem[] = [
  {
    icon: Atom,
    title: "Трактография (38 задача)",
    href: "/",
    requiresAuth: false,
  },
  {
    icon: Atom,
    title: "Сегментация вен лёгких ",
    href: "/pulmonary-vein-segmentation",
    requiresAuth: true,
  },
  {
    icon: Atom,
    title: "Сегментация молочной железы",
    href: "/breast-segmentation",
    requiresAuth: true,
  },
  {
    icon: Atom,
    title: "Предстательная железа (50 задача)",
    href: "/prostate",
    requiresAuth: true,
  },
  {
    icon: Atom,
    title: "Инородные тела в грудной клетке",
    href: "/foreign-bodies-breast",
    requiresAuth: true,
  },
  {
    icon: Atom,
    title: "Инородные тела в тазовой области",
    href: "/foreign-bodies-hip",
    requiresAuth: true,
  },
]
