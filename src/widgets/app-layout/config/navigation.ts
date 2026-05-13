import type { LucideIcon } from "lucide-react"
import { Brain, Wind } from "lucide-react"

export type AppNavigationItem = {
  icon: LucideIcon
  title: string
  href: string
}

export const appNavigation: AppNavigationItem[] = [
  {
    icon: Brain,
    title: "Результаты трактографии",
    href: "/",
  },
  {
    icon: Wind,
    title: "Сегментация вен лёгких",
    href: "/pulmonary-vein-segmentation",
  },
]
