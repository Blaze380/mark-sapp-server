import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMessages, User } from "@/models/entities";

@Entity()
export class GroupChats {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    groupName: string;

    @ManyToMany((): typeof User => User, (user: User): GroupChats[] => user.groupChats)
    @JoinTable({ name: "group_participants" })
    groupParticipants: User[];


    @ManyToMany((): typeof User => User, (user: User): GroupChats[] => user.groupAdmins)
    @JoinTable({ name: "group_admins" })
    groupAdmins: User[];

    @OneToMany((): typeof GroupMessages => GroupMessages, (groupMessages: GroupMessages): GroupChats => groupMessages.groupChat)
    groupMessages: GroupMessages[];

    @Column()
    dateCreated: string;

    @Column()
    profilePhoto: string;

};
