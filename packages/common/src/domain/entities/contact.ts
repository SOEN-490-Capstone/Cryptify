import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import { User } from "./user";
import {Tag} from "@cryptify/common/src/domain/entities/tag";
import {ContactAddress} from "@cryptify/common/src/domain/entities/contact_address";
import {Transaction} from "@cryptify/common/src/domain/entities/transaction";

@Entity()
export class Contact {
    @PrimaryColumn()
    contactName: string;
    
    // userId of the user who created this contact
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: User;

    @JoinTable()
    @ManyToMany(() => ContactAddress, (address) => address.contacts, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    addresses: ContactAddress[];
}

export class ContactBuilder {
    private contactName: string;
    private userId: number;
    private addresses: string[];
    
    setContactName(name: string): this {
        this.contactName = name;
        return this;
    }
    
    setUserId(userId: number): this {
        this.userId = userId;
        return this;
    }

    setAddresses(addresses: string[]): this {
        this.addresses.push(...addresses);
        return this;
    }
    
    build(): Contact {
        return {
            contactName: this.contactName,
            userId: this.userId,
            addresses: this.addresses.map((addr) => ({
                walletAddress: addr
            })),
        };
    }
}