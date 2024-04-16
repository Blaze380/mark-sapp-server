import { PrivateChats, PrivateMessages, } from "@/models/entities";
import { PrivateChatsRepository, PrivateMessageRepository } from "@/repositories/repositories";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class PrivateChatsService {
    constructor (
        private readonly privateChatsRepository: PrivateChatsRepository,
        private readonly privateMessageRepository: PrivateMessageRepository) { }

    public saveUserPrivateChat (privateChat: PrivateChats): void {
        this.privateChatsRepository.savePrivateChat(privateChat)
            .then((newPrivateChat: PrivateChats): void => {
                this.savePrivateMessages(newPrivateChat);
            });
    }

    private savePrivateMessages (privateChat: PrivateChats): void {
        const privatesMessages: PrivateMessages[] = privateChat.privateMessages;
        privatesMessages.forEach(async (privateMessage: PrivateMessages): Promise<void> => {
            await this.privateMessageRepository.savePrivateMessage(privateMessage)
        })
    }

    public updateUserPrivateChat (privateChat: PrivateChats): void {
        this.privateChatsRepository.updatePrivateChat(privateChat);
    }


    public getUserPrivateChats (userId: string, res: Response): void {
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