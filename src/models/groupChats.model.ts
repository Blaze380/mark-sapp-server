import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export default class GroupChats {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    groupName: string;
    @Column()
    admins: User[];
    groupParticipants: User[];
    @Column()
    dateCreated: string;
    @Column()
    profilePhoto: string;
};
