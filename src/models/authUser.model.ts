import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class className {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    phoneNumber: string;
    @Column()
    verificationCode: string;
    @Column()
    iscodeUsed: boolean;
};
