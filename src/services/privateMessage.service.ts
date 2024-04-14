import { MessageStatus } from "@/enums/MessageStatus.emun";
import { PrivateChats, PrivateMessage } from "@/models/entities";
import { PrivateMessageRepository } from "@/repositories/privateMessage.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrivateMessageService{
    constructor (private readonly privateMessageRepository: PrivateMessageRepository) { }

    public  savePrivateMessage (privateChatId: string, privateMessage:PrivateMessage):void{
        const privateChat: PrivateChats = new PrivateChats();
        privateChat.chatId = privateChatId;
        this.privateMessageRepository.savePrivateMessage(privateChat, privateMessage);
    }
    public  updatePrivateMessage ( privateMessage:PrivateMessage):void{
        this.privateMessageRepository.updatePrivateMessage(privateMessage);
    }
    public  updateMessageStatus ( messageId:string,messageStatus:MessageStatus):void{
        this.privateMessageRepository.updateMessageStatus(messageId, messageStatus);
    }
}