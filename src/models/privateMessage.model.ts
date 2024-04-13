import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import {PrivateChats,User} from "@/models/entities";
import { MessageStatus } from "@/enums/MessageStatus.emun";

@Entity()
export  class PrivateMessage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(():typeof User=>User,(user:User):PrivateMessage[]=>user.sender)
    sender: User;
    @ManyToOne(():typeof User=>User,(user:User):PrivateMessage[]=>user.receiver)
    receiver: User;
    @Column()
    message: string;
    @Column()
    dateSent: Date;

    @Column({type:"enum",enum:MessageStatus,default:MessageStatus.SENT})
    messageStatus: MessageStatus;

    @Column({ name: "private_chat_id",type:"uuid" })
    privateChatId: string;

    @ManyToOne((): typeof PrivateChats => PrivateChats, (privateChats: PrivateChats): PrivateMessage[] => privateChats.privateMessages)
        @JoinColumn({name:"private_chat_id"})
    privateChat: PrivateChats;
};
