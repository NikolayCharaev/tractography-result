import type { LucideIcon } from 'lucide-react';
import { Activity, Bone, Brain, Wind } from 'lucide-react';

export type AppNavigationItem = {
  icon: LucideIcon;
  title: string;
  href: string;
  tooltip?: boolean;
};

export const appNavigation: AppNavigationItem[] = [
  {
    icon: Brain,
    title: 'Трактография (38 задача)',
    href: '/',
  },
  {
    icon: Wind,
    title: 'Сегментация вен лёгких ',
    href: '/pulmonary-vein-segmentation',
  },
  {
    icon: Activity,
    title: 'Предстательная железа (50 задача)',
    href: '/prostate',
  },

  {
    icon: Bone,
    title: 'Инородные тела в грудной клетке',
    href: '/foreign-bodies-breast',
  },
  {
    icon: Bone,
    title: 'Инородные тела в тазовой области',
    href: '/foreign-bodies-hip',
  },
];
