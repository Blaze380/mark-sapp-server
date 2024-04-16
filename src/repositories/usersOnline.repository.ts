import { UsersOnline } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersOnlineRepository {
    constructor (@InjectRepository(UsersOnline) private readonly usersOnlineRepository: Repository<UsersOnline>) { }

    public async setThisUserOnline (user: UsersOnline): Promise<void> {
        await this.usersOnlineRepository.save(user);
        console.log("Expect this be printed after the log up");
    }

    public async setThisUserOffline (user: UsersOnline): Promise<void> {
        await this.usersOnlineRepository.delete(user);
    }
}