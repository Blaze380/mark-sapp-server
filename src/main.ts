import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap (): Promise<void> {
  const appPort: number = parseInt(process.env.APP_PORT);
  const app:INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(appPort);
  console.log(`[APP] - Server Started on port ${appPort}`)
}
bootstrap();
