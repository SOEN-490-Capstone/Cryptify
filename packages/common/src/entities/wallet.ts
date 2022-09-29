import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/entities/user";

@Entity()
export class Wallet {
    @PrimaryColumn()
    address: string;

    @PrimaryColumn()
    userId: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.wallets)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;
}
