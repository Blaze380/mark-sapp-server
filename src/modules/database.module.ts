import { Module } from "@nestjs/common";
import { AuthenticatedUsers, GroupChats, PrivateChats, PrivateMessages, User, UsersOnline } from '@/models/entities';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.TYPEORM_SYNCHRONIZE_DB === "true" ? true : false,
      logging: "all",
      entities: [User, PrivateMessages, PrivateChats, AuthenticatedUsers, UsersOnline, GroupChats,],
    }),
  ]
})
export class DataBaseModule {

}