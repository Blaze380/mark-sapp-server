import { UsersLogged } from "@/models/usersLogged.model";
import { UsersLoggedRepository } from "@/repositories/repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersLoggedService{
    constructor (private readonly usersLoggedRepository: UsersLoggedRepository) { }

    public loginUserAndSetOnline (user: UsersLogged): void{
        this.usersLoggedRepository.setThisUserOnline(user);
    }
    public logoutUserAndSetOffline (user: UsersLogged): void{
        this.usersLoggedRepository.setThisUserOffline(user);
    }

}