import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionTag } from "./TransactionTag";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    transactionAddress: string;

    @Column({ nullable: false })
    walletIn: string;

    @Column({ nullable: false })
    walletOut: string;

    @Column({ nullable: false })
    amount: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @JoinTable()
    @ManyToMany(() => TransactionTag, (tag) => tag.transactions, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tags: TransactionTag[];
}
