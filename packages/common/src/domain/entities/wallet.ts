import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Transaction } from "./transaction";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

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

    @Column({ type: "enum", enum: CurrencyType })
    currencyType: CurrencyType;

    @OneToMany(() => Transaction, (transaction) => transaction.walletIn || transaction.walletOut)
    transactions: Transaction[];
}
