import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Contact {
    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    userId: number;

    @Column()
    ethWallets: string[];

    @Column()
    btcWallets: string[];

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

}
