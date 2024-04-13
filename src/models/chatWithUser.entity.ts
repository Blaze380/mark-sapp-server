import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateChats } from "./privateChats.model";

@Entity()
export class ChatWithUser{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    userName: string;
    @Column()
    profilePhoto: string;
    @Column()
    phoneNumber: string;

    @OneToOne((): typeof PrivateChats => PrivateChats, (privateChats: PrivateChats): ChatWithUser => privateChats.chatWithUser)
    @JoinColumn({name:"private_chats_id"})
    privateChats: PrivateChats;

}