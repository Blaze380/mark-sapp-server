import { User } from "@/models/entities";
import { PrivateChats } from "@/models/privateChats.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PrivateChatsRepository {
    constructor (@InjectRepository(PrivateChats) private readonly privateChatsRepository: Repository<PrivateChats>) { }


    public async savePrivateChat (privateChat: PrivateChats): Promise<PrivateChats> {
        return await this.privateChatsRepository.save(privateChat);
    }
    public async updatePrivateChat (privateChat: PrivateChats): Promise<void> {
        privateChat = await this.privateChatsRepository.findOneBy(privateChat);
        await this.privateChatsRepository.save(privateChat);
    }
    public async getUserPrivateChats (userId: string): Promise<Array<PrivateChats>> {
        const user: User = new User();
        user.id = userId;
        return await this.privateChatsRepository.find(
            {
                where: {
                    firstUser: user,
                    secondUser: user,
                },
                relations: {
                    privateMessages: true,
                },
                select: {
                    chatId: true,
                    privateMessages: {
                        sender: {
                            id: true
                        },
                        messageType: {
                            text: true
                        },
                        messageStatus: true,
                        dateSent: true
                    },

                }
            });
    }
}