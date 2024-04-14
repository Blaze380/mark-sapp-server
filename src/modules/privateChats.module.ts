import { PrivateChatsRepository } from "@/repositories/repositories";
import { Module } from "@nestjs/common";
import { PrivateChatsController } from '@/controllers/controllers';
import { PrivateChats } from "@/models/entities";
import { PrivateChatsService } from '@/services/services';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forFeature([PrivateChats])
    ],
    providers: [PrivateChatsRepository,PrivateChatsService],
    controllers: [PrivateChatsController]
})
export class PrivateChatsModule{

}