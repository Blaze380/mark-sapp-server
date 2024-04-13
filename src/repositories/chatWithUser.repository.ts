import { ChatWithUser } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ChatWithUserRepository{
    constructor(@InjectRepository(ChatWithUser) private readonly chatWithUserRepository:Repository<ChatWithUser>){}

    public async saveChatWithUser (chatWithUser: ChatWithUser): Promise<void>{
        await this.chatWithUserRepository.save(chatWithUser);
    }
}