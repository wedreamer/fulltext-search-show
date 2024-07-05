// Import your models here

import getModels from '../getModels';
import { Book } from '../schema/book.schema';

export async function up(): Promise<void> {
  const { bookModel } = await getModels();
  // Write migration here
  // 新增两个实体
  const books: Book[] = [
    {
      name: 'name1',
      describe: 'describe1',
      breed: 'breed1',
    },
    {
      name: 'name2',
      describe: 'describe2',
      breed: 'breed2',
    },
  ];
  await bookModel.insertMany(books);
}

export async function down(): Promise<void> {
  const { bookModel } = await getModels();
  const books: Book[] = [
    {
      name: 'name1',
      describe: 'describe1',
      breed: 'breed1',
    },
    {
      name: 'name2',
      describe: 'describe2',
      breed: 'breed2',
    },
  ];
  await Promise.all(
    books.map(async (book) => await bookModel.findOneAndDelete(book)),
  );
}
