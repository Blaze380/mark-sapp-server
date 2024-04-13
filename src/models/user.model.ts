import { Column, Entity, OneToMany,ManyToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import {GroupChats,PrivateChats, PrivateMessage} from '@/models/entities';
@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({unique:true,nullable:false})
    userName: string;
    @Column({unique:true,nullable:false})
    phoneNumber: string;

    @Column({default:"no-profile"})
    profilePhoto: string;

    @OneToMany((): typeof PrivateChats => PrivateChats,
        (privateChats: PrivateChats): User => privateChats.user,
    {cascade:true,eager:true,onDelete:"CASCADE",onUpdate:"CASCADE"})
    privateChats: PrivateChats[];


    @ManyToMany((): typeof GroupChats => GroupChats,
        (groupChats: GroupChats): User[] => groupChats.groupParticipants,
    {cascade:true,eager:true,onDelete:"CASCADE",onUpdate:"CASCADE"})
    @JoinColumn({name:"group_chats_id"})
    groupChats: GroupChats[];

    @OneToMany((): typeof PrivateMessage => PrivateMessage,
        (privateMessage: PrivateMessage): User => privateMessage.sender,
    {cascade:true,eager:true,onDelete:"CASCADE",onUpdate:"CASCADE"})
    sender:PrivateMessage[];
    @OneToMany((): typeof PrivateMessage => PrivateMessage,
        (privateMessage: PrivateMessage): User => privateMessage.receiver,
    {cascade:true,eager:true,onDelete:"CASCADE",onUpdate:"CASCADE"})
    receiver:PrivateMessage[];

}