import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag";

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
    
    @ManyToMany(() => Tag)
    tags: Tag[];
}
