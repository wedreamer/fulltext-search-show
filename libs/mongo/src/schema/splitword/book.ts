import { cut } from '@node-rs/jieba';
import { Book } from '../book.schema';

export const runSplitBookFields: (keyof Omit<Book, 't'>)[] = [
  'breed',
  'name',
  'describe',
];

export const splitBookWord = (book: Book): string => {
  const str = runSplitBookFields.map((key) => book[key]).join(' ');
  const t = cut(str, false).join(' ');
  return t;
};
