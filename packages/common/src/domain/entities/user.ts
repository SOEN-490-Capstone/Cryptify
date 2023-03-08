import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Tag } from "./tag";
import { Contact } from "./contact";
import { Role } from "@cryptify/common/src/domain/role";
import { Filter } from "@cryptify/common/src/domain/entities/filter";

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

    @Column({ nullable: false, type: "enum", enum: Role, default: Role.BASIC })
    role: Role;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];

    @OneToMany(() => Tag, (tag) => tag.user)
    tags: Tag[];

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];

    @OneToMany(() => Filter, (filter) => filter.user)
    filters: Filter[];
}
