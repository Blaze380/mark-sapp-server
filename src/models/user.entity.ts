import { ManyToMany, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { GroupChats, PrivateChats, IncomingMessages, PrivateMessages, UserPermissions } from '@/models/entities';
import { GroupMessages } from './groupMessages.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, nullable: true })
    userName: string;


    @Column({ unique: true, nullable: false })
    phoneNumber: string;

    @Column({ default: "no-profile" })
    profilePhoto: string;


    @Column({ default: "First Time In Mark Sapp :)" })
    biography: string;

    @OneToMany((): typeof IncomingMessages => IncomingMessages, (incomingMessages: IncomingMessages): User => incomingMessages.sender)
    incomingMessages: IncomingMessages[];

    @OneToOne((): typeof UserPermissions => UserPermissions, (userPermissions: UserPermissions): User => userPermissions.user)
    userPermissions: UserPermissions;

    @OneToMany((): typeof PrivateChats => PrivateChats, (privateChats: PrivateChats): User => privateChats.firstUser)
    firstUserChats: PrivateChats[];


    @OneToMany((): typeof PrivateChats => PrivateChats, (privateChats: PrivateChats): User => privateChats.secondUser)
    secondUserChats: PrivateChats[];

    @OneToMany((): typeof PrivateMessages => PrivateMessages, (privateMessages: PrivateMessages): User => privateMessages.sender)
    privateMessages: PrivateMessages[];


    @ManyToMany((): typeof GroupChats => GroupChats, (groupChats: GroupChats): User[] => groupChats.groupParticipants)
    groupChats: GroupChats[];

    @ManyToMany((): typeof GroupChats => GroupChats, (groupChats: GroupChats): User[] => groupChats.groupAdmins)
    groupAdmins: GroupChats[];


    @OneToMany((): typeof GroupMessages => GroupMessages, (groupMessages: GroupMessages): User => groupMessages.sender)
    groupMessages: GroupMessages[];

}