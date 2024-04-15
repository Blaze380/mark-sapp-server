import {  } from "@/models/chatWithUser.entity";
import { User } from "@/models/entities";
import { GroupChats } from "@/models/groupChats.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GroupChatsRepository{
    constructor (@InjectRepository(GroupChats) private readonly groupChatsRepository: Repository<GroupChats>) { }

     public async updateGroupChat (groupChat: GroupChats):Promise<void>{
        await this.groupChatsRepository.save(groupChat);
    }
    public async saveGroupChat (user: User, groupChat: GroupChats): Promise<void>{
        if (user) {
            if (user.id) {
             }
         }
        await this.groupChatsRepository.save(groupChat);
    }
}