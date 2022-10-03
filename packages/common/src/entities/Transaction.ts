import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryColumn()
    transaction_address: string;

    @Column({ nullable: false })
    wallet_in: string;

    @Column({ nullable: false })
    wallet_out: string;

    @Column({ nullable: false })
    amount: number;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
