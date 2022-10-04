import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/entities/user";
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

    @ManyToMany(() => Transaction, (transaction) => transaction.wallet_in || transaction.wallet_out)
    transactions: Transaction[];
}
