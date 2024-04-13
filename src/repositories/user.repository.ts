import { User } from "@/models/user.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository  {
constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    async findUserById(userId:string):Promise<User> {
         return await this.userRepository.findOne({
              where: {
                  id:userId
              },
             select: {
                 id: true,
                 userName: true,
                 phoneNumber: true,
                 profilePhoto:true,
              }
          });
    }
    async findUserByIdWithRelation(userId:string):Promise<User> {
         return await this.userRepository.findOne({
              where: {
                  id:userId
             },
             relations: {
                 groupChats: true,
                 privateChats: true,
             }
          });
    }
    public  async  saveUser (user: User): Promise<User>{
      return  await this.userRepository.save(user);
    }

    public async existsByUserName (userName: string): Promise<boolean>{
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
            //     console.log("An error ocoured while verifying userName\n" + error);
            // })
    }
    public async existsByPhoneNumber (phoneNumber: string): Promise<boolean>{
        return await this.userRepository.findOne({
            where: {
                phoneNumber:phoneNumber
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
            //     console.log("An error ocoured while verifying userName\n" + error);
            // })
    }

    public async deleteUserById (userId: string): Promise<void>{
        this.userRepository.delete({ id: userId });
    }




}