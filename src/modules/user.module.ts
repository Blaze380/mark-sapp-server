import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/services/services';
import { UserController } from '@/controllers/controllers';
import { AuthenticatedUsers, GroupChats, User, UserPermissions } from '@/models/entities';
import { AuthenticatedUsersRepository, GroupChatsRepository, UserRepository, UserPermissionsRepository } from '@/repositories/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthenticatedUsers, GroupChats, UserPermissions])],
  providers: [UserService, UserRepository, AuthenticatedUsersRepository, GroupChatsRepository, UserPermissionsRepository],
  controllers: [UserController],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer):void {
  //   consumer
  //     .apply(HttpExceptionFilt er)
  //     .forRoutes(UserService);
  // }

}