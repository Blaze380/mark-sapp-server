import {  } from "@/models/chatWithUser.entity";
import { GroupChats } from "@/models/groupChats.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GroupChatsRepository{
    constructor (@InjectRepository(GroupChats) private readonly groupChatsRepository: Repository<GroupChats>) { }

     public async saveGroupChat (groupChat: GroupChats):Promise<void>{
        await this.groupChatsRepository.save(groupChat);
    }
}