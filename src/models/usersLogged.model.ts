import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export  class UsersLogged {
    @PrimaryColumn({unique:true})
    userId: string;
    @Column({unique:true})
    userSessionId: string;
};
