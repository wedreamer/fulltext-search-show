import { Book, bookCollName, BookSchema } from '../book.schema';
import { runSplitFields, splitBookWord } from './book';
import { SchemaFactory } from '@nestjs/mongoose';

type watchSchems = Book;
type collname = string;

const splitwordInfo: Record<
  collname,
  {
    // 更强类型的约束
    watchFiles: (keyof watchSchems)[];
    splitword: (model: watchSchems) => string;
    modelName: string;
    schema: ReturnType<
      // TODO: 不严谨的类型
      typeof SchemaFactory.createForClass<watchSchems>
    >;
  }
> = {
  [bookCollName]: {
    watchFiles: runSplitFields,
    splitword: splitBookWord,
    modelName: Book.name,
    schema: BookSchema,
  },
};

export default splitwordInfo;
