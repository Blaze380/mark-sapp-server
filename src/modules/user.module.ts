import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/services/services';
import { UserController } from '@/controllers/controllers';
import { AuthUser, ChatWithUser, GroupChats, PrivateChats, PrivateMessage, User } from '@/models/entities';
import { AuthUserRepository, ChatWithUserRepository, GroupChatsRepository, PrivateChatsRepository, PrivateMessageRepository, UserRepository } from '@/repositories/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User,AuthUser,ChatWithUser,PrivateChats,PrivateMessage,GroupChats])],
  providers: [UserService,UserRepository,AuthUserRepository,PrivateChatsRepository,PrivateMessageRepository,ChatWithUserRepository,GroupChatsRepository],
  controllers: [UserController],
})
export class UserModule {}