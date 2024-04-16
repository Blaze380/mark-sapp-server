import { AuthenticatedUsers, GroupChats, PrivateChats, PrivateMessages, User, UsersOnline } from '@/models/entities';
import { AppService } from '@/services/services';
import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/controllers/controllers';
import { UserModule } from './user.module';
import { MulterModule } from '@nestjs/platform-express';
import { PrivateChatsModule } from './privateChats.module';
import { PrivateMessageModule } from './privateMessage.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local', isGlobal: true }),
    MulterModule.register({ dest: "./" }),
    GatewayModule,
    UserModule,
    PrivateChatsModule,
    PrivateMessageModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.TYPEORM_SYNCHRONIZE_DB === "true" ? true : false,
      logging: "all",
      entities: [User, PrivateMessages, PrivateChats, AuthenticatedUsers, UsersOnline, GroupChats,],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60d", }
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
