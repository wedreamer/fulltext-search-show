import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { MongoModule } from '@app/mongo';
import { Book, BookSchema } from '@app/mongo/schema/book.schema';
import { MongooseModule } from '@nestjs/mongoose';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
