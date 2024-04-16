import { User } from "@/models/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async findUserById (id: string): Promise<User> {
        const user = new User();
        user.id = id;
        return await this.userRepository.findOneBy(user);
    }


    public async saveUser (user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
    public async updateUser (user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async existsByUserName (userName: string): Promise<boolean> {
        return await this.userRepository.findOne({
            where: {
                userName: userName
            }
        })
            .then((user: User): boolean => {
                if (user) {
                    return true;
                } else {
                    return false;
                }

            });
        // .catch((error: any): void => {
        //     console.log("An error ocurred while verifying userName\n" + error);
        // })
    }
    public async existsByPhoneNumber (phoneNumber: string): Promise<boolean> {
        return await this.userRepository.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        })
            .then((user: User): boolean => {
                if (user) {
                    return true;
                } else {
                    return false;
                }

            });
        // .catch((error: any): void => {
        //     console.log("An error ocurred while verifying userName\n" + error);
        // })
    }

    public async deleteUserById (userId: string): Promise<void> {
        const user = new User();
        user.id = userId;
        this.userRepository.delete(user);
    }




}