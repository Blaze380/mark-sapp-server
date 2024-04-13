import { AppService } from '@/services/services';
import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthUser, GroupChats, PrivateChats, PrivateMessage, User, UsersLogged } from '@/models/entities';
import { AppController} from '@/controllers/controllers';
import { UserModule } from './user.module';



@Module({
  imports: [
    UserModule,
    GatewayModule,
    ConfigModule.forRoot({ envFilePath: '.env.local', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
       url: process.env.DB_URL,
      synchronize:process.env.TYPEORM_SYNCHRONIZE_DB==="true"? true :false,
      logging: "all",
      entities: [User,PrivateMessage,PrivateChats,AuthUser,UsersLogged,GroupChats],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
