import { User } from "@/models/user.model";
import { Repository } from "typeorm";

export class UserRepository{
    constructor (private as: Repository<User>) { }

    asa (): void{

    }
}