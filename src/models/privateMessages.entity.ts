import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageType, PrivateChats, User } from "@/models/entities";
import { MessageStatus } from "@/enums/MessageStatus.enum";

@Entity()
export class PrivateMessages {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((): typeof User => User, (user: User): PrivateMessages[] => user.privateMessages)
    @JoinColumn({ name: "sender_id" })
    sender: User;

    @OneToOne((): typeof MessageType => MessageType, (messageType: MessageType): PrivateMessages => messageType.privateMessage)
    @JoinColumn({ name: "message_type_id" })
    messageType: MessageType;
    @Column()
    dateSent: Date;

    @Column({ type: "enum", enum: MessageStatus, default: MessageStatus.SENT })
    messageStatus: MessageStatus;

    @ManyToOne((): typeof PrivateChats => PrivateChats, (privateChats: PrivateChats): PrivateMessages[] => privateChats.privateMessages)
    @JoinColumn({ name: "private_chat_id" })
    privateChat: PrivateChats;
};
