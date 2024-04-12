import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class UsersLogged {
    @PrimaryGeneratedColumn()
    userId: string;
    @Column({unique:true})
    userSessionId: string;
};
