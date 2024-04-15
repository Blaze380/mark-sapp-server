import { ChatWithUserRepository, PrivateChatsRepository, PrivateMessageRepository } from "@/repositories/repositories";
import { Module } from "@nestjs/common";
import { PrivateChatsController } from '@/controllers/controllers';
import { ChatWithUser, PrivateChats, PrivateMessage } from "@/models/entities";
import { PrivateChatsService } from '@/services/services';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forFeature([PrivateChats,ChatWithUser,PrivateMessage])
    ],
    providers: [PrivateChatsRepository,PrivateChatsService,ChatWithUserRepository,PrivateMessageRepository],
    controllers: [PrivateChatsController]
})
export class PrivateChatsModule{

}