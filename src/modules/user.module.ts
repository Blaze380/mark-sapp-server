import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/services/services';
import { UserController } from '@/controllers/controllers';
import { AuthUser, ChatWithUser, GroupChats,   User } from '@/models/entities';
import { AuthUserRepository, ChatWithUserRepository, GroupChatsRepository,  UserRepository } from '@/repositories/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthUser, ChatWithUser,  GroupChats])],
  providers: [UserService,UserRepository,AuthUserRepository,ChatWithUserRepository,GroupChatsRepository],
  controllers: [UserController],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer):void {
  //   consumer
  //     .apply(HttpExceptionFilter)
  //     .forRoutes(UserService);
  // }

}