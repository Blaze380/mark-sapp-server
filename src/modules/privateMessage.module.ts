import { PrivateMessageRepository } from "@/repositories/repositories";
import { Module } from "@nestjs/common";
import { privateMessageController } from '@/controllers/controllers';
import { PrivateMessage } from "@/models/entities";
import { PrivateMessageService } from '@/services/services';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([PrivateMessage])
    ],
    providers: [PrivateMessageRepository,PrivateMessageService],
    controllers: [privateMessageController]
})
export class PrivateMessageModule{

}