import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserPermissions {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    canAnyOneSeeMeOnline: boolean;

    canAnyOneSeeMyProfilePhoto: boolean;

    canAnyOneSeeMyBiography: boolean;

    canAnyOneSeeReadMessage: boolean;

    @OneToOne((): typeof User => User, (user: User): UserPermissions => user.userPermissions)
    @JoinColumn({ name: "user_id" })
    user: User;

}