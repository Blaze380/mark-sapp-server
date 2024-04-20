import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { MessageTypes } from "@/enums/MessageTypes.enum";

@Entity()
export class IncomingMessages {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    messageId: string;

    @Column({ type: "uuid" })
    chatId: string;

    @ManyToOne((): typeof User => User, (user: User): IncomingMessages[] => user.incomingMessages)
    @JoinColumn({ name: "sender_id" })
    sender: User;

    @Column({ type: "enum", enum: MessageTypes, })
    messageType: MessageTypes;

    @Column({ nullable: true })
    mediaPath: string;

    @Column({ type: "text" })
    text: string;
    @Column()
    dateSent: Date;




}