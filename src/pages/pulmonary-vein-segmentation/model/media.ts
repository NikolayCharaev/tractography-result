const base = '/pulmonary-vein-segmentation';

export type PulmonaryVeinMediaItem =
  | {
      kind: 'image';
      src: string;
      title: string;
    }
  | {
      kind: 'video';
      src: string;
      title: string;
    };

export const pulmonaryVeinMedia: PulmonaryVeinMediaItem[] = [
  {
    kind: 'image',
    src: `${base}/vein.png`,
    title: 'Статичная визуализация',
  },
  {
    kind: 'video',
    src: `${base}/1.gif.mp4`,
    title: 'Динамика 1',
  },
  {
    kind: 'video',
    src: `${base}/2.mp4`,
    title: 'Динамика 2',
  },
  {
    kind: 'video',
    src: `${base}/3.mp4`,
    title: 'Динамика 3',
  },
];
