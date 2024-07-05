import { cut } from '@node-rs/jieba';
import { Cat } from '../cat.schema';

export const runSplitCatFields: (keyof Omit<Cat, 't'>)[] = [
  'breed',
  'name',
  'age',
];

export const splitCatWord = (cat: Cat): string => {
  const str = runSplitCatFields.map((key) => cat[key]).join(' ');
  const t = cut(str, false).join(' ');
  return t;
};
