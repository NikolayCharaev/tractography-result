import type { LucideIcon } from 'lucide-react';
import { Atom } from 'lucide-react';

export type AppNavigationItem = {
  icon?: LucideIcon;
  title: string;
  href: string;
  tooltip?: boolean;
};

export const appNavigation: AppNavigationItem[] = [
  {
    icon: Atom,
    title: 'Трактография (38 задача)',
    href: '/',
  },
  {
    icon: Atom,
    title: 'Сегментация вен лёгких ',
    href: '/pulmonary-vein-segmentation',
  },
  {
    icon: Atom,
    title: 'Сегментация молочной железы',
    href: '/breast-segmentation',
  },
  {
    icon: Atom,
    title: 'Предстательная железа (50 задача)',
    href: '/prostate',
  },

  {
    icon: Atom,
    title: 'Инородные тела в грудной клетке',
    href: '/foreign-bodies-breast',
  },
  {
    icon: Atom,
    title: 'Инородные тела в тазовой области',
    href: '/foreign-bodies-hip',
  },
];
