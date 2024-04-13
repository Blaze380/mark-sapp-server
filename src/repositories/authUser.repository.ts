import { AuthUser } from "@/models/authUser.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthUserRepository{

    constructor (@InjectRepository(AuthUser) private readonly authRepository: Repository<AuthUser>) { }

    public saveAuthenticatedUser (phoneNumber: string): void{
        this.authRepository.save({ phoneNumber: phoneNumber, isVerified: true });
    }

    public async isUserAuthenticated (phoneNumber: string): Promise<boolean>{
        let authUser: AuthUser;
            try {
                 authUser = await this.authRepository.findOne({
                    where: {
                        phoneNumber: phoneNumber
                    }
                 });
                if (!authUser) {
                    return false;
                }
            } catch (error) {
                return false;
            }
        return authUser.isVerified;
    }
}