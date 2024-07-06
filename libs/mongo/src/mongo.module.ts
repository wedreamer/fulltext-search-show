import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { Cat, CatSchema } from './schema/cat.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/full-text'),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
