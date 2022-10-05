import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Transaction } from "./transaction";

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

    @OneToMany(() => Transaction, (transaction) => transaction.walletIn || transaction.walletOut)
    transactions: Transaction[];
}
