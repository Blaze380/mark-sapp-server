import { Module } from "@nestjs/common";
import {AuthUser, ChatWithUser, GroupChats, PrivateChats, PrivateMessage, User, UsersLogged } from '@/models/entities';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize:process.env.TYPEORM_SYNCHRONIZE_DB==="true"? true :false,
      logging: "all",
      entities: [User,PrivateMessage,PrivateChats,AuthUser,UsersLogged,GroupChats,ChatWithUser],
    }),
    ]
})
export class DataBaseModule{

}