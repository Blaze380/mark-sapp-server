import { PrivateChatsRepository, PrivateMessageRepository } from "@/repositories/repositories";
import { Module } from "@nestjs/common";
import { PrivateChatsController } from '@/controllers/controllers';
import { PrivateChats, PrivateMessages } from "@/models/entities";
import { PrivateChatsService } from '@/services/services';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forFeature([PrivateChats, PrivateMessages])
    ],
    providers: [PrivateChatsRepository, PrivateChatsService, PrivateMessageRepository],
    controllers: [PrivateChatsController]
})
export class PrivateChatsModule {

}