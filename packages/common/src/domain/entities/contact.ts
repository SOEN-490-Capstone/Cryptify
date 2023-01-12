import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Contact {
    @PrimaryColumn()
    contactName: string;

    @PrimaryColumn()
    userId: number;

    @Column("simple-array", { nullable: true })
    ethWallets: string[];

    @Column("simple-array", { nullable: true })
    btcWallets: string[];

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;
}
