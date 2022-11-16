import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Transaction } from "./transaction";
import { User } from "./user";

@Entity()
export class TransactionTag {
    @PrimaryColumn()
    tagName: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @ManyToMany(() => Transaction)
    @JoinTable()
    Transactions: Transaction[];
}