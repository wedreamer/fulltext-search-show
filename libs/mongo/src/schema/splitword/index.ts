import { Book, bookCollName, BookSchema } from '../book.schema';
import { Cat, catCollName, CatSchema } from '../cat.schema';
import { runSplitBookFields, splitBookWord } from './book';
import { SchemaFactory } from '@nestjs/mongoose';
import { runSplitCatFields, splitCatWord } from './cat';

// TODO:

type watchFilesType = (keyof Book)[] | (keyof Cat)[];
type splitwordType = ((model: Book) => string) | ((model: Cat) => string);
type watchSchemClass =
  | ReturnType<
      // TODO: 不严谨的类型
      typeof SchemaFactory.createForClass<Book>
    >
  | ReturnType<
      // TODO: 不严谨的类型
      typeof SchemaFactory.createForClass<Cat>
    >;
type collname = string;

const splitwordInfo: Record<
  collname,
  {
    // 更强类型的约束
    watchFiles: watchFilesType;
    splitword: splitwordType;
    modelName: string;
    schema: watchSchemClass;
  }
> = {
  [bookCollName]: {
    watchFiles: runSplitBookFields,
    splitword: splitBookWord,
    modelName: Book.name,
    schema: BookSchema,
  },
  [catCollName]: {
    watchFiles: runSplitCatFields,
    splitword: splitCatWord,
    modelName: Cat.name,
    schema: CatSchema,
  },
};

export default splitwordInfo;
