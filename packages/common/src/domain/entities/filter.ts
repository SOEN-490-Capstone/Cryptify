import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

@Entity()
export class Filter {
    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: User;

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

export class FilterBuilder {
    private name: string;
    private userId: number;
    private currencyType: CurrencyType;
    private txnIn: boolean;
    private txnOut: boolean;
    private start: string;
    private end: string;
    private tagNames: string[] = [];
    private contactNames: string[] = [];

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setUserId(userId: number): this {
        this.userId = userId;
        return this;
    }

    setCurrencyType(type: CurrencyType): this {
        this.currencyType = type;
        return this;
    }

    setTxns(txnIn: boolean, txnOut: boolean): this {
        this.txnIn = txnIn;
        this.txnOut = txnOut;
        return this;
    }

    setRange(start: string, end: string): this {
        this.start = start;
        this.end = end;
        return this;
    }

    setTagNames(names: string[]): this {
        this.tagNames.push(...names);
        return this;
    }

    setContactNames(names: string[]): this {
        this.contactNames.push(...names);
        return this;
    }

    build(): Filter {
        return {
            name: this.name,
            userId: this.userId,
            currencyType: this.currencyType,
            txnIn: this.txnIn,
            txnOut: this.txnOut,
            start: this.start,
            end: this.end,
            tagNames: this.tagNames,
            contactNames: this.contactNames,
        };
    }
}
