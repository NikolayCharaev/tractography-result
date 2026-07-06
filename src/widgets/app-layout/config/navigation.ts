import type { LucideIcon } from "lucide-react"
import { LayoutGrid } from "lucide-react"

/** Одна иконка для всех пунктов: набор разделов демонстрации */
const navIcon: LucideIcon = LayoutGrid

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
    icon: navIcon,
    title: "Трактография (38 задача)",
    href: "/",
    requiresAuth: false,
  },
  {
    icon: navIcon,
    title: "Сегментация сердца",
    href: "/heart-segmentation",
    requiresAuth: false,
  },
  {
    icon: navIcon,
    title: "Сегментация вен лёгких ",
    href: "/pulmonary-vein-segmentation",
    requiresAuth: false,
  },
  {
    icon: navIcon,
    title: "Молочная железа",
    href: "/breast",
    requiresAuth: false,
  },
  {
    icon: navIcon,
    title: "Предстательная железа (50 задача)",
    href: "/prostate",
    requiresAuth: false,
  },
  {
    icon: navIcon,
    title: "Инородные тела в грудной клетке",
    href: "/foreign-bodies-breast",
    requiresAuth: true,
  },
  {
    icon: navIcon,
    title: "Инородные тела в тазовой области",
    href: "/foreign-bodies-hip",
    requiresAuth: true,
  },
]
