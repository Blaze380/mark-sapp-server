import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap():Promise<void> {
  const app:INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
