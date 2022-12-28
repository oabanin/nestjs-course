import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'tests',
  password: 'tests',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'bad', password: 'bad' })
      .expect(401, {
        statusCode: 401,
        message: 'User with this email does not exist',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'bad' })
      .expect(401, {
        statusCode: 401,
        message: 'WRONG password',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
