import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import PrivateChats from './privateChats.model';
import GroupChats from './groupChats.model';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userName: string;
    @Column()
    phoneNumber: string;

    @Column()
    privateChats: PrivateChats[];
    @Column()
    groupChats: GroupChats[];
}