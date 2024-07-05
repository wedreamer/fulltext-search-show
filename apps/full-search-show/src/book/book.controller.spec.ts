import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { MongoModule } from '@app/mongo';
import { Book, BookSchema } from '@app/mongo/schema/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
      providers: [BookService],
      controllers: [BookController],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
