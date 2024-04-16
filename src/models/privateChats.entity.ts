import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrivateMessages, User } from "@/models/entities";

@Entity()
export class PrivateChats {
    @PrimaryGeneratedColumn("uuid")
    chatId: string;

    @ManyToOne((): typeof User => User, (user: User): PrivateChats[] => user.firstUserChats)
    @JoinColumn({ name: "first_user_id" })
    firstUser: User;


    @ManyToOne((): typeof User => User, (user: User): PrivateChats[] => user.secondUserChats)
    @JoinColumn({ name: "second_user_id" })
    secondUser: User;

    @OneToMany((): typeof PrivateMessages => PrivateMessages, (privateMessages: PrivateMessages): PrivateChats => privateMessages.privateChat)
    privateMessages: PrivateMessages[];
};
