import { User } from "@/models/entities";
import { PrivateChats } from "@/models/privateChats.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PrivateChatsRepository{
    constructor (@InjectRepository(PrivateChats) private readonly privateChatsRepository: Repository<PrivateChats>) { }


    public async savePrivateChat (user: User, privateChat: PrivateChats): Promise<void>{
        if (user) {
            if (user.id) {
                privateChat.user = user;
             await   this.privateChatsRepository.save(privateChat);
            }
        }
    }
    public async updatePrivateChat (privateChat: PrivateChats): Promise<void>{
        privateChat = await this.privateChatsRepository.findOneBy(privateChat);
      await  this.privateChatsRepository.save(privateChat);
    }
    public  async getUserPrivateChats (userId: string): Promise<Array<PrivateChats>> {
        const user: User = new User();
        user.id = userId;
        return await this.privateChatsRepository.find(
            {
                where: { user },
                relations: {
                    privateMessages: true,
                    chatWithUser: true
                },
                select: {
                    chatId: true,
                    chatWithUser: {
                        id: true,
                        profilePhoto: true,
                        userName: true,
                        phoneNumber: true
                    },
                    privateMessages: {
                        sender: {
                            id: true
                        },
                        messageStatus: true,
                        message: true,
                        dateSent: true
                    },

                }
            });
    }
}