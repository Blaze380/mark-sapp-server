import { ChatWithUser, PrivateChats, PrivateMessage, } from "@/models/entities";
import { ChatWithUserRepository,PrivateChatsRepository, PrivateMessageRepository } from "@/repositories/repositories";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class PrivateChatsService{
    constructor (
        private readonly privateChatsRepository: PrivateChatsRepository,
        private readonly chatWithUserRepository: ChatWithUserRepository,
       private readonly  privateMessageRepository:PrivateMessageRepository) { }

    public saveUserPrivateChat ( privateChat: PrivateChats): void{
        this.privateChatsRepository.savePrivateChat(privateChat)
            .then((newPrivateChat: PrivateChats): void => {
                //Sets The Saved private chat with an ID
                this.saveChatWithUser(newPrivateChat);
                this.savePrivateMessages(newPrivateChat);
            });
    }

    private async saveChatWithUser (privateChat: PrivateChats): Promise<void>{
        const chatWithUser: ChatWithUser = privateChat.chatWithUser;
        chatWithUser.privateChats = privateChat
        await this.chatWithUserRepository.saveChatWithUser(chatWithUser);
    }
    private savePrivateMessages(privateChat:PrivateChats):void{
        const privatesMessages: PrivateMessage[] = privateChat.privateMessages;
        privatesMessages.forEach(async (privateMessage: PrivateMessage): Promise<void> => {
            await this.privateMessageRepository.savePrivateMessage(privateMessage)
        })
    }

    public updateUserPrivateChat ( privateChat: PrivateChats): void{
        this.privateChatsRepository.updatePrivateChat(privateChat);
    }


    public   getUserPrivateChats (userId: string,res:Response): void{
        this.privateChatsRepository.getUserPrivateChats(userId)
            .then((privateChats: PrivateChats[]): void => {
                res.status(HttpStatus.OK).json(privateChats);
            })
            .catch((error: any): void => {
                console.log("SOMETHING WENT WRONG! \nERROR: " + error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("An error Occurred!")
            })
    }
}