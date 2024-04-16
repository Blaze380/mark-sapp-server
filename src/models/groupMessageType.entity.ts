import { MessageTypes } from "@/enums/enums";
import { Column, OneToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GroupMessages } from "@/models/entities";

@Entity()
export class GroupMessageType {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: MessageTypes, })
    messageType: MessageTypes;

    @Column({ nullable: true })
    mediaPath: string;

    @Column({ type: "text" })
    text: string;

    @OneToOne((): typeof GroupMessages => GroupMessages, (groupMessages: GroupMessages): GroupMessageType => groupMessages.messageType)
    groupMessage: GroupMessages;
}