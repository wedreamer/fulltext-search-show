// Import your models here

import getModels from '../getModels';
import { Cat } from '../schema/cat.schema';
import { splitBookWord } from '../schema/splitword/book';

export async function up(): Promise<void> {
  const { catModel } = await getModels();
  // Write migration here
  // 新增两个实体
  const cats: Cat[] = [
    {
      name: 'name1 cat',
      age: 10,
      breed: 'breed2 cta cat',
    },
    {
      name: 'name2 cat cat',
      breed: 'breed2 cat',
      age: 50,
    },
  ];
  await catModel.insertMany(
    cats.map((book) => ({ ...book, t: splitBookWord(book) })),
  );
}

export async function down(): Promise<void> {
  const { catModel } = await getModels();
  const cats: Cat[] = [
    // name1describe1 name1 describe1
    {
      name: 'name1 cat',
      age: 10,
      breed: 'breed2 cta cat',
    },
    {
      name: 'name2 cat cat',
      breed: 'breed2 cat',
      age: 50,
    },
  ];
  await Promise.all(
    cats.map(async (book) => await catModel.findOneAndDelete(book)),
  );
}
