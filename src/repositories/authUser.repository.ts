import { AuthenticatedUsers } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthenticatedUsersRepository {

    constructor (@InjectRepository(AuthenticatedUsers) private readonly authenticatedUsersRepository: Repository<AuthenticatedUsers>) { }

    public saveAuthenticatedUser (phoneNumber: string): void {
        this.authenticatedUsersRepository.save({ phoneNumber: phoneNumber, isVerified: true });
    }

    public async isUserAuthenticated (phoneNumber: string): Promise<boolean> {
        let authenticatedUser: AuthenticatedUsers;
        try {
            authenticatedUser = await this.authenticatedUsersRepository.findOne({
                where: {
                    phoneNumber: phoneNumber
                }
            });
            if (!authenticatedUser) {
                return false;
            }
        } catch (error) {
            return false;
        }
        return authenticatedUser.isVerified;
    }
}