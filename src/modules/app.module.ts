import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot({ envFilePath: '.env.local', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
