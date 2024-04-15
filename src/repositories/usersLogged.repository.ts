import { UsersLogged } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersLoggedRepository{
    constructor (@InjectRepository(UsersLogged) private readonly usersLoggerRepository: Repository<UsersLogged>) { }

    public async setThisUserOnline(user:UsersLogged):Promise<void>{
        await this.usersLoggerRepository.save(user);
        console.log("Expect this be printed after the log up");
    }

    public async setThisUserOffline (user: UsersLogged): Promise<void>{
        await this.usersLoggerRepository.delete(user);
    }
}