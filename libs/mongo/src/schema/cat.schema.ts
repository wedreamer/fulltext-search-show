import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

export const catCollName = 'cats';

@Schema()
export class Cat {
  @Prop({ required: true, type: String })
  name!: string;

  @Prop({ required: true, type: Number })
  age!: number;

  @Prop({ required: true, type: String })
  breed!: string;

  // 应用不能新增, 改, 也不能查
  // t pipeline
  @Prop({ required: true, type: String, index: 'text' })
  readonly t?: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
