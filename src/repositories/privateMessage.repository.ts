import { MessageStatus } from "@/enums/MessageStatus.enum";
import { PrivateChats, PrivateMessages } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PrivateMessageRepository {
    constructor (@InjectRepository(PrivateMessages) private readonly privateMessagesRepository: Repository<PrivateMessages>) { }

    public async savePrivateMessage (privateMessage: PrivateMessages): Promise<void> {
        if (privateMessage.privateChat) {
            if (privateMessage.privateChat.chatId) {
                await this.privateMessagesRepository.save(privateMessage);
            }
        }
    }
    public async updatePrivateMessage (privateMessage: PrivateMessages): Promise<void> {
        await this.privateMessagesRepository.save(privateMessage);
    }
    public getUserPrivateChatMessages (privateChatId: string): Promise<Array<PrivateMessages>> {

        const privateChat: PrivateChats = new PrivateChats();
        privateChat.chatId = privateChatId;
        return this.privateMessagesRepository.find({
            where: { privateChat },
            relations: {
                sender: true,
                messageType: true,
            },
            select: {
                id: true,
                sender: {
                    id: true,
                },
                messageType: {
                    text: true,
                    messageType: true,
                },
                dateSent: true,
                messageStatus: true,
            }
        })
    }

    /**
     * Se lançar exceção por causa de UUID, envia um objeto messageStatus com id dentro
     */
    public async updateMessageStatus (messageId: string, messageStatus: MessageStatus): Promise<void> {
        const message: PrivateMessages = await this.privateMessagesRepository.findOne({ where: { id: messageId } });
        message.messageStatus = messageStatus;
        await this.privateMessagesRepository.save(message);
    }
}