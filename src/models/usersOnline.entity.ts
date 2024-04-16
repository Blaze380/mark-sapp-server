import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UsersOnline {
    @PrimaryColumn({ unique: true })
    userId: string;


    @Column({ unique: true })
    userSessionId: string;

    @Column({ default: true })
    isOnline: boolean;
};
