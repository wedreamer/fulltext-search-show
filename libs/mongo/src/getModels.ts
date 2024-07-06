import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { Cat, CatSchema } from './schema/cat.schema';
import { MongoModule } from './mongo.module';

const getModels = async () => {
  const app = await NestFactory.create(MongoModule);
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
