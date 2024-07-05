import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/full-text')],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
