import { MessageStatus } from "@/enums/MessageStatus.emun";
import { PrivateMessage } from "@/models/privateMessage.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PrivateMessageRepository{
    constructor (@InjectRepository(PrivateMessage)private readonly privateMessageRepository: Repository<PrivateMessage>) { }

    public async savePrivateMessage(privateMessage:PrivateMessage):Promise<void>{
        await this.privateMessageRepository.save(privateMessage);
    }
    public getUserPrivateChatMessages (privateChatId: string): Promise<Array<PrivateMessage>>{
        return this.privateMessageRepository.find({
            where: { privateChatId:privateChatId },
            relations: {
                receiver: true,
                sender:true,
            },
            select: {
                id: true,
                sender: {
                    id:true,
                },
                receiver: {
                    id:true,
                },
                message: true,
                dateSent: true,
                messageStatus:true
            }
        })
    }

    public async updateMessageStatus (messageId: string, messageStatus: MessageStatus): Promise<void>{
        const message: PrivateMessage = await this.privateMessageRepository.findOne({ where: { id: messageId } });
        message.messageStatus = messageStatus;
        await this.privateMessageRepository.save(message);
    }
}