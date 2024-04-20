import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '@/exceptions/exceptions';


async function bootstrap (): Promise<void> {
  const appPort: number = parseInt(process.env.APP_PORT);
  const app: INestApplication<any> = await NestFactory.create(AppModule, { logger: ["warn", 'debug', 'error', 'verbose', 'log', 'fatal'] });
  await app.listen(appPort);
  app.useGlobalFilters(new HttpExceptionFilter());
  console.log(`[APP] - Server Started on port ${ appPort }`)
}
bootstrap();
