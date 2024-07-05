import { Book } from '@app/mongo/schema/book.schema';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('book')
export class BookController {
  constructor(@InjectModel(Book.name) private model: Model<Book>) {}

  // query search
  @Get('query')
  async query(@Query('text') text: string): Promise<Book[]> {
    if (text) throw new BadRequestException();
    const res = await this.model.find({ $text: { $search: text } });
    return res;
  }

  // find id
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    const res = await this.model.findById(id);
    if (!res) throw new BadRequestException();
    return res;
  }
}
