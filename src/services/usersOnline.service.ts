import { UsersOnline } from "@/models/entities";
import { UsersOnlineRepository } from "@/repositories/repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersOnlineService {
    constructor (private readonly usersOnlineRepository: UsersOnlineRepository) { }

    public loginUserAndSetOnline (user: UsersOnline): void {
        this.usersOnlineRepository.setThisUserOnline(user);
    }
    public logoutUserAndSetOffline (user: UsersOnline): void {
        this.usersOnlineRepository.setThisUserOffline(user);
    }

}