import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryColumn()
    transactionAddress: string;

    @Column({ nullable: false })
    walletIn: string;

    @Column({ nullable: false })
    walletOut: string;

    @Column({ nullable: false, type: "double precision" })
    amount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
