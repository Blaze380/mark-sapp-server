import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupChats, User, GroupMessageType } from "@/models/entities";
import { MessageStatus } from "@/enums/MessageStatus.enum";

@Entity()
export class GroupMessages {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((): typeof User => User, (user: User): GroupMessages[] => user.groupMessages)
    @JoinColumn({ name: "sender_id" })
    sender: User;

    @OneToOne((): typeof GroupMessageType => GroupMessageType, (messageType: GroupMessageType): GroupMessages => messageType.groupMessage)
    @JoinColumn({ name: "message_type_id" })
    messageType: GroupMessageType;
    @Column()
    dateSent: Date;

    @Column({ type: "enum", enum: MessageStatus, default: MessageStatus.SENT })
    messageStatus: MessageStatus;

    @ManyToOne((): typeof GroupChats => GroupChats, (groupChats: GroupChats): GroupMessages[] => groupChats.groupMessages)
    @JoinColumn({ name: "group_chat_id" })
    groupChat: GroupChats;
};
