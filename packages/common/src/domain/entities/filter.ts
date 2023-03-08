import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import { Transaction } from "./transaction";
import { User } from "./user";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

@Entity()
export class Filter {
    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @PrimaryColumn({ type: "enum", enum: CurrencyType })
    currencyType: CurrencyType;

    // Transactions
    @Column({ nullable: false })
    txnIn: boolean;
    @Column({ nullable: false })
    txnOut: boolean;

    // Date
    // none-negative number -> any arbitrary UNIX timestamp
    // curr -> current time
    // negative number -> subtract that amount from the current time
    @Column({ nullable: false })
    start: string;
    @Column({ nullable: false })
    end: string;
    
    // Tags
    @Column("text", { array: true })
    tagNames: string[];
    
    // Contacts
    @Column("text", { array: true })
    contactNames: string[];
}
