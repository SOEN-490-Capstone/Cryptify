import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import Web3 from "web3";
import {normalizeCurrency} from "@cryptify/common/src/utils/currency_utils";

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

    @Column({ nullable: true })
    gasPrice?: string;

    @Column({ nullable: true })
    gasLimit?: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.transactions, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tags: Tag[];

    contactIn?: Contact;
    contactOut?: Contact;
}

export class TransactionBuilder {
    private id: number;
    private address: string;
    private walletIn: string;
    private walletOut: string;
    private contactIn: Contact;
    private contactOut: Contact;
    private amount: string;
    private gasPrice: string;
    private gasLimit: string;
    private createdAt: Date;
    private tags: Tag[] = [];

    setId(id: number): this {
        this.id = id;
        return this;
    }

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    setWalletIn(address: string): this {
        this.walletIn = address;
        return this;
    }

    setWalletOut(address: string): this {
        this.walletOut = address;
        return this;
    }

    setContactIn(contact: Contact): this {
        this.contactIn = contact;
        return this;
    }

    setContactOut(contact: Contact): this {
        this.contactOut = contact;
        return this;
    }

    setAmount(amount: number): this {
        this.amount = Web3.utils.toWei(normalizeCurrency(amount), "ether");
        return this;
    }

    setGasPrice(price: string): this {
        this.gasPrice = price;
        return this;
    }

    setGasLimit(limit: string): this {
        this.gasLimit = limit;
        return this;
    }

    setCreatedAt(timestamp: string): this {
        this.createdAt = new Date(timestamp);
        return this;
    }

    setTags(tags: Tag[]): this {
        this.tags.push(...tags);
        return this;
    }
    
    setTransaction(transaction: Transaction): this {
        this.id = transaction.id;
        this.address = transaction.transactionAddress;
        this.walletIn = transaction.walletIn;
        this.walletOut = transaction.walletOut;
        this.contactIn = transaction.contactIn;
        this.contactOut = transaction.contactOut;
        this.amount = transaction.amount;
        if (transaction.gasPrice) {
            this.gasPrice = transaction.gasPrice;
        }
        if (transaction.gasLimit) {
            this.gasLimit = transaction.gasLimit;
        }
        this.createdAt = new Date(transaction.createdAt);
        this.tags = transaction.tags;
        
        return this;
    }

    build(): Transaction {
        const transaction = {
             id: this.id,
             transactionAddress: this.address,
             walletIn: this.walletIn,
             walletOut: this.walletOut,
             amount: this.amount,
             createdAt: this.createdAt,
             tags: this.tags,
        } as Transaction;
        
        if (this.contactIn) {
            transaction.contactIn = this.contactIn;
        }
        if (this.contactOut) {
            transaction.contactOut = this.contactOut;
        }
        if (this.gasPrice) {
            transaction.gasPrice = this.gasPrice;
        }
        if (this.gasLimit) {
            transaction.gasLimit = this.gasLimit;
        }
        
        return transaction;
    }
}
