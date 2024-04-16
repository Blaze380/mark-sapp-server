import { MessageTypes } from "@/enums/enums";
import { Column, OneToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PrivateMessages } from "@/models/entities";

@Entity()
export class MessageType {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: MessageTypes, })
    messageType: MessageTypes;

    @Column({ nullable: true })
    mediaPath: string;

    @Column({ type: "text" })
    text: string;

    @OneToOne((): typeof PrivateMessages => PrivateMessages, (privateMessages: PrivateMessages): MessageType => privateMessages.messageType)
    privateMessage: PrivateMessages;
}