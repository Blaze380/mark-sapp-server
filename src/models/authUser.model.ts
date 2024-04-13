import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export  class AuthUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    phoneNumber: string;

    @Column({default:false})
    isVerified:boolean
};
