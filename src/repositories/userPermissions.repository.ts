import { User, UserPermissions } from "@/models/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserPermissionsRepository {
    constructor (@InjectRepository(UserPermissions) private readonly userPermissionsRepository: Repository<UserPermissions>) {
    }

    public async saveUserPermissions (user: User): Promise<void> {
        const userPermissions: UserPermissions = new UserPermissions();
        userPermissions.user = user;
        await this.userPermissionsRepository.save(userPermissions);
    }
    public async updateUserPermissions (userPermissions: UserPermissions): Promise<void> {
        await this.userPermissionsRepository.save(userPermissions);
    }
    public async getUserPermissions (userId: string): Promise<UserPermissions> {
        const user: User = new User();
        user.id = userId;
        return await this.userPermissionsRepository.findOne({ where: { user: user } });
    }

}