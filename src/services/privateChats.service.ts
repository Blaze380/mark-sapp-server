import { PrivateChats, User } from "@/models/entities";
import { PrivateChatsRepository } from "@/repositories/privateChats.repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class PrivateChatsService{
    constructor (private readonly privateChatsRepository: PrivateChatsRepository) { }

    public saveUserPrivateChat (user: User, privateChat: PrivateChats): void{
        this.privateChatsRepository.savePrivateChat(user, privateChat);
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
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("An error Ocourred!")
            })
    }
}