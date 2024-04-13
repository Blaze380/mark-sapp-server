import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/models/entities";

@Entity()
export  class GroupChats {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    groupName: string;

    @ManyToMany(():typeof User => User, (user:User):GroupChats[] => user.groupChats)
    @JoinTable({name:"participants_id"})
    groupParticipants: User[];

    @Column()
    dateCreated: string;

    @Column()
    profilePhoto: string;

};
