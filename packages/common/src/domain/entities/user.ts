import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { TransactionTag } from "./tag";
import { Contact } from "./contact";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: false })
    areNotificationsEnabled: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];

    @OneToMany(() => TransactionTag, (tag) => tag.user)
    tags: TransactionTag[];

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
}
