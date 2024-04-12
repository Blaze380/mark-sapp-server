import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export default class PrivateMessage {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: string;

    sender: User;
    receiver: User;
    message: string;
    dateSent: string;
};
