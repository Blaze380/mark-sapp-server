import { MessageStatus } from "@/enums/MessageStatus.enum";
import { PrivateMessages } from "@/models/entities";
import { PrivateMessageRepository } from "@/repositories/privateMessage.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrivateMessageService {
    constructor (private readonly privateMessageRepository: PrivateMessageRepository) { }

    public savePrivateMessage (privateMessage: PrivateMessages): void {

        this.privateMessageRepository.savePrivateMessage(privateMessage);
    }
    public updatePrivateMessage (privateMessage: PrivateMessages): void {
        this.privateMessageRepository.updatePrivateMessage(privateMessage);
    }
    public updateMessageStatus (messageId: string, messageStatus: MessageStatus): void {
        this.privateMessageRepository.updateMessageStatus(messageId, messageStatus);
    }
}