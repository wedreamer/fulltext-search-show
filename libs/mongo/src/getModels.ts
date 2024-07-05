import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { AppModule } from 'apps/full-search-show/src/app.module';
import mongoose, { Connection } from 'mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { Cat, CatSchema } from './schema/cat.schema';

const getModels = async () => {
  const app = await NestFactory.create(AppModule);
  const connect = app.get<Connection>(getConnectionToken());

  const bookModel = connect.model(Book.name, BookSchema);
  const catModel = connect.model(Cat.name, CatSchema);

  return {
    mongoose,
    bookModel,
    catModel,
  };
};

export default getModels;
