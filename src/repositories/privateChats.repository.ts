import { PrivateChats } from "@/models/privateChats.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PrivateChatsRepository{
    constructor (@InjectRepository(PrivateChats) private readonly privateChatsRepository: Repository<PrivateChats>) { }


    public savePrivateChat (privateChat: PrivateChats): void{
        this.privateChatsRepository.save(privateChat);
    }
    public async getUserPrivateChats (userId: string): Promise<Array<PrivateChats>>{
        return this.privateChatsRepository.find(
            {
                where: {
                    userId: userId,
                },
                relations: {
                    privateMessages: true,
                    chatWithUser:true
                },
                select: {
                    chatId: true,
                     chatWithUser: {
                         id: true,
                         profilePhoto: true,
                         userName:true,
                         phoneNumber:true
                     },
                    privateMessages: {
                        sender: {
                            id: true
                        },
                        messageStatus:true,
                        message: true,
                        dateSent:true
                    },

                }
            });
    }
}