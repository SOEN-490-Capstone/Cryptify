import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag";
import { Contact } from "@cryptify/common/src/domain/entities/contact";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    transactionAddress: string;

    @Column({ nullable: false })
    walletIn: string;

    contactIn: Contact | null;

    @Column({ nullable: false })
    walletOut: string;

    contactOut: Contact | null;

    @Column({ nullable: false })
    amount: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.transactions, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tags: Tag[];
}
