import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/:id (GET) :id', async () => {
    // objectId
    const id = '66881121790701f990ff51e9';
    const res = await request(app.getHttpServer())
      .get(`/book/${id}`)
      .expect(200);
    expect(res.body._id).toEqual(id);
  });
});
