import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Transaction } from "./transaction";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

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
    user?: User;

    @Column({ type: "enum", enum: CurrencyType })
    currencyType: CurrencyType;

    @OneToMany(() => Transaction, (transaction) => transaction.walletIn || transaction.walletOut)
    transactions: Transaction[];
}

export class WalletBuilder {
    private address: string;
    private userId: number;
    private name: string;
    private user: User;
    private transactions: Transaction[] = [];
    private balance: string;

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    setUserId(userId: number): this {
        this.userId = userId;
        return this;
    }

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setUser(user: User): this {
        this.user = user;
        return this;
    }

    setTransactions(transactions: Transaction[]): this {
        this.transactions.push(...transactions);
        return this;
    }

    setWallet(wallet: Wallet): this {
        this.address = wallet.address;
        this.userId = wallet.userId;
        this.name = wallet.name;
        return this;
    }

    setBalance(balance: string): this {
        this.balance = balance;
        return this;
    }

    build(): WalletWithBalance {
        const currencyType = getCurrencyType(this.address);

        return {
            address: this.address,
            userId: this.userId,
            name: this.name,
            user: this.user,
            currencyType,
            transactions: this.transactions,
            balance: this.balance,
        };
    }
}
