import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export default class PrivateChats {
    @PrimaryGeneratedColumn()
    chatId: number;

    chatWithUser: User;

};
