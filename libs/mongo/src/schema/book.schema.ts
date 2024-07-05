import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true, type: String })
  name!: string;

  @Prop({ required: true, type: String })
  describe!: string;

  @Prop({ required: true, type: String })
  breed!: string;

  // 应用不能新增, 改, 也不能查
  // t pipeline
  @Prop({ required: true, type: String })
  readonly t?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
