import { Column, Entity, JoinColumn, ManyToOne, OneToMany,  OneToOne,  PrimaryGeneratedColumn } from "typeorm";
import {PrivateMessage,User} from "@/models/entities";
import { ChatWithUser } from "./chatWithUser.entity";

@Entity()
export  class PrivateChats {
    @PrimaryGeneratedColumn("uuid")
    chatId: string;

    @OneToOne(():typeof ChatWithUser=>(ChatWithUser),(chatWithUser:ChatWithUser):PrivateChats=>chatWithUser.privateChats)
    chatWithUser: ChatWithUser;

    @Column({ name: "user_id",type:"uuid" })
    userId: string;
    @ManyToOne((): typeof User => User, (user: User): PrivateChats[] => user.privateChats)
        @JoinColumn({name:"user_id"})
    user: User;

    @OneToMany(():typeof PrivateMessage=>PrivateMessage,(privateMessages:PrivateMessage):PrivateChats=>privateMessages.privateChat)
    privateMessages: PrivateMessage[];
};
